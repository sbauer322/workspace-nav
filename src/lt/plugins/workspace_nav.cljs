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
        (object/merge! workspace {::focusable-workspace true, ::selected (first (:folders @workspace))})))))

(behavior ::on-show-setup-and-focus
          :triggers #{:show}
          :reaction (fn [workspace]
                      (setup-focusable workspace)
                      (dom/focus (object/->content workspace))))

(defn set-selected-class [tree-item css-class]
  (let [elem (object/->content tree-item)]
    (dom/remove-class elem "nav-selected-focused")
    (dom/remove-class elem "nav-selected-unfocused")
    (dom/add-class elem css-class)))

(behavior ::on-focus-be-interactive
          :triggers #{:focus}
          :reaction (fn [workspace]
                      (.log js/console "on-focus-be-interactive 1")
                      (let [tree workspace/tree]
                        (ctx/in! :workspace.focused)
                        (.log js/console "in context of :workspace.focused")
                        (object/update! workspace [::selected]
                                        (fn [selected]
                                          (if (and selected @selected)
                                            selected
                                            (first (:folders @tree)))))
                        (.log js/console "on-focus-be-interactive 2")
                        (scroll-to-tree-item (::selected @workspace))
                        (.log js/console "on-focus-be-interactive 3")
                        (set-selected-class (::selected @workspace) "nav-selected-focused"))))

(behavior ::on-blur-context-out
          :triggers #{:blur}
          :reaction (fn [workspace]
                      (.log js/console "on-blur-context-out 1")
                      (set-selected-class (selected-tree) "nav-selected-unfocused")
                      (.log js/console "on-blur-context-out 2")
                      (.log js/console "leaving context of :workspace.focused")
                      (ctx/out! :workspace.focused)))

(behavior ::on-clicked-select
          :triggers #{:open! :close!}
          :reaction (fn [tree-item]
                      (select-tree-item tree-item)))

(defn children
  "For a given directory, `parent`, return the sorted immediate child files and directories."
  [parent]
  ;; Note: The below sorting is done because this is how Light Table currently sorts.
  ;; This could change in the future.
  (concat
    (sort-by (-> @parent
                 :path
                 files/basename
                 clojure.string/lower-case)
             (:folders @parent))
    (sort-by (-> @parent
                 :path
                 files/basename
                 clojure.string/lower-case)
             (:files @parent))))

(defn parent
  "Return the parent tree item of `tree-item`, or the root of the workspace."
  [tree-item]
  (or
   (workspace/find-by-path (files/parent (:path @tree-item)))
   workspace/tree))

(defn siblings
  "Return the children of the parent of `tree-item`, including `tree-item`."
  [tree-item]
  (children (parent tree-item)))

