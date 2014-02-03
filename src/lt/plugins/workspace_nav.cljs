(ns lt.plugins.workspace-nav
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.files :as files]
            [lt.objs.context :as ctx]
            [lt.objs.sidebar.workspace :as workspace])
  (:require-macros [lt.macros :refer [behavior]]))

(defn selected-tree []
  (::selected @workspace/sidebar-workspace))

(defn setup-focusable [workspace]
  (do
    (dom/set-attr (object/->content workspace) {"tabIndex" 0})
    (if-not (::focusable-workspace @workspace)
      (do
        (dom/on (object/->content workspace) :focus (fn [] (object/raise workspace :focus)))
        (dom/on (object/->content workspace) :blur (fn [] (object/raise workspace :blur)))
        (object/merge! workspace {::focusable-workspace true})))))

(object/tags->behaviors #{:sidebar.workspace})

(behavior ::on-show-setup-and-focus
          :triggers #{:show}
          :reaction (fn [workspace]
                      (setup-focusable workspace)
                      (dom/focus (object/->content workspace))))

(defn set-selected-class [tree-item css-class]
  (let [elem (dom/$ :p (object/->content tree-item))]
    (dom/remove-class elem "nav-selected-focused")
    (dom/remove-class elem "nav-selected-unfocused")
    (dom/add-class elem css-class)))

(behavior ::on-focus-be-interactive
          :triggers #{:focus}
          :reaction (fn [workspace]
                      (let [tree workspace/tree]
                        (ctx/in! :workspace.focused)
                        (object/update! workspace [::selected]
                                        (fn [selected]
                                          (if (and selected @selected)
                                            selected
                                            (first (:folders @tree)))))
                        (set-selected-class (::selected @workspace) "nav-selected-focused"))))

(behavior ::on-blur-context-out
          :triggers #{:blur}
          :reaction (fn [workspace]
                      (set-selected-class (selected-tree) "nav-selected-unfocused")
                      (ctx/out! :workspace.focused)))

(behavior ::on-clicked-select
          :triggers #{:open! :close!}
          :reaction (fn [tree-item]
                      (select-new-sibling (fn [_] tree-item))))

(defn children [parent]
  (concat
   (sort-by #(-> @% :path files/basename clojure.string/lower-case) (:folders @parent))
   (sort-by #(-> @% :path files/basename clojure.string/lower-case) (:files @parent))))

(defn parent [tree-item]
  (or
   (workspace/find-by-path (files/parent (:path @tree-item)))
   workspace/tree))

(defn siblings [tree-item]
  (children (parent tree-item)))

(defn prev-sibling [tree-item]
  (->> (siblings tree-item)
       (take-while #(not (= tree-item %)))
       (last)))

(defn next-sibling [tree-item]
  (->> (siblings tree-item)
       (drop-while #(not (= tree-item %)))
       (rest)
       (first)))

(defn next-sibling-or-parent-sibling [tree-item]
  (if-not (= tree-item workspace/tree)
    (or (next-sibling tree-item)
        (recur (parent tree-item)))))

(defn next-tree-item [tree-item]
  (if (:open? @tree-item)
    (or (first (children tree-item)) (next-sibling-or-parent-sibling tree-item))
    (next-sibling-or-parent-sibling tree-item)))

(defn deepest-last-child [tree-item]
  (if (:open? @tree-item)
    (recur (last (children tree-item)))
    tree-item))

(defn prev-tree-item [tree-item]
  (if-let [prev (prev-sibling tree-item)]
    (deepest-last-child prev)
    (let [parent (parent tree-item)]
      (if (= parent workspace/tree)
        tree-item
        parent))))

(defn scroll-to-tree-item [tree-item]
  (goog.style/scrollIntoContainerView (dom/$ :p (object/->content tree-item))
                                      (dom/$ :ul.root (object/->content workspace/sidebar-workspace))))

(defn select-new-sibling [sibling-finder]
  (object/update! workspace/sidebar-workspace [::selected]
                  (fn [selected]
                    (if-let [new-selection (sibling-finder selected)]
                      (do
                        (set-selected-class selected "")
                        (set-selected-class new-selection "nav-selected-focused")
                        (scroll-to-tree-item new-selection)
                        new-selection)
                      selected))))

(cmd/command {:command ::navigate-south
              :desc "Workspace nav: navigate down"
              :exec (fn []
                      (select-new-sibling next-tree-item))})

(cmd/command {:command ::navigate-north
              :desc "Workspace nav: navigate up"
              :exec (fn []
                      (select-new-sibling prev-tree-item))})

(cmd/command {:command ::open-selection
             :desc "Workspace nav: Open selected tree item"
             :exec (fn []
                     (let [selected (selected-tree)]
                       (object/raise selected :open!)))})

(cmd/command {:command ::close-parent
              :desc "Workspace nav: Close parent folder"
              :exec (fn []
                      (if (= workspace/tree (parent (selected-tree)))
                        (object/raise (selected-tree) :close!)
                        (do
                          (object/raise (parent (selected-tree)) :close!)
                          (select-new-sibling parent))))})

