if(!lt.util.load.provided_QMARK_('lt.plugins.workspace-nav')) {
goog.provide('lt.plugins.workspace_nav');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('lt.util.dom');
goog.require('lt.objs.context');
goog.require('lt.objs.sidebar.workspace');
goog.require('lt.objs.context');
goog.require('lt.objs.sidebar.workspace');
goog.require('lt.util.dom');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
lt.plugins.workspace_nav.selected_tree = (function selected_tree(){return new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.workspace.sidebar_workspace));
});
lt.plugins.workspace_nav.setup_focusable = (function setup_focusable(workspace){lt.util.dom.set_attr.call(null,lt.object.__GT_content.call(null,workspace),new cljs.core.PersistentArrayMap(null, 1, ["tabIndex",0], null));
if(cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","focusable-workspace","lt.plugins.workspace-nav/focusable-workspace",1581882032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,workspace))))
{lt.util.dom.on.call(null,lt.object.__GT_content.call(null,workspace),new cljs.core.Keyword(null,"focus","focus",1111509066),(function (){return lt.object.raise.call(null,workspace,new cljs.core.Keyword(null,"focus","focus",1111509066));
}));
lt.util.dom.on.call(null,lt.object.__GT_content.call(null,workspace),new cljs.core.Keyword(null,"blur","blur",1016931289),(function (){return lt.object.raise.call(null,workspace,new cljs.core.Keyword(null,"blur","blur",1016931289));
}));
return lt.object.merge_BANG_.call(null,workspace,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("lt.plugins.workspace-nav","focusable-workspace","lt.plugins.workspace-nav/focusable-workspace",1581882032),true,new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727),cljs.core.first.call(null,new cljs.core.Keyword(null,"folders","folders",4625622327).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,workspace)))], null));
} else
{return null;
}
});
lt.plugins.workspace_nav.__BEH__on_show_setup_and_focus = (function __BEH__on_show_setup_and_focus(workspace){lt.plugins.workspace_nav.setup_focusable.call(null,workspace);
return lt.util.dom.focus.call(null,lt.object.__GT_content.call(null,workspace));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","on-show-setup-and-focus","lt.plugins.workspace-nav/on-show-setup-and-focus",2521659898),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.workspace_nav.__BEH__on_show_setup_and_focus,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",1017433711),null], null), null));
lt.plugins.workspace_nav.set_selected_class = (function set_selected_class(tree_item,css_class){var elem = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"p","p",1013904354),lt.object.__GT_content.call(null,tree_item));lt.util.dom.remove_class.call(null,elem,"nav-selected-focused");
lt.util.dom.remove_class.call(null,elem,"nav-selected-unfocused");
return lt.util.dom.add_class.call(null,elem,css_class);
});
lt.plugins.workspace_nav.__BEH__on_focus_be_interactive = (function __BEH__on_focus_be_interactive(workspace){var tree = lt.objs.sidebar.workspace.tree;lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"workspace.focused","workspace.focused",1526011536));
lt.object.update_BANG_.call(null,workspace,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727)], null),(function (selected){if(cljs.core.truth_((function (){var and__6745__auto__ = selected;if(cljs.core.truth_(and__6745__auto__))
{return cljs.core.deref.call(null,selected);
} else
{return and__6745__auto__;
}
})()))
{return selected;
} else
{return cljs.core.first.call(null,new cljs.core.Keyword(null,"folders","folders",4625622327).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tree)));
}
}));
lt.plugins.workspace_nav.scroll_to_tree_item.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,workspace)));
return lt.plugins.workspace_nav.set_selected_class.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,workspace)),"nav-selected-focused");
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","on-focus-be-interactive","lt.plugins.workspace-nav/on-focus-be-interactive",2233934031),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.workspace_nav.__BEH__on_focus_be_interactive,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus","focus",1111509066),null], null), null));
lt.plugins.workspace_nav.__BEH__on_blur_context_out = (function __BEH__on_blur_context_out(workspace){lt.plugins.workspace_nav.set_selected_class.call(null,lt.plugins.workspace_nav.selected_tree.call(null),"nav-selected-unfocused");
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"workspace.focused","workspace.focused",1526011536));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","on-blur-context-out","lt.plugins.workspace-nav/on-blur-context-out",3483893634),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.workspace_nav.__BEH__on_blur_context_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"blur","blur",1016931289),null], null), null));
lt.plugins.workspace_nav.__BEH__on_clicked_select = (function __BEH__on_clicked_select(tree_item){return lt.plugins.workspace_nav.select_tree_item.call(null,tree_item);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.workspace-nav","on-clicked-select","lt.plugins.workspace-nav/on-clicked-select",2908319450),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.workspace_nav.__BEH__on_clicked_select,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"open!","open!",1119852169),null,new cljs.core.Keyword(null,"close!","close!",3951350939),null], null), null));
lt.plugins.workspace_nav.children = (function children(parent){return cljs.core.concat.call(null,cljs.core.sort_by.call(null,(function (p1__8261_SHARP_){return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__8261_SHARP_))));
}),new cljs.core.Keyword(null,"folders","folders",4625622327).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parent))),cljs.core.sort_by.call(null,(function (p1__8262_SHARP_){return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__8262_SHARP_))));
}),new cljs.core.Keyword(null,"files","files",1111338473).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parent))));
});
lt.plugins.workspace_nav.parent = (function parent(tree_item){var or__6757__auto__ = lt.objs.sidebar.workspace.find_by_path.call(null,lt.objs.files.parent.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tree_item))));if(cljs.core.truth_(or__6757__auto__))
{return or__6757__auto__;
} else
{return lt.objs.sidebar.workspace.tree;
}
});
lt.plugins.workspace_nav.siblings = (function siblings(tree_item){return lt.plugins.workspace_nav.children.call(null,lt.plugins.workspace_nav.parent.call(null,tree_item));
});
lt.plugins.workspace_nav.prev_sibling = (function prev_sibling(tree_item){return cljs.core.last.call(null,cljs.core.take_while.call(null,(function (p1__8263_SHARP_){return !(cljs.core._EQ_.call(null,tree_item,p1__8263_SHARP_));
}),lt.plugins.workspace_nav.siblings.call(null,tree_item)));
});
lt.plugins.workspace_nav.next_sibling = (function next_sibling(tree_item){return cljs.core.first.call(null,cljs.core.rest.call(null,cljs.core.drop_while.call(null,(function (p1__8264_SHARP_){return !(cljs.core._EQ_.call(null,tree_item,p1__8264_SHARP_));
}),lt.plugins.workspace_nav.siblings.call(null,tree_item))));
});
lt.plugins.workspace_nav.next_sibling_or_parent_sibling = (function next_sibling_or_parent_sibling(tree_item){while(true){
if(!(cljs.core._EQ_.call(null,tree_item,lt.objs.sidebar.workspace.tree)))
{var or__6757__auto__ = lt.plugins.workspace_nav.next_sibling.call(null,tree_item);if(cljs.core.truth_(or__6757__auto__))
{return or__6757__auto__;
} else
{{
var G__8265 = lt.plugins.workspace_nav.parent.call(null,tree_item);
tree_item = G__8265;
continue;
}
}
} else
{return null;
}
break;
}
});
lt.plugins.workspace_nav.first_tree_item = (function first_tree_item(){return cljs.core.first.call(null,lt.plugins.workspace_nav.children.call(null,lt.objs.sidebar.workspace.tree));
});
lt.plugins.workspace_nav.next_tree_item = (function next_tree_item(tree_item){if(cljs.core.truth_(new cljs.core.Keyword(null,"open?","open?",1119852199).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tree_item))))
{var or__6757__auto__ = cljs.core.first.call(null,lt.plugins.workspace_nav.children.call(null,tree_item));if(cljs.core.truth_(or__6757__auto__))
{return or__6757__auto__;
} else
{return lt.plugins.workspace_nav.next_sibling_or_parent_sibling.call(null,tree_item);
}
} else
{return lt.plugins.workspace_nav.next_sibling_or_parent_sibling.call(null,tree_item);
}
});
lt.plugins.workspace_nav.deepest_last_child = (function deepest_last_child(tree_item){while(true){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open?","open?",1119852199).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,tree_item))))
{{
var G__8266 = cljs.core.last.call(null,lt.plugins.workspace_nav.children.call(null,tree_item));
tree_item = G__8266;
continue;
}
} else
{return tree_item;
}
break;
}
});
lt.plugins.workspace_nav.prev_tree_item = (function prev_tree_item(tree_item){var temp__4090__auto__ = lt.plugins.workspace_nav.prev_sibling.call(null,tree_item);if(cljs.core.truth_(temp__4090__auto__))
{var prev = temp__4090__auto__;return lt.plugins.workspace_nav.deepest_last_child.call(null,prev);
} else
{var parent = lt.plugins.workspace_nav.parent.call(null,tree_item);if(cljs.core._EQ_.call(null,parent,lt.objs.sidebar.workspace.tree))
{return tree_item;
} else
{return parent;
}
}
});
lt.plugins.workspace_nav.scroll_to_tree_item = (function scroll_to_tree_item(tree_item){var workspace_container = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"ul.root","ul.root",615589195),lt.object.__GT_content.call(null,lt.objs.sidebar.workspace.sidebar_workspace));goog.style.scrollIntoContainerView(lt.util.dom.$.call(null,new cljs.core.Keyword(null,"p","p",1013904354),lt.object.__GT_content.call(null,tree_item)),workspace_container);
return (workspace_container["scrollLeft"] = 0);
});
lt.plugins.workspace_nav.select_tree_item = (function select_tree_item(new_selection){return lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.sidebar_workspace,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.workspace-nav","selected","lt.plugins.workspace-nav/selected",1110619727)], null),(function (selected){if(!(cljs.core._EQ_.call(null,selected,new_selection)))
{lt.plugins.workspace_nav.set_selected_class.call(null,selected,"");
lt.plugins.workspace_nav.set_selected_class.call(null,new_selection,"nav-selected-focused");
lt.plugins.workspace_nav.scroll_to_tree_item.call(null,new_selection);
return new_selection;
} else
{return selected;
}
}));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","navigate-top","lt.plugins.workspace-nav/navigate-top",3227696769),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: Jump to the top of the workspace tree",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.workspace_nav.select_tree_item.call(null,lt.plugins.workspace_nav.first_tree_item.call(null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","navigate-north","lt.plugins.workspace-nav/navigate-north",3241283921),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: navigate up",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.workspace_nav.select_tree_item.call(null,lt.plugins.workspace_nav.prev_tree_item.call(null,lt.plugins.workspace_nav.selected_tree.call(null)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","navigate-south","lt.plugins.workspace-nav/navigate-south",3245575673),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: navigate down",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.workspace_nav.select_tree_item.call(null,lt.plugins.workspace_nav.next_tree_item.call(null,lt.plugins.workspace_nav.selected_tree.call(null)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","navigate-bottom","lt.plugins.workspace-nav/navigate-bottom",1635185139),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: Jump to the bottom of the workspace tree",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.workspace_nav.select_tree_item.call(null,lt.plugins.workspace_nav.deepest_last_child.call(null,lt.objs.sidebar.workspace.tree));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","open-selection","lt.plugins.workspace-nav/open-selection",3511086513),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: Open selected tree item",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var selected = lt.plugins.workspace_nav.selected_tree.call(null);return lt.object.raise.call(null,selected,new cljs.core.Keyword(null,"open!","open!",1119852169));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","close-parent","lt.plugins.workspace-nav/close-parent",1484403147),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: Close parent folder",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var parent_item = lt.plugins.workspace_nav.parent.call(null,lt.plugins.workspace_nav.selected_tree.call(null));if(cljs.core._EQ_.call(null,lt.objs.sidebar.workspace.tree,parent_item))
{return lt.object.raise.call(null,lt.plugins.workspace_nav.selected_tree.call(null),new cljs.core.Keyword(null,"close!","close!",3951350939));
} else
{lt.object.raise.call(null,parent_item,new cljs.core.Keyword(null,"close!","close!",3951350939));
return lt.plugins.workspace_nav.select_tree_item.call(null,parent_item);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.workspace-nav","focus","lt.plugins.workspace-nav/focus",2163145890),new cljs.core.Keyword(null,"desc","desc",1016984067),"Workspace nav: Focus on workspace",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.util.dom.focus.call(null,lt.object.__GT_content.call(null,lt.objs.sidebar.workspace.sidebar_workspace));
})], null));
}

//# sourceMappingURL=workspace nav_compiled.js.map