(defn prev-sibling
  "Return the sibling immediately before `tree-item`."
  [tree-item]
  (->> (siblings tree-item)
       (take-while #(not (= tree-item %)))
       (last)))

(defn next-sibling [tree-item]
  "Return the sibling immediately after `tree-item`."
  (->> (siblings tree-item)
       (drop-while #(not (= tree-item %)))
       (rest)
       (first)))

;; THIS FUNCTION DOES NOT APPEAR TO BE RECURSING PROPERLY
;; Proper behavior should be that the next sibling to `tree-item` is retreived. If there are no siblings,
;; then we should retrieve the parent's next sibling... and recurse until a sibling is found, or the root of the workspace is reached (in this case, go to top of workspace).
(defn next-sibling-or-parent-sibling [tree-item]
  (if-not (= tree-item workspace/tree)
    (or (next-sibling tree-item)
        (recur (parent tree-item)))
    (do
      (.log js/console "ELSE part of next-sibling-or-parent-sibling")
      nil)))

(defn first-tree-item []
  (first (children workspace/tree)))

(defn next-tree-item [tree-item]
  (let [next-item (or
                    (first (children tree-item))
                    (next-sibling-or-parent-sibling tree-item))]
;;     (if (:open? @tree-item)

      (if (nil? next-item)
        (do
          (.log js/console "next-item was nil")
          (first-tree-item))
        (do
          next-item))))

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

;; (:open? @(first (children (selected-tree))))
;; (:path @(next-sibling-or-parent-sibling (selected-tree)))
;; (:path @(parent (selected-tree)))
;; (:path @(parent (selected-tree)))
;; (parent (selected-tree))
;; (:path @(parent (selected-tree)))
;; (children (parent (selected-tree)))
;; (siblings (selected-tree))
;; (:path @(next-sibling (selected-tree)))
;; (:path @(selected-tree))
;; (map #(:path @%) (siblings (selected-tree)))
;; (map #(:path @%) (:folders @(::selected @workspace/sidebar-workspace)))
;; (map #(:path @%) (:files @(::selected @workspace/sidebar-workspace)))
;; (.log js/console ::selected)
;; (children (selected-tree))
;; (parent (selected-tree))
;; ;; (next-sibling-or-parent-sibling (selected-tree))
;; ;; (parent (parent (selected-tree)))
;; (selected-tree)
;; (next-sibling-or-parent-sibling (parent (parent (selected-tree))))

;; (:open? @(selected-tree))

;; (true? nil)


;; (next-tree-item (selected-tree))
;; (prev-tree-item (selected-tree))

;; (select-tree-item (next-tree-item (selected-tree)))

(defn scroll-to-tree-item [tree-item]
  (let [workspace-container (dom/$ :ul.root (object/->content workspace/sidebar-workspace))]
    (goog.style/scrollIntoContainerView (dom/$ :p (object/->content tree-item))
                                        workspace-container)
    (aset workspace-container "scrollLeft" 0)))

(defn select-tree-item [new-selection]
  (object/update! workspace/sidebar-workspace [::selected]
                  (fn [selected]
                    (if-not (= selected new-selection)
                      (do
                        (set-selected-class selected "")
                        (set-selected-class new-selection "nav-selected-focused")
                        (scroll-to-tree-item new-selection)
                        new-selection)
                      selected))))

(cmd/command {:command ::navigate-top
              :desc "Workspace nav: Jump to the top of the workspace tree"
              :exec (fn []
                      (.log js/console "jump to top")
                      (select-tree-item (first-tree-item)))})

(cmd/command {:command ::navigate-north
              :desc "Workspace nav: navigate up"
              :exec (fn []
                      (.log js/console "navigating up")
                      (select-tree-item (prev-tree-item (selected-tree))))})

(cmd/command {:command ::navigate-south
              :desc "Workspace nav: navigate down"
              :exec (fn []
                      (.log js/console "navigating down")
                      (select-tree-item (next-tree-item (selected-tree))))})

(cmd/command {:command ::navigate-bottom
              :desc "Workspace nav: Jump to the bottom of the workspace tree"
              :exec (fn []
                      (.log js/console "jump to bottom")
                      (select-tree-item (deepest-last-child workspace/tree)))})

(cmd/command {:command ::open-selection
             :desc "Workspace nav: Open selected tree item"
             :exec (fn []
                     (.log js/console "opening selected tree item")
                     (let [selected (selected-tree)]
                       (object/raise selected :open!)
                       (if-let [child (first (children selected))]
                         (select-tree-item child))))})

(cmd/command {:command ::close-parent
              :desc "Workspace nav: Close parent folder"
              :exec (fn []
                      (.log js/console "close parent folder")
                      (let [parent-item (parent (selected-tree))]
                        (if (= workspace/tree parent-item)
                          (object/raise (selected-tree) :close!)
                          (do
                            (object/raise parent-item :close!)
                            (select-tree-item parent-item)))))})

(cmd/command {:command ::focus
              :desc "Workspace nav: Focus on workspace"
              :exec (fn []
                      (.log js/console "focusing on workspace")
                      (dom/focus (object/->content workspace/sidebar-workspace)))})

(cmd/command {:command ::test-plugin
             :desc "Workspace nav: Test a thing"
             :exec (fn []
                     (.log js/console "plugin testing")
                     (.log js/console (str "selected tree item: " @(selected-tree)))
                     (.log js/console (str "next tree item: " @(next-tree-item (selected-tree))))
                     (.log js/console (str "prev tree item: " @(prev-tree-item (selected-tree)))))
              })

