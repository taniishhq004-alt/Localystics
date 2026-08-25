(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useRouterBFCache", {
    enumerable: true,
    get: function() {
        return useRouterBFCache;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// When the flag is disabled, only track the currently active tree
const MAX_BF_CACHE_ENTRIES = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1;
function useRouterBFCache(activeTree, activeCacheNode, activeStateKey) {
    // The currently active entry. The entries form a linked list, sorted in
    // order of most recently active. This allows us to reuse parts of the list
    // without cloning, unless there's a reordering or removal.
    // TODO: Once we start tracking back/forward history at each route level,
    // we should use the history order instead. In other words, when traversing
    // to an existing entry as a result of a popstate event, we should maintain
    // the existing order instead of moving it to the front of the list. I think
    // an initial implementation of this could be to pass an incrementing id
    // to history.pushState/replaceState, then use that here for ordering.
    const [prevActiveEntry, setPrevActiveEntry] = (0, _react.useState)(()=>{
        const initialEntry = {
            tree: activeTree,
            cacheNode: activeCacheNode,
            stateKey: activeStateKey,
            next: null
        };
        return initialEntry;
    });
    if (prevActiveEntry.tree === activeTree) {
        // Fast path. The active tree hasn't changed, so we can reuse the
        // existing state.
        return prevActiveEntry;
    }
    // The route tree changed. Note that this doesn't mean that the tree changed
    // *at this level* — the change may be due to a child route. Either way, we
    // need to either add or update the router tree in the bfcache.
    //
    // The rest of the code looks more complicated than it actually is because we
    // can't mutate the state in place; we have to copy-on-write.
    // Create a new entry for the active cache key. This is the head of the new
    // linked list.
    const newActiveEntry = {
        tree: activeTree,
        cacheNode: activeCacheNode,
        stateKey: activeStateKey,
        next: null
    };
    // We need to append the old list onto the new list. If the head of the new
    // list was already present in the cache, then we'll need to clone everything
    // that came before it. Then we can reuse the rest.
    let n = 1;
    let oldEntry = prevActiveEntry;
    let clonedEntry = newActiveEntry;
    while(oldEntry !== null && n < MAX_BF_CACHE_ENTRIES){
        if (oldEntry.stateKey === activeStateKey) {
            // Fast path. This entry in the old list that corresponds to the key that
            // is now active. We've already placed a clone of this entry at the front
            // of the new list. We can reuse the rest of the old list without cloning.
            // NOTE: We don't need to worry about eviction in this case because we
            // haven't increased the size of the cache, and we assume the max size
            // is constant across renders. If we were to change it to a dynamic limit,
            // then the implementation would need to account for that.
            clonedEntry.next = oldEntry.next;
            break;
        } else {
            // Clone the entry and append it to the list.
            n++;
            const entry = {
                tree: oldEntry.tree,
                cacheNode: oldEntry.cacheNode,
                stateKey: oldEntry.stateKey,
                next: null
            };
            clonedEntry.next = entry;
            clonedEntry = entry;
        }
        oldEntry = oldEntry.next;
    }
    setPrevActiveEntry(newActiveEntry);
    return newActiveEntry;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Browser variant of `./client-boundary-params`. In the browser the params and
// searchParams are created at render time rather than dynamically tracked.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createClientParams: null,
    createClientSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createClientParams: function() {
        return _paramsbrowser.createRenderParamsFromClient;
    },
    createClientSearchParams: function() {
        return _searchparamsbrowser.createRenderSearchParamsFromClient;
    }
});
const _paramsbrowser = __turbopack_context__.r("[project]/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)");
const _searchparamsbrowser = __turbopack_context__.r("[project]/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientPageRoot", {
    enumerable: true,
    get: function() {
        return ClientPageRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientPageRoot({ Component, serverProvidedParams }) {
    let searchParams;
    let params;
    if (serverProvidedParams !== null) {
        searchParams = serverProvidedParams.searchParams;
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params as
        // props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
        // This is an intentional behavior change: when Cache Components is enabled,
        // client segments receive the "canonical" search params, not the
        // rewritten ones. Users should either call useSearchParams directly or pass
        // the rewritten ones in from a Server Component.
        // TODO: Log a deprecation error when this object is accessed
        searchParams = (0, _routeparams.urlSearchParamsToParsedUrlQuery)((0, _react.use)(_hooksclientcontextsharedruntime.SearchParamsContext));
    }
    const clientSearchParams = (0, _clientboundaryparams.createClientSearchParams)(searchParams);
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        params: clientParams,
        searchParams: clientSearchParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientSegmentRoot", {
    enumerable: true,
    get: function() {
        return ClientSegmentRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientSegmentRoot({ Component, slots, serverProvidedParams }) {
    let params;
    if (serverProvidedParams !== null) {
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params
        // as props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
    }
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        ...slots,
        params: clientParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return _impl.InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return _impl.PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return _impl.RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return _impl.SlotMarker;
    }
});
const _impl = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return SlotMarker;
    }
});
const InstantValidationBoundaryContext = null;
const PlaceValidationBoundaryBelowThisLevel = null;
const RenderValidationBoundaryAtThisLevel = null;
const SlotMarker = null;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    LoadingBoundaryProvider: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LoadingBoundaryProvider: function() {
        return LoadingBoundaryProvider;
    },
    /**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */ default: function() {
        return OuterLayoutRouter;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _unresolvedthenable = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)");
const _errorboundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)");
const _disablesmoothscroll = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)");
const _redirectboundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)");
const _errorboundary1 = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)");
const _boundary = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)");
const _createroutercachekey = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)");
const _bfcachestatemanager = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _pprnavigations = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/router-reducer/ppr-navigations.js [app-client] (ecmascript)");
const enableNewScrollHandler = ("TURBOPACK compile-time value", true);
const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _reactdom.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (typeof window === 'undefined') return null;
    // __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode is null during module init.
    // We need to lazily reference it.
    const internal_reactDOMfindDOMNode = __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode;
    return internal_reactDOMfindDOMNode(instance);
}
const rectProperties = [
    'bottom',
    'height',
    'left',
    'right',
    'top',
    'width',
    'x',
    'y'
];
/**
 * Check if a HTMLElement is hidden or fixed/sticky position
 */ function shouldSkipElement(element) {
    // we ignore fixed or sticky positioned elements since they'll likely pass the "in-viewport" check
    // and will result in a situation we bail on scroll because of something like a fixed nav,
    // even though the actual page content is offscreen
    if ([
        'sticky',
        'fixed'
    ].includes(getComputedStyle(element).position)) {
        return true;
    }
    // Uses `getBoundingClientRect` to check if the element is hidden instead of `offsetParent`
    // because `offsetParent` doesn't consider document/body
    const rect = element.getBoundingClientRect();
    return rectProperties.every((item)=>rect[item] === 0);
}
/**
 * Resolve the root scroll padding used by the viewport check.
 *
 * Computed lengths serialize as pixels, but percentages remain relative to
 * the scrollport. Preserve the existing behavior for values that still
 * contain unresolved CSS math.
 */ function getScrollPaddingTopInPixels(htmlElement, viewportHeight) {
    const scrollPaddingTop = getComputedStyle(htmlElement).scrollPaddingTop;
    const value = Number.parseFloat(scrollPaddingTop);
    if (!Number.isFinite(value) || value < 0) {
        return 0;
    }
    if (scrollPaddingTop.endsWith('px')) {
        return value;
    }
    if (scrollPaddingTop.endsWith('%')) {
        return value / 100 * viewportHeight;
    }
    return 0;
}
/**
 * Check where the top corner of the HTMLElement is relative to the usable
 * viewport.
 *
 * Scroll padding is resolved lazily so an empty Fragment does not trigger a
 * computed style read. The caller caches the value for the second check.
 */ function getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) {
    const rects = instance.getClientRects();
    if (rects.length === 0) {
        return 0;
    }
    let elementTop = Number.POSITIVE_INFINITY;
    for(let i = 0; i < rects.length; i++){
        const rect = rects[i];
        if (rect.top < elementTop) {
            elementTop = rect.top;
        }
    }
    return elementTop >= getScrollPaddingTop() && elementTop <= viewportHeight ? 1 : 2;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === 'top') {
        return document.body;
    }
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return document.getElementById(hashFragment) ?? // If the hash fragment is a name, the page has to scroll to the first element with that name.
    document.getElementsByName(hashFragment)[0] ?? null;
}
class InnerScrollAndFocusHandlerOld extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        this.handlePotentialScroll();
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args), this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once.
            const { focusAndScrollRef, cacheNode } = this.props;
            const scrollRef = focusAndScrollRef.forceScroll ? focusAndScrollRef.scrollRef : cacheNode.scrollRef;
            if (scrollRef === null || !scrollRef.current) return;
            let domNode = null;
            const hashFragment = focusAndScrollRef.hashFragment;
            if (hashFragment) {
                domNode = getHashFragmentDomNode(hashFragment);
                if (domNode === null) {
                    // A missing hash target is still a handled scroll intent. Do not
                    // fall back to the route segment or leave the intent pending.
                    scrollRef.current = false;
                    focusAndScrollRef.onlyHashChange = false;
                    focusAndScrollRef.hashFragment = null;
                    return;
                }
            }
            // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
            // This already caused a bug where the first child was a <link/> in head.
            if (!domNode) {
                domNode = findDOMNode(this);
            }
            // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
            if (!(domNode instanceof Element)) {
                return;
            }
            // Verify if the element is a HTMLElement and if we want to consider it for scroll behavior.
            // If the element is skipped, try to select the next sibling and try again.
            while(!(domNode instanceof HTMLElement) || shouldSkipElement(domNode)){
                if ("TURBOPACK compile-time truthy", 1) {
                    if (domNode.parentElement?.localName === 'head') {
                    // We enter this state when metadata was rendered as part of the page or via Next.js.
                    // This is always a bug in Next.js and caused by React hoisting metadata.
                    // Fixed with `experimental.appNewScrollHandler`
                    }
                }
                // No siblings found that match the criteria are found, so handle scroll higher up in the tree instead.
                if (domNode.nextElementSibling === null) {
                    return;
                }
                domNode = domNode.nextElementSibling;
            }
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
                // In case of hash scroll, we only need to scroll the element into view
                if (hashFragment) {
                    domNode.scrollIntoView();
                    return;
                }
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                const htmlElement = document.documentElement;
                const viewportHeight = htmlElement.clientHeight;
                let scrollPaddingTop = null;
                const getScrollPaddingTop = ()=>{
                    if (scrollPaddingTop === null) {
                        // Reuse the style and layout update from the geometry read above.
                        scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                    }
                    return scrollPaddingTop;
                };
                // If the element's top edge is already in the viewport, exit early.
                if (getScrollTargetState(domNode, viewportHeight, getScrollPaddingTop) === 1) {
                    return;
                }
                // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                htmlElement.scrollTop = 0;
                // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                if (getScrollTargetState(domNode, viewportHeight, getScrollPaddingTop) !== 1) {
                    // Scroll into view doesn't scroll horizontally by default when not needed
                    domNode.scrollIntoView();
                }
            }, {
                // We will force layout by querying domNode position
                dontForceLayout: true,
                onlyHashChange: focusAndScrollRef.onlyHashChange
            });
            // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
            focusAndScrollRef.onlyHashChange = false;
            focusAndScrollRef.hashFragment = null;
            // Set focus on the element
            domNode.focus();
        };
    }
}
/**
 * Fork of InnerScrollAndFocusHandlerOld using Fragment refs for scrolling.
 * No longer focuses the first host descendant.
 */ function InnerScrollHandlerNew(props) {
    const childrenRef = _react.default.useRef(null);
    (0, _react.useLayoutEffect)(()=>{
        const { focusAndScrollRef, cacheNode } = props;
        const scrollRef = focusAndScrollRef.forceScroll ? focusAndScrollRef.scrollRef : cacheNode.scrollRef;
        if (scrollRef === null || !scrollRef.current) return;
        let instance = null;
        const hashFragment = focusAndScrollRef.hashFragment;
        if (hashFragment) {
            instance = getHashFragmentDomNode(hashFragment);
            if (instance === null) {
                // A missing hash target is still a handled scroll intent. Do not
                // fall back to the route Fragment or leave the intent pending.
                scrollRef.current = false;
                focusAndScrollRef.onlyHashChange = false;
                focusAndScrollRef.hashFragment = null;
                return;
            }
        } else {
            instance = childrenRef.current;
        }
        // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
        if (instance === null) {
            return;
        }
        let didHandleScroll = false;
        (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
            const htmlElement = document.documentElement;
            let viewportHeight = null;
            let initialTargetState = null;
            let scrollPaddingTop = null;
            const getScrollPaddingTop = ()=>{
                if (scrollPaddingTop === null) {
                    // Reuse the style and layout update from the geometry read.
                    scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                }
                return scrollPaddingTop;
            };
            if (!hashFragment) {
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                viewportHeight = htmlElement.clientHeight;
                initialTargetState = getScrollTargetState(instance, viewportHeight, getScrollPaddingTop);
                // An empty Fragment is not a scroll target. In particular, avoid
                // React's sibling fallback and leave the scroll signal available
                // for another changed segment.
                if (initialTargetState === 0) {
                    return;
                }
            }
            didHandleScroll = true;
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            // This handler intentionally leaves focus untouched; resetting focus on
            // navigation is deferred.
            // In case of hash scroll, we only need to scroll the element into view
            if (hashFragment) {
                instance.scrollIntoView();
                return;
            }
            // If the element's top edge is already in the viewport, exit early.
            if (initialTargetState === 1) {
                return;
            }
            // Otherwise, try scrolling go the top of the document to be backward compatible with pages
            // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
            // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
            // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
            htmlElement.scrollTop = 0;
            // Scroll to domNode if domNode is not in viewport when scrolled to top of document
            if (getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) === 2) {
                // Scroll into view doesn't scroll horizontally by default when not needed
                instance.scrollIntoView();
            }
        }, {
            // We will force layout by querying domNode position
            dontForceLayout: true,
            onlyHashChange: focusAndScrollRef.onlyHashChange
        });
        if (!didHandleScroll) {
            return;
        }
        // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
        focusAndScrollRef.onlyHashChange = false;
        focusAndScrollRef.hashFragment = null;
    }, // but be prepared for lots of manual testing.
    undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
        ref: childrenRef,
        children: props.children
    });
}
const InnerScrollAndMaybeFocusHandler = ("TURBOPACK compile-time truthy", 1) ? InnerScrollHandlerNew : "TURBOPACK unreachable";
function ScrollAndMaybeFocusHandler({ children, cacheNode }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerScrollAndMaybeFocusHandler, {
        focusAndScrollRef: context.focusAndScrollRef,
        cacheNode: cacheNode,
        children: children
    });
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter({ tree, segmentPath, debugNameContext, cacheNode: maybeCacheNode, params, url, isActive }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    const parentNavPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant global layout router not mounted'), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    const cacheNode = maybeCacheNode !== null ? maybeCacheNode : // This should only be reachable for inactive/hidden segments, during
    // prerendering The active segment should always be consistent with the
    // CacheNode tree. Regardless, if we don't have a matching CacheNode, we
    // must suspend rather than render nothing, to prevent showing an
    // inconsistent route.
    (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    // `rsc` represents the renderable node for this segment.
    // If this segment has a `prefetchRsc`, it's the statically prefetched data.
    // We should use that on initial render instead of `rsc`. Then we'll switch
    // to `rsc` when the dynamic response streams in.
    //
    // If no prefetch data is available, then we go straight to rendering `rsc`.
    const resolvedPrefetchRsc = cacheNode.prefetchRsc !== null ? cacheNode.prefetchRsc : cacheNode.rsc;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    const rsc = (0, _react.useDeferredValue)(cacheNode.rsc, resolvedPrefetchRsc);
    // `rsc` is either a React node or a promise for a React node, except we
    // special case `null` to represent that this segment's data is missing. If
    // it's a promise, we need to unwrap it so we can determine whether or not the
    // data is missing.
    let resolvedRsc;
    if ((0, _pprnavigations.isDeferredRsc)(rsc)) {
        const unwrappedRsc = (0, _react.use)(rsc);
        if (unwrappedRsc === null) {
            // If the promise was resolved to `null`, it means the data for this
            // segment was not returned by the server. Suspend indefinitely. When this
            // happens, the router is responsible for triggering a new state update to
            // un-suspend this segment.
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = unwrappedRsc;
    } else {
        // This is not a deferred RSC promise. Don't need to unwrap it.
        if (rsc === null) {
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = rsc;
    }
    // In dev, we create a NavigationPromisesContext containing the instrumented promises that provide
    // `useSelectedLayoutSegment` and `useSelectedLayoutSegments`.
    // Promises are cached outside of render to survive suspense retries.
    let navigationPromises = null;
    if ("TURBOPACK compile-time truthy", 1) {
        const { createNestedLayoutNavigationPromises } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)");
        navigationPromises = createNestedLayoutNavigationPromises(tree, parentNavPromises);
    }
    let children = resolvedRsc;
    if (navigationPromises) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.NavigationPromisesContext.Provider, {
            value: navigationPromises,
            children: resolvedRsc
        });
    }
    children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: tree,
            parentCacheNode: cacheNode,
            parentSegmentPath: segmentPath,
            parentParams: params,
            // This is always set to null as we enter a child segment. It's
            // populated by LoadingBoundaryProvider the next time we reach a
            // loading boundary.
            parentLoadingData: null,
            debugNameContext: debugNameContext,
            // TODO-APP: overriding of url for parallel routes
            url: url,
            isActive: isActive
        },
        children: children
    });
    return children;
}
function LoadingBoundaryProvider({ loading, children }) {
    // Provides the data needed to render a loading.tsx boundary, via context.
    //
    // loading.tsx creates a Suspense boundary around each of a layout's child
    // slots. (Might be bit confusing to think about the data flow, but: if
    // loading.tsx and layout.tsx are in the same directory, they are assigned
    // to the same CacheNode.)
    //
    // This provider component does not render the Suspense boundary directly;
    // that's handled by LoadingBoundary.
    //
    // TODO: For simplicity, we should combine this provider with LoadingBoundary
    // and render the Suspense boundary directly. The only real benefit of doing
    // it separately is so that when there are multiple parallel routes, we only
    // send the boundary data once, rather than once per child. But that's a
    // negligible benefit and can be achieved via caching instead.
    const parentContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
    if (parentContext === null) {
        return children;
    }
    // All values except for parentLoadingData are the same as the parent context.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: parentContext.parentTree,
            parentCacheNode: parentContext.parentCacheNode,
            parentSegmentPath: parentContext.parentSegmentPath,
            parentParams: parentContext.parentParams,
            parentLoadingData: loading,
            debugNameContext: parentContext.debugNameContext,
            url: parentContext.url,
            isActive: parentContext.isActive
        },
        children: children
    });
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary({ name, loading, children }) {
    // TODO: For LoadingBoundary, and the other built-in boundary types, don't
    // wrap in an extra function component if no user-defined boundary is
    // provided. In other words, inline this conditional wrapping logic into
    // the parent component. More efficient and keeps unnecessary junk out of
    // the component stack.
    if (loading !== null) {
        const loadingRsc = loading[0];
        const loadingStyles = loading[1];
        const loadingScripts = loading[2];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
            name: name,
            fallback: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    loadingStyles,
                    loadingScripts,
                    loadingRsc
                ]
            }),
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
function OuterLayoutRouter({ parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized, segmentViewBoundaries }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw Object.defineProperty(new Error('invariant expected layout router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }
    const { parentTree, parentCacheNode, parentSegmentPath, parentParams, parentLoadingData, url, isActive, debugNameContext } = context;
    // Get the CacheNode for this segment by reading it from the parent segment's
    // child map.
    const parentTreeSegment = parentTree[0];
    const segmentPath = parentSegmentPath === null ? // the code. We should clean this up.
    [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        parentTreeSegment,
        parallelRouterKey
    ]);
    // The "state" key of a segment is the one passed to React — it represents the
    // identity of the UI tree. Whenever the state key changes, the tree is
    // recreated and the state is reset. In the App Router model, search params do
    // not cause state to be lost, so two segments with the same segment path but
    // different search params should have the same state key.
    //
    // The "cache" key of a segment, however, *does* include the search params, if
    // it's possible that the segment accessed the search params on the server.
    // (This only applies to page segments; layout segments cannot access search
    // params on the server.)
    const activeTree = parentTree[1][parallelRouterKey];
    const maybeParentSlots = parentCacheNode.slots;
    if (activeTree === undefined || maybeParentSlots === null) {
        // Could not find a matching segment. The client tree is inconsistent with
        // the server tree. Suspend indefinitely; the router will have already
        // detected the inconsistency when handling the server response, and
        // triggered a refresh of the page to recover.
        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    }
    let maybeValidationBoundaryId = null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const activeSegment = activeTree[0];
    const activeCacheNode = maybeParentSlots[parallelRouterKey] ?? null;
    const activeStateKey = (0, _createroutercachekey.createRouterCacheKey)(activeSegment, true) // no search params
    ;
    // At each level of the route tree, not only do we render the currently
    // active segment — we also render the last N segments that were active at
    // this level inside a hidden <Activity> boundary, to preserve their state
    // if or when the user navigates to them again.
    //
    // bfcacheEntry is a linked list of FlightRouterStates.
    let bfcacheEntry = (0, _bfcachestatemanager.useRouterBFCache)(activeTree, activeCacheNode, activeStateKey);
    let children = [];
    do {
        const tree = bfcacheEntry.tree;
        const cacheNode = bfcacheEntry.cacheNode;
        const stateKey = bfcacheEntry.stateKey;
        const segment = tree[0];
        /*
    - Error boundary
      - Only renders error boundary if error component is provided.
      - Rendered for each segment to ensure they have their own error state.
      - When gracefully degrade for bots, skip rendering error boundary.
    - Loading boundary
      - Only renders suspense boundary if loading components is provided.
      - Rendered for each segment to ensure they have their own loading state.
      - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
  */ let segmentBoundaryTriggerNode = null;
        let segmentViewStateNode = null;
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentBoundaryTriggerNode, SegmentViewStateNode } = __turbopack_context__.r("[project]/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            const pagePrefix = (0, _apppaths.normalizeAppPath)(url);
            segmentViewStateNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentViewStateNode, {
                page: pagePrefix
            }, pagePrefix);
            segmentBoundaryTriggerNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentBoundaryTriggerNode, {})
            });
        }
        let params = parentParams;
        if (Array.isArray(segment)) {
            // This segment contains a route param. Accumulate these as we traverse
            // down the router tree. The result represents the set of params that
            // the layout/page components are permitted to access below this point.
            const paramName = segment[0];
            const paramCacheKey = segment[1];
            const paramType = segment[2];
            const paramValue = (0, _routeparams.getParamValueFromCacheKey)(paramCacheKey, paramType);
            if (paramValue !== null) {
                params = {
                    ...parentParams,
                    [paramName]: paramValue
                };
            }
        }
        const debugName = getBoundaryDebugNameFromSegment(segment);
        // `debugNameContext` represents the nearest non-"virtual" parent segment.
        // `getBoundaryDebugNameFromSegment` returns undefined for virtual segments.
        // So if `debugName` is undefined, the context is passed through unchanged.
        const childDebugNameContext = debugName ?? debugNameContext;
        // In practical terms, clicking this name in the Suspense DevTools
        // should select the child slots of that layout.
        //
        // So the name we apply to the Activity boundary is actually based on
        // the nearest parent segments.
        //
        // We skip over "virtual" parents, i.e. ones inserted by Next.js that
        // don't correspond to application-defined code.
        const isVirtual = debugName === undefined;
        const debugNameToDisplay = isVirtual ? undefined : debugNameContext;
        let templateValue = /*#__PURE__*/ (0, _jsxruntime.jsxs)(ScrollAndMaybeFocusHandler, {
            cacheNode: cacheNode,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                    errorComponent: error,
                    errorStyles: errorStyles,
                    errorScripts: errorScripts,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(LoadingBoundary, {
                        name: debugNameToDisplay,
                        // TODO: The loading module data for a segment is stored on the
                        // parent, then applied to each of that parent segment's
                        // parallel route slots. In the simple case where there's only
                        // one parallel route (the `children` slot), this is no
                        // different from if the loading module data were stored on the
                        // child directly. But I'm not sure this actually makes sense
                        // when there are multiple parallel routes. It's not a huge
                        // issue because you always have the option to define a narrower
                        // loading boundary for a particular slot. But this sort of
                        // smells like an implementation accident to me.
                        loading: parentLoadingData,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary1.HTTPAccessFallbackBoundary, {
                            notFound: notFound,
                            forbidden: forbidden,
                            unauthorized: unauthorized,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_redirectboundary.RedirectBoundary, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                        url: url,
                                        tree: tree,
                                        params: params,
                                        cacheNode: cacheNode,
                                        segmentPath: segmentPath,
                                        debugNameContext: childDebugNameContext,
                                        isActive: isActive && stateKey === activeStateKey
                                    }),
                                    segmentBoundaryTriggerNode
                                ]
                            })
                        })
                    })
                }),
                segmentViewStateNode
            ]
        });
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        let child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_approutercontextsharedruntime.TemplateContext.Provider, {
            value: templateValue,
            children: [
                templateStyles,
                templateScripts,
                template
            ]
        }, stateKey);
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentStateProvider } = __turbopack_context__.r("[project]/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(SegmentStateProvider, {
                children: [
                    child,
                    segmentViewBoundaries
                ]
            }, stateKey);
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        children.push(child);
        bfcacheEntry = bfcacheEntry.next;
    }while (bfcacheEntry !== null)
    return children;
}
function getBoundaryDebugNameFromSegment(segment) {
    if (segment === '/') {
        // Reached the root
        return '/';
    }
    if (typeof segment === 'string') {
        if (isVirtualLayout(segment)) {
            return undefined;
        } else {
            return segment + '/';
        }
    }
    const paramCacheKey = segment[1];
    return paramCacheKey + '/';
}
function isVirtualLayout(segment) {
    return(// (like __PAGE__ and __DEFAULT__) to avoid collisions with
    // user-defined route groups.
    segment === '(__SLOT__)');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontextsharedruntime.TemplateContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedParams = new WeakMap();
function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(underlyingParams);
    const proxiedProperties = new Set();
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            warnForEnumeration();
            return Reflect.ownKeys(target);
        }
    });
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A param property was accessed directly with ${expression}. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForEnumeration() {
    console.error(`params are being enumerated. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderParamsFromClient(clientParams) {
    return makeDynamicallyTrackedParamsWithDevWarnings(clientParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const createRenderParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)").createRenderParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedSearchParams = new WeakMap();
function makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const proxiedProperties = new Set();
    const promise = Promise.resolve(underlyingSearchParams);
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            warnForSyncSpread();
            return Reflect.ownKeys(target);
        }
    });
    CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A searchParam property was accessed directly with ${expression}. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForSyncSpread() {
    console.error(`The keys of \`searchParams\` were accessed directly. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderSearchParamsFromClient(underlyingSearchParams) {
    return makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const createRenderSearchParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)").createRenderSearchParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconMark", {
    enumerable: true,
    get: function() {
        return IconMark;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const IconMark = ()=>{
    if (typeof window !== 'undefined') {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
        name: "\xabnxt-icon\xbb"
    });
};
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Run function with `scroll-behavior: auto` applied to `<html/>`.
 * This css change will be reverted after the function finishes.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", {
    enumerable: true,
    get: function() {
        return disableSmoothScrollDuringRouteTransition;
    }
});
function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
    // if only the hash is changed, we don't need to disable smooth scrolling
    // we only care to prevent smooth scrolling when navigating to a new page to avoid jarring UX
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const hasDataAttribute = htmlElement.dataset.scrollBehavior === 'smooth';
    if (!hasDataAttribute) {
        // Warn if smooth scrolling is detected but no data attribute is present
        if (("TURBOPACK compile-time value", "development") === 'development' && getComputedStyle(htmlElement).scrollBehavior === 'smooth') {
            const { warnOnce } = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
            warnOnce('Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, ' + 'add `data-scroll-behavior="smooth"` to your <html> element. ' + 'Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior');
        }
        // No smooth scrolling configured, run directly without style manipulation
        fn();
        return;
    }
    // Proceed with temporarily disabling smooth scrolling
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
}
}),
"[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    describeHasCheckingStringProperty: null,
    describeStringPropertyAccess: null,
    wellKnownProperties: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    describeHasCheckingStringProperty: function() {
        return describeHasCheckingStringProperty;
    },
    describeStringPropertyAccess: function() {
        return describeStringPropertyAccess;
    },
    wellKnownProperties: function() {
        return wellKnownProperties;
    }
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return `\`${target}.${prop}\``;
    }
    return `\`${target}[${JSON.stringify(prop)}]\``;
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return `\`Reflect.has(${target}, ${stringifiedProp})\`, \`${stringifiedProp} in ${target}\`, or similar`;
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    'then',
    'catch',
    'finally',
    // React Promise extension
    'status',
    // 'value',
    // 'error',
    // React introspection
    'displayName',
    '_debugInfo',
    // Common tested properties
    'toJSON',
    '$$typeof',
    '__esModule',
    // Tested by flight when checking for iterables
    '@@iterator'
]);
}),
"[project]/src/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockOpportunities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockOpportunities.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const defaultProfile = {
    name: 'Ayaan',
    college: 'Example Institute of Technology',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    interests: [
        'Artificial Intelligence',
        'Web Development',
        'Hackathons'
    ],
    skills: [
        'Python',
        'React',
        'Machine Learning'
    ],
    location: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    distancePreference: 10,
    role: 'Student'
};
const defaultNotifications = [
    {
        id: 'notif-1',
        message: 'Your saved AI Hackathon 2026 closes in 2 days. Complete your registration!',
        timestamp: '2 hours ago',
        read: false,
        type: 'warning'
    },
    {
        id: 'notif-2',
        message: '3 new hackathons and internships match your interest in Web Development.',
        timestamp: '5 hours ago',
        read: false,
        type: 'info'
    },
    {
        id: 'notif-3',
        message: 'React Developers Meetup - NCR Edition is happening 3.2 km from your location this weekend.',
        timestamp: '1 day ago',
        read: true,
        type: 'info'
    },
    {
        id: 'notif-4',
        message: 'Registration successful for React Developers Meetup - NCR Edition.',
        timestamp: '1 day ago',
        read: true,
        type: 'success'
    }
];
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    _s();
    const [role, setRoleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Student');
    const [userProfile, setUserProfileState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isOnboarded, setIsOnboardedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [opportunities, setOpportunities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedOpportunityIds, setSavedOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'opp-1',
        'opp-6'
    ]);
    const [registeredOpportunityIds, setRegisteredOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'opp-18'
    ]);
    const [completedOpportunityIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'opp-3'
    ]);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load initial state on client mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const storedRole = localStorage.getItem('localystic_role');
                const storedProfile = localStorage.getItem('localystic_profile');
                const storedOnboarded = localStorage.getItem('localystic_onboarded');
                const storedOpps = localStorage.getItem('localystic_opportunities');
                const storedSaved = localStorage.getItem('localystic_saved');
                const storedRegistered = localStorage.getItem('localystic_registered');
                const storedNotifs = localStorage.getItem('localystic_notifications');
                setRoleState(storedRole || 'Student');
                setUserProfileState(storedProfile ? JSON.parse(storedProfile) : defaultProfile);
                setIsOnboardedState(storedOnboarded ? JSON.parse(storedOnboarded) : true);
                setOpportunities(storedOpps ? JSON.parse(storedOpps) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockOpportunities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockOpportunities"]);
                setSavedOpportunityIds(storedSaved ? JSON.parse(storedSaved) : [
                    'opp-1',
                    'opp-6'
                ]);
                setRegisteredOpportunityIds(storedRegistered ? JSON.parse(storedRegistered) : [
                    'opp-18'
                ]);
                setNotifications(storedNotifs ? JSON.parse(storedNotifs) : defaultNotifications);
            }
        }
    }["AppProvider.useEffect"], []);
    const setRole = (newRole)=>{
        setRoleState(newRole);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('localystic_role', newRole);
        }
    };
    const setUserProfile = (profile)=>{
        setUserProfileState(profile);
        if ("TURBOPACK compile-time truthy", 1) {
            if (profile) {
                localStorage.setItem('localystic_profile', JSON.stringify(profile));
            } else {
                localStorage.removeItem('localystic_profile');
            }
        }
    };
    const setIsOnboarded = (status)=>{
        setIsOnboardedState(status);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('localystic_onboarded', JSON.stringify(status));
        }
    };
    const syncOpportunities = (newOpps)=>{
        setOpportunities(newOpps);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('localystic_opportunities', JSON.stringify(newOpps));
        }
    };
    const toggleSaveOpportunity = (id)=>{
        setSavedOpportunityIds((prev)=>{
            const isAlreadySaved = prev.includes(id);
            const updated = isAlreadySaved ? prev.filter((oId)=>oId !== id) : [
                ...prev,
                id
            ];
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('localystic_saved', JSON.stringify(updated));
            }
            return updated;
        });
    };
    const registerForOpportunity = (id)=>{
        setRegisteredOpportunityIds((prev)=>{
            if (prev.includes(id)) return prev;
            const updated = [
                ...prev,
                id
            ];
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('localystic_registered', JSON.stringify(updated));
            }
            // Add success notification
            const matchedOpp = opportunities.find((o)=>o.id === id);
            const newNotif = {
                id: `notif-${Date.now()}`,
                message: `Successfully registered for ${matchedOpp ? matchedOpp.title : 'the opportunity'}!`,
                timestamp: 'Just now',
                read: false,
                type: 'success'
            };
            setNotifications((notifs)=>{
                const nextNotifs = [
                    newNotif,
                    ...notifs
                ];
                localStorage.setItem('localystic_notifications', JSON.stringify(nextNotifs));
                return nextNotifs;
            });
            return updated;
        });
    };
    const markNotificationRead = (id)=>{
        setNotifications((prev)=>{
            const updated = prev.map((n)=>n.id === id ? {
                    ...n,
                    read: true
                } : n);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('localystic_notifications', JSON.stringify(updated));
            }
            return updated;
        });
    };
    const markAllNotificationsAsRead = ()=>{
        setNotifications((prev)=>{
            const updated = prev.map((n)=>({
                    ...n,
                    read: true
                }));
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('localystic_notifications', JSON.stringify(updated));
            }
            return updated;
        });
    };
    const addOpportunity = (oppData)=>{
        const newId = `opp-host-${Date.now()}`;
        const newOpp = {
            ...oppData,
            id: newId,
            matchScore: Math.floor(Math.random() * 25) + 70,
            matchReasons: [
                `Matches your ${oppData.category.slice(0, -1)} preference`,
                `Located in ${oppData.city}`,
                'Fits standard student skillsets'
            ],
            status: 'Published'
        };
        const nextOpps = [
            newOpp,
            ...opportunities
        ];
        syncOpportunities(nextOpps);
        return newId;
    };
    const updateOpportunity = (id, updatedFields)=>{
        const nextOpps = opportunities.map((opp)=>opp.id === id ? {
                ...opp,
                ...updatedFields
            } : opp);
        syncOpportunities(nextOpps);
    };
    const deleteOpportunity = (id)=>{
        const nextOpps = opportunities.filter((opp)=>opp.id !== id);
        syncOpportunities(nextOpps);
    };
    const logout = ()=>{
        setUserProfileState(null);
        setIsOnboardedState(false);
        setRoleState('Student');
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('localystic_role');
            localStorage.removeItem('localystic_profile');
            localStorage.removeItem('localystic_onboarded');
            localStorage.removeItem('localystic_saved');
            localStorage.removeItem('localystic_registered');
            localStorage.removeItem('localystic_notifications');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            role,
            setRole,
            userProfile,
            setUserProfile,
            isOnboarded,
            setIsOnboarded,
            opportunities,
            setOpportunities,
            savedOpportunityIds,
            toggleSaveOpportunity,
            registeredOpportunityIds,
            registerForOpportunity,
            completedOpportunityIds,
            notifications,
            markNotificationRead,
            markAllNotificationsAsRead,
            addOpportunity,
            updateOpportunity,
            deleteOpportunity,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
_s(AppProvider, "s92+k1AubR9kzJJm+JOsPL2s5NQ=");
_c = AppProvider;
function useApp() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/mockOpportunities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockOpportunities",
    ()=>mockOpportunities
]);
const mockOpportunities = [
    {
        id: 'opp-1',
        title: 'AI Hackathon 2026',
        description: 'Build the next generation of generative AI models. Work in teams of 1 to 4 to design, build, and pitch an AI-powered solution solving real-world problems. Mentorship will be provided by top developers in the industry.',
        category: 'Hackathons',
        host: 'Tech Labs NCR',
        date: 'September 12, 2026',
        deadline: '2026-09-10T23:59:59',
        location: 'Connaught Place, Delhi',
        city: 'Delhi',
        latitude: 28.6304,
        longitude: 77.2177,
        skills: [
            'Python',
            'React',
            'Machine Learning',
            'API Integration'
        ],
        eligibility: 'B.Tech / MCA / BCA students (Any Year)',
        price: 'Free',
        mode: 'Offline',
        matchScore: 94,
        matchReasons: [
            'Matches your AI & Machine Learning interest',
            'Suitable for your CSE branch and 2nd Year status',
            'Under 10 km away from your location',
            'Matches your hackathon preference'
        ],
        source: 'HOST',
        sourceName: 'Localystic',
        registrationUrl: '/register-event/opp-1',
        status: 'Published'
    },
    {
        id: 'opp-2',
        title: 'Frontend Developer Intern',
        description: 'Looking for a passionate React & Next.js intern to build responsive, modern interfaces. You will work directly with our engineering team to ship production features.',
        category: 'Internships',
        host: 'InnovateCorp Software',
        date: 'Starts October 1, 2026',
        deadline: '2026-09-15T18:00:00',
        location: 'Sector 62, Noida',
        city: 'Noida',
        latitude: 28.6219,
        longitude: 77.3794,
        skills: [
            'React',
            'Next.js',
            'Tailwind CSS',
            'TypeScript'
        ],
        eligibility: 'B.Tech / BCA students in pre-final or final year',
        price: 'Paid (Stipend: ₹25,000/month)',
        mode: 'Offline',
        matchScore: 88,
        matchReasons: [
            'Matches your Web Development interest',
            'Aligns with your React & Next.js skills',
            'Opportunity preference matches Internships'
        ],
        source: 'HOST',
        sourceName: 'InnovateCorp',
        registrationUrl: 'https://innovatecorp.com/careers',
        status: 'Published'
    },
    {
        id: 'opp-3',
        title: 'Blockchain & Web3 Workshop',
        description: 'Learn Solidity, smart contract deployment, and decentralized application architecture. Hand-on labs where you build and deploy your first smart contract on Ethereum testnet.',
        category: 'Workshops',
        host: 'Cyber Block Community',
        date: 'September 2, 2026',
        deadline: '2026-09-01T23:59:59',
        location: 'Cyber Hub, Gurugram',
        city: 'Gurugram',
        latitude: 28.4950,
        longitude: 77.0878,
        skills: [
            'Solidity',
            'Web3.js',
            'Cryptography'
        ],
        eligibility: 'Anyone interested in blockchain',
        price: '₹500',
        mode: 'Offline',
        matchScore: 72,
        matchReasons: [
            'Matches your interest in Cybersecurity & Web3',
            'Held at Cyber Hub (close to your transit network)'
        ],
        source: 'EXTERNAL',
        sourceName: 'Unstop',
        sourceUrl: 'https://unstop.com/blockchain-web3-workshop',
        registrationUrl: 'https://unstop.com/blockchain-web3-workshop',
        status: 'Published'
    },
    {
        id: 'opp-4',
        title: 'Teach Coding to Local Kids',
        description: 'Volunteering initiative to teach basic computer science and Scratch visual coding to underprivileged children in government schools around NCR.',
        category: 'Volunteering',
        host: 'Code for India Foundation',
        date: 'Saturdays, Sep 5 - Oct 24, 2026',
        deadline: '2026-09-03T23:59:59',
        location: 'Dwarka, Delhi',
        city: 'Delhi',
        latitude: 28.5889,
        longitude: 77.0565,
        skills: [
            'Communication',
            'Scratch',
            'Basic Programming'
        ],
        eligibility: 'Any college student willing to volunteer',
        price: 'Free',
        mode: 'Offline',
        matchScore: 85,
        matchReasons: [
            'Matches your Social Impact interest',
            'Opportunity preference matches Volunteering',
            'Flexible weekend schedule'
        ],
        source: 'HOST',
        sourceName: 'Code for India',
        registrationUrl: '/register-event/opp-4',
        status: 'Published'
    },
    {
        id: 'opp-5',
        title: 'National Coding Competition',
        description: 'Put your DSA skills to the test in this intensive competitive coding league. Solve complex algorithmic challenges under strict time constraints.',
        category: 'Competitions',
        host: 'Greater Noida Tech Institute',
        date: 'September 18, 2026',
        deadline: '2026-09-12T23:59:59',
        location: 'Knowledge Park, Greater Noida',
        city: 'Greater Noida',
        latitude: 28.4601,
        longitude: 77.4939,
        skills: [
            'C++',
            'Java',
            'Python',
            'Algorithms'
        ],
        eligibility: 'All college students nationwide',
        price: 'Free',
        mode: 'Offline',
        matchScore: 78,
        matchReasons: [
            'Matches your Python skill',
            'Matches your Competitive Programming interest',
            'Registration closes soon'
        ],
        source: 'HOST',
        sourceName: 'GNTI',
        registrationUrl: '/register-event/opp-5',
        status: 'Published'
    },
    {
        id: 'opp-6',
        title: 'UX Design Meetup & Critique',
        description: 'Bring your portfolio, design files, or ideas. Network with lead UX designers from companies like Swiggy, Paytm, and Zomato. Get feedback on your designs.',
        category: 'Meetups',
        host: 'Noida Designers Collective',
        date: 'September 6, 2026',
        deadline: '2026-09-05T23:59:59',
        location: 'Sector 15, Noida',
        city: 'Noida',
        latitude: 28.5786,
        longitude: 77.3180,
        skills: [
            'Figma',
            'UI/UX Design',
            'User Research'
        ],
        eligibility: 'Aspiring and Professional Designers',
        price: 'Free',
        mode: 'Offline',
        matchScore: 92,
        matchReasons: [
            'Matches your UI/UX Design interest',
            'Under 5 km from your campus area',
            'Matches your Meetups preference'
        ],
        source: 'HOST',
        sourceName: 'Noida Designers Collective',
        registrationUrl: '/register-event/opp-6',
        status: 'Published'
    },
    {
        id: 'opp-7',
        title: 'NCR Tech Leaders Summit 2026',
        description: 'Join industry CTOs, architects, and engineering directors to discuss the future of Scalable Systems, Cloud Computing, GenAI, and Cybersecurity.',
        category: 'Conferences',
        host: 'NCR Tech Chamber',
        date: 'September 25, 2026',
        deadline: '2026-09-20T23:59:59',
        location: 'Sohna Road, Gurugram',
        city: 'Gurugram',
        latitude: 28.4128,
        longitude: 77.0410,
        skills: [
            'System Design',
            'GenAI',
            'Cybersecurity',
            'Cloud Systems'
        ],
        eligibility: 'Students, Professionals, Founders',
        price: '₹1200 (Student Discount Available)',
        mode: 'Offline',
        matchScore: 81,
        matchReasons: [
            'Matches your Artificial Intelligence interest',
            'Great for career networking'
        ],
        source: 'EXTERNAL',
        sourceName: 'Eventbrite',
        sourceUrl: 'https://eventbrite.com/ncr-tech-leaders-2026',
        registrationUrl: 'https://eventbrite.com/ncr-tech-leaders-2026',
        status: 'Published'
    },
    {
        id: 'opp-8',
        title: 'Ghaziabad Hackfest v1.0',
        description: 'A 24-hour hackathon focused on solving local community, municipal waste, and green energy problems using software or hardware prototypes.',
        category: 'Hackathons',
        host: 'Inderprastha Engineering College',
        date: 'September 8, 2026',
        deadline: '2026-09-06T23:59:59',
        location: 'Sahibabad, Ghaziabad',
        city: 'Ghaziabad',
        latitude: 28.6750,
        longitude: 77.3499,
        skills: [
            'Web Dev',
            'App Dev',
            'IOT',
            'Python'
        ],
        eligibility: 'B.Tech / Science Stream students',
        price: 'Free',
        mode: 'Offline',
        matchScore: 90,
        matchReasons: [
            'Matches your Web Development & App Development interest',
            'Opportunity deadline closes in 2 days',
            'Within Ghaziabad area'
        ],
        source: 'HOST',
        sourceName: 'IPEC Event Club',
        registrationUrl: '/register-event/opp-8',
        status: 'Published'
    },
    {
        id: 'opp-9',
        title: 'Green Delhi Tree Plantation Drive',
        description: 'Help us plant 5,000 native trees across Delhi parks. Bring your friends. Shovels, plants, and refreshments will be provided.',
        category: 'Volunteering',
        host: 'Green Delhi Coalition',
        date: 'September 13, 2026',
        deadline: '2026-09-12T23:59:59',
        location: 'Lodi Gardens, Delhi',
        city: 'Delhi',
        latitude: 28.5931,
        longitude: 77.2198,
        skills: [
            'Teamwork',
            'Environmental Science'
        ],
        eligibility: 'Open to all citizens',
        price: 'Free',
        mode: 'Offline',
        matchScore: 70,
        matchReasons: [
            'Opportunity preference matches Volunteering',
            'Location is easily reachable by Metro'
        ],
        source: 'HOST',
        sourceName: 'Green Delhi Coalition',
        registrationUrl: '/register-event/opp-9',
        status: 'Published'
    },
    {
        id: 'opp-10',
        title: 'Machine Learning Masterclass',
        description: 'Deep dive into neural networks, transformer models, and supervised learning. Hands-on coding exercises using PyTorch and Jupyter notebooks.',
        category: 'Workshops',
        host: 'Tech Advancement Institute',
        date: 'September 19, 2026',
        deadline: '2026-09-15T23:59:59',
        location: 'Sector 125, Noida',
        city: 'Noida',
        latitude: 28.5449,
        longitude: 77.3328,
        skills: [
            'Python',
            'PyTorch',
            'Data Science',
            'Machine Learning'
        ],
        eligibility: 'Students with basic Python knowledge',
        price: 'Free',
        mode: 'Offline',
        matchScore: 95,
        matchReasons: [
            'Matches your Machine Learning & Python interests',
            'Matches your Workshop preference',
            'Located in Noida (within 8 km of major colleges)'
        ],
        source: 'HOST',
        sourceName: 'Tech Advancement Institute',
        registrationUrl: '/register-event/opp-10',
        status: 'Published'
    },
    {
        id: 'opp-11',
        title: 'Cybersecurity Capture The Flag',
        description: 'Test your ethical hacking, reverse engineering, web exploitation, and cryptography skills in our annual jeopardy-style CTF.',
        category: 'Competitions',
        host: 'Society of Ethical Hackers',
        date: 'September 22, 2026',
        deadline: '2026-09-20T23:59:59',
        location: 'South Extension, Delhi',
        city: 'Delhi',
        latitude: 28.5670,
        longitude: 77.2194,
        skills: [
            'Cybersecurity',
            'Linux',
            'Network Security',
            'Cryptography'
        ],
        eligibility: 'All college and school students welcome',
        price: 'Free',
        mode: 'Offline',
        matchScore: 80,
        matchReasons: [
            'Matches your Cybersecurity interest',
            'Matches your Competition preference'
        ],
        source: 'HOST',
        sourceName: 'Society of Ethical Hackers',
        registrationUrl: '/register-event/opp-11',
        status: 'Published'
    },
    {
        id: 'opp-12',
        title: 'AI in Healthcare Panel Discussion',
        description: 'A networking event and panel discussion regarding the disruption, deployment, and validation of AI models in the medical diagnostic field.',
        category: 'Networking',
        host: 'AI Delhi Meetup Group',
        date: 'September 10, 2026',
        deadline: '2026-09-09T23:59:59',
        location: 'Saket, Delhi',
        city: 'Delhi',
        latitude: 28.5244,
        longitude: 77.2066,
        skills: [
            'AI',
            'Healthcare IT',
            'Networking'
        ],
        eligibility: 'Students, doctors, developers',
        price: 'Free',
        mode: 'Offline',
        matchScore: 89,
        matchReasons: [
            'Matches your Artificial Intelligence interest',
            'Matches your Networking preference'
        ],
        source: 'EXTERNAL',
        sourceName: 'Meetup.com',
        sourceUrl: 'https://meetup.com/ai-in-healthcare-delhi',
        registrationUrl: 'https://meetup.com/ai-in-healthcare-delhi',
        status: 'Published'
    },
    {
        id: 'opp-13',
        title: 'Mobile App Developer Intern (iOS/Android)',
        description: 'Join a high-growth startup to build native and cross-platform apps using Flutter/React Native. High opportunities for PPO (Pre-Placement Offer).',
        category: 'Internships',
        host: 'SwiftTech Labs',
        date: 'Starts October 15, 2026',
        deadline: '2026-10-01T23:59:59',
        location: 'Sector 44, Gurugram',
        city: 'Gurugram',
        latitude: 28.4552,
        longitude: 77.0697,
        skills: [
            'Flutter',
            'React Native',
            'Firebase',
            'Javascript'
        ],
        eligibility: 'B.Tech / MCA 2nd, 3rd, or 4th Year',
        price: 'Paid (Stipend: ₹18,000/month)',
        mode: 'Offline',
        matchScore: 86,
        matchReasons: [
            'Matches your App Development interest',
            'Aligns with your React & Javascript experience'
        ],
        source: 'HOST',
        sourceName: 'SwiftTech Labs',
        registrationUrl: '/register-event/opp-13',
        status: 'Published'
    },
    {
        id: 'opp-14',
        title: 'Digital Marketing & Growth Workshop',
        description: 'Learn SEO, SEM, content strategy, and viral loops. Perfect for founders, student ambassadors, and tech product marketers.',
        category: 'Workshops',
        host: 'GrowFast Agency',
        date: 'September 15, 2026',
        deadline: '2026-09-14T23:59:59',
        location: 'Raj Nagar District Centre, Ghaziabad',
        city: 'Ghaziabad',
        latitude: 28.6792,
        longitude: 77.4478,
        skills: [
            'SEO',
            'Marketing Strategy',
            'Analytics'
        ],
        eligibility: 'Open to all students',
        price: '₹299',
        mode: 'Offline',
        matchScore: 68,
        matchReasons: [
            'Matches your interest in Business / Marketing',
            'Convenient venue location in Ghaziabad'
        ],
        source: 'HOST',
        sourceName: 'GrowFast Agency',
        registrationUrl: '/register-event/opp-14',
        status: 'Published'
    },
    {
        id: 'opp-15',
        title: 'Open Source Hack-Sprint',
        description: 'Contribute to top GitHub libraries. Git mentors will guide you in creating pull requests, writing tests, and optimizing issues.',
        category: 'Hackathons',
        host: 'Github Campus NCR',
        date: 'September 27, 2026',
        deadline: '2026-09-25T23:59:59',
        location: 'Knowledge Park II, Greater Noida',
        city: 'Greater Noida',
        latitude: 28.4682,
        longitude: 77.4988,
        skills: [
            'Git',
            'GitHub',
            'Python',
            'Javascript'
        ],
        eligibility: 'Anyone interested in Open Source',
        price: 'Free',
        mode: 'Offline',
        matchScore: 91,
        matchReasons: [
            'Matches your Python & React skills',
            'Opportunity preference matches Hackathons',
            'Great chance to secure GitHub swag'
        ],
        source: 'HOST',
        sourceName: 'GitHub Campus NCR',
        registrationUrl: '/register-event/opp-15',
        status: 'Published'
    },
    {
        id: 'opp-16',
        title: 'Introduction to Robotics Hands-on Lab',
        description: 'Build your first line-follower robot using Arduino. Hardware kits will be provided during the session. Ideal for mechanical & electronics novices.',
        category: 'Workshops',
        host: 'RoboNCR Club',
        date: 'September 30, 2026',
        deadline: '2026-09-28T23:59:59',
        location: 'Sector 30, Noida',
        city: 'Noida',
        latitude: 28.5830,
        longitude: 77.3450,
        skills: [
            'Arduino',
            'C++',
            'Robotics Sensors'
        ],
        eligibility: 'School & College Students',
        price: '₹1200',
        mode: 'Offline',
        matchScore: 74,
        matchReasons: [
            'Matches your Robotics interest',
            'Provides hardware learning kit'
        ],
        source: 'HOST',
        sourceName: 'RoboNCR Club',
        registrationUrl: '/register-event/opp-16',
        status: 'Published'
    },
    {
        id: 'opp-17',
        title: 'UI/UX Design Studio Internship',
        description: 'Learn mobile and desktop app layout designs. Work on user research, building interactive prototypes, and collaborating with developers.',
        category: 'Internships',
        host: 'PixelCraft Studio',
        date: 'Starts November 1, 2026',
        deadline: '2026-10-15T23:59:59',
        location: 'DLF Phase 3, Gurugram',
        city: 'Gurugram',
        latitude: 28.4890,
        longitude: 77.0910,
        skills: [
            'Figma',
            'UI Design',
            'Wireframing',
            'User Flows'
        ],
        eligibility: 'Design, BFA, B.Tech, or Arts students',
        price: 'Paid (Stipend: ₹20,000/month)',
        mode: 'Offline',
        matchScore: 93,
        matchReasons: [
            'Matches your UI/UX Design interest',
            'Opportunity preference matches Internships',
            'Build your design portfolio'
        ],
        source: 'HOST',
        sourceName: 'PixelCraft Studio',
        registrationUrl: '/register-event/opp-17',
        status: 'Published'
    },
    {
        id: 'opp-18',
        title: 'React Developers Meetup - NCR Edition',
        description: 'Networking and tech talks regarding React 19 features, Server Components, and optimization frameworks. Network with developers from top unicorn startups.',
        category: 'Meetups',
        host: 'React Delhi NCR Group',
        date: 'September 13, 2026',
        deadline: '2026-09-12T23:59:59',
        location: 'Nehru Place, Delhi',
        city: 'Delhi',
        latitude: 28.5494,
        longitude: 77.2519,
        skills: [
            'React',
            'Next.js',
            'Frontend Performance'
        ],
        eligibility: 'React Developers of all levels',
        price: 'Free',
        mode: 'Offline',
        matchScore: 96,
        matchReasons: [
            'Matches your Web Development interest',
            'Perfect match for your React skill',
            'Located in Delhi (highly accessible via Metro)'
        ],
        source: 'HOST',
        sourceName: 'React Delhi NCR Group',
        registrationUrl: '/register-event/opp-18',
        status: 'Published'
    },
    {
        id: 'opp-19',
        title: 'National Startup Pitch Challenge',
        description: 'Pitch your tech startup prototype to top angel investors and venture capitalists in NCR. Win up to ₹5 Lakhs in seed grants.',
        category: 'Competitions',
        host: 'NCR Entrepreneurship Hub',
        date: 'October 5, 2026',
        deadline: '2026-09-28T23:59:59',
        location: 'Sector 16, Noida',
        city: 'Noida',
        latitude: 28.5779,
        longitude: 77.3114,
        skills: [
            'Pitching',
            'Business Model',
            'Financials'
        ],
        eligibility: 'Students & Early Stage Startups',
        price: 'Free',
        mode: 'Offline',
        matchScore: 84,
        matchReasons: [
            'Matches your Entrepreneurship & Finance interest',
            'Matches your Competitions preference'
        ],
        source: 'HOST',
        sourceName: 'NCR E-Hub',
        registrationUrl: '/register-event/opp-19',
        status: 'Published'
    },
    {
        id: 'opp-20',
        title: 'Youth Environment Activism Meetup',
        description: 'A youth advocacy roundtable focused on climate action, plastic ban implementation, and air pollution advocacy in Ghaziabad.',
        category: 'Meetups',
        host: 'Ghaziabad Eco Action',
        date: 'September 7, 2026',
        deadline: '2026-09-06T23:59:59',
        location: 'Vasundhara, Ghaziabad',
        city: 'Ghaziabad',
        latitude: 28.6611,
        longitude: 77.3697,
        skills: [
            'Public Speaking',
            'Environmental Advocacy'
        ],
        eligibility: 'Students aged 16-25',
        price: 'Free',
        mode: 'Offline',
        matchScore: 71,
        matchReasons: [
            'Matches your Social Impact interest',
            'Matches your Meetups preference'
        ],
        source: 'HOST',
        sourceName: 'Ghaziabad Eco Action',
        registrationUrl: '/register-event/opp-20',
        status: 'Published'
    },
    {
        id: 'opp-21',
        title: 'Cloud Computing Bootcamp',
        description: 'Learn AWS, GCP, and Docker containers in this intense weekend bootcamp. Deploy live web apps and configure CI/CD pipelines.',
        category: 'Workshops',
        host: 'Cloud Experts Delhi',
        date: 'September 26, 2026',
        deadline: '2026-09-24T23:59:59',
        location: 'Okhla Phase 3, Delhi',
        city: 'Delhi',
        latitude: 28.5360,
        longitude: 77.2711,
        skills: [
            'AWS',
            'Docker',
            'CI/CD',
            'Git'
        ],
        eligibility: 'CSE/IT students with basic programming knowledge',
        price: '₹999',
        mode: 'Offline',
        matchScore: 87,
        matchReasons: [
            'Matches your Web Development interest',
            'Excellent for building resume credentials'
        ],
        source: 'EXTERNAL',
        sourceName: 'Unstop',
        sourceUrl: 'https://unstop.com/cloud-bootcamp-2026',
        registrationUrl: 'https://unstop.com/cloud-bootcamp-2026',
        status: 'Published'
    },
    {
        id: 'opp-22',
        title: 'Data Science Intern',
        description: 'Apply statistical analysis, data cleaning, and machine learning algorithms on real user data to drive product decisions.',
        category: 'Internships',
        host: 'Localytics Solutions',
        date: 'Starts October 10, 2026',
        deadline: '2026-09-20T23:59:59',
        location: 'Sector 29, Gurugram',
        city: 'Gurugram',
        latitude: 28.4680,
        longitude: 77.0638,
        skills: [
            'Python',
            'SQL',
            'Pandas',
            'Data Analysis'
        ],
        eligibility: 'B.Tech / BSc Math / Statistics students',
        price: 'Paid (Stipend: ₹22,000/month)',
        mode: 'Offline',
        matchScore: 91,
        matchReasons: [
            'Matches your Data Science & Python skills',
            'Matches your Internships preference',
            'Python knowledge matches requirements'
        ],
        source: 'HOST',
        sourceName: 'Localytics',
        registrationUrl: '/register-event/opp-22',
        status: 'Published'
    },
    {
        id: 'opp-23',
        title: 'Delhi College Fest Hackathon',
        description: 'An intercollege hackathon held at DTU campus. Solve real-world university admin, grading, and transportation hurdles using code.',
        category: 'College Events',
        host: 'Delhi Technological University',
        date: 'September 14, 2026',
        deadline: '2026-09-12T23:59:59',
        location: 'Rohini, Delhi',
        city: 'Delhi',
        latitude: 28.7501,
        longitude: 77.1177,
        skills: [
            'Full Stack',
            'Database',
            'React'
        ],
        eligibility: 'Current university students (NCR only)',
        price: 'Free',
        mode: 'Offline',
        matchScore: 89,
        matchReasons: [
            'Matches your Web Development interest',
            'College campus location is a direct match'
        ],
        source: 'HOST',
        sourceName: 'DTU CSI Student Branch',
        registrationUrl: '/register-event/opp-23',
        status: 'Published'
    },
    {
        id: 'opp-24',
        title: 'Women Entrepreneurship & Finance Workshop',
        description: 'An interactive seminar focusing on raising capital, seed grants, and financial management for early-stage startup ventures.',
        category: 'Workshops',
        host: 'NCR Women Founders Foundation',
        date: 'October 12, 2026',
        deadline: '2026-10-10T23:59:59',
        location: 'Golf Course Road, Gurugram',
        city: 'Gurugram',
        latitude: 28.4398,
        longitude: 77.1002,
        skills: [
            'Finance',
            'Pitch Deck',
            'Strategic Planning'
        ],
        eligibility: 'Women students, founders, and professionals',
        price: 'Free',
        mode: 'Offline',
        matchScore: 75,
        matchReasons: [
            'Matches your Entrepreneurship / Finance interest',
            'Provides mentorship access'
        ],
        source: 'HOST',
        sourceName: 'NCR Women Founders',
        registrationUrl: '/register-event/opp-24',
        status: 'Published'
    },
    {
        id: 'opp-25',
        title: 'Smart City Hackathon Ghaziabad',
        description: 'Work with municipal agencies to prototype intelligent systems for traffic management, parking solutions, and air quality index tracking.',
        category: 'Hackathons',
        host: 'Ghaziabad Development Authority',
        date: 'September 24, 2026',
        deadline: '2026-09-22T23:59:59',
        location: 'Kavi Nagar, Ghaziabad',
        city: 'Ghaziabad',
        latitude: 28.6667,
        longitude: 77.4411,
        skills: [
            'IoT',
            'Web Apps',
            'Data Science',
            'Python'
        ],
        eligibility: 'Students & Working Professionals',
        price: 'Free',
        mode: 'Offline',
        matchScore: 83,
        matchReasons: [
            'Matches your Web Dev & Data Science interests',
            'Located within Ghaziabad municipality limits'
        ],
        source: 'HOST',
        sourceName: 'GDA Tech Cell',
        registrationUrl: '/register-event/opp-25',
        status: 'Published'
    },
    {
        id: 'opp-26',
        title: 'AI Ethics and Safety Panel',
        description: 'Learn about bias in ML algorithms, guardrails for large language models, and policy challenges ahead for developers.',
        category: 'Conferences',
        host: 'NCR AI Council',
        date: 'September 29, 2026',
        deadline: '2026-09-27T23:59:59',
        location: 'India Habitat Centre, Delhi',
        city: 'Delhi',
        latitude: 28.5898,
        longitude: 77.2244,
        skills: [
            'AI Policy',
            'Ethical AI',
            'Machine Learning'
        ],
        eligibility: 'Open to public (Students & Academics)',
        price: 'Free',
        mode: 'Offline',
        matchScore: 90,
        matchReasons: [
            'Matches your Artificial Intelligence interest',
            'Held at the prestigious India Habitat Centre'
        ],
        source: 'HOST',
        sourceName: 'NCR AI Council',
        registrationUrl: '/register-event/opp-26',
        status: 'Published'
    },
    {
        id: 'opp-27',
        title: 'Community Kitchen Volunteering',
        description: 'Assist in preparing, packing, and distributing mid-day meals to poor families and daily wage laborers in Greater Noida.',
        category: 'Volunteering',
        host: 'Hope Food Foundation',
        date: 'Every Sunday',
        deadline: '2026-09-01T23:59:59',
        location: 'Omega II, Greater Noida',
        city: 'Greater Noida',
        latitude: 28.4556,
        longitude: 77.5110,
        skills: [
            'Coordination',
            'Public Service'
        ],
        eligibility: 'Anyone above 15 years',
        price: 'Free',
        mode: 'Offline',
        matchScore: 65,
        matchReasons: [
            'Matches Volunteering opportunity preference',
            'Weekend execution schedule'
        ],
        source: 'HOST',
        sourceName: 'Hope Food Greater Noida',
        registrationUrl: '/register-event/opp-27',
        status: 'Published'
    },
    {
        id: 'opp-28',
        title: 'Flutter App Development Internship',
        description: 'We are seeking an intern to help build cross-platform mobile apps. You will collaborate on API integrations and layout refinement.',
        category: 'Internships',
        host: 'NexGen Digital Solutions',
        date: 'Starts October 1, 2026',
        deadline: '2026-09-12T23:59:59',
        location: 'Sector 63, Noida',
        city: 'Noida',
        latitude: 28.6258,
        longitude: 77.3822,
        skills: [
            'Flutter',
            'Dart',
            'State Management'
        ],
        eligibility: 'B.Tech / BCA students with basic App Dev skills',
        price: 'Paid (Stipend: ₹15,000/month)',
        mode: 'Offline',
        matchScore: 82,
        matchReasons: [
            'Matches your App Development interest',
            'Closes soon (Registration deadline approaching)'
        ],
        source: 'HOST',
        sourceName: 'NexGen Digital',
        registrationUrl: '/register-event/opp-28',
        status: 'Published'
    },
    {
        id: 'opp-29',
        title: 'DevOps & CI/CD Masterclass',
        description: 'Learn standard deployment structures, Jenkins pipeline construction, GitHub Actions setup, and container scaling with Kubernetes.',
        category: 'Workshops',
        host: 'NCR DevOps Club',
        date: 'September 15, 2026',
        deadline: '2026-09-14T23:59:59',
        location: 'MG Road, Gurugram',
        city: 'Gurugram',
        latitude: 28.4794,
        longitude: 77.0802,
        skills: [
            'DevOps',
            'Docker',
            'Kubernetes',
            'CI/CD'
        ],
        eligibility: 'Pre-final and final year CSE/IT students',
        price: 'Free',
        mode: 'Offline',
        matchScore: 85,
        matchReasons: [
            'Matches your Web Development pipeline interests',
            'Close to Gurugram metro corridor'
        ],
        source: 'HOST',
        sourceName: 'NCR DevOps Club',
        registrationUrl: '/register-event/opp-29',
        status: 'Published'
    },
    {
        id: 'opp-30',
        title: 'Online Hackathon: GenAI Applications',
        description: 'Build applications utilizing large language models, image generators, or agents. Since this is fully virtual, you can work from anywhere.',
        category: 'Hackathons',
        host: 'AI Pioneers Alliance',
        date: 'September 20-22, 2026',
        deadline: '2026-09-18T23:59:59',
        location: 'Virtual / Online',
        city: 'Delhi',
        latitude: 28.6139,
        longitude: 77.2090,
        skills: [
            'Python',
            'OpenAI API',
            'React',
            'LangChain'
        ],
        eligibility: 'Anyone globally',
        price: 'Free',
        mode: 'Online',
        matchScore: 95,
        matchReasons: [
            'Matches your AI & Machine Learning interests',
            'Next.js & React skills are a direct fit',
            'Virtual mode gives absolute flexibility'
        ],
        source: 'EXTERNAL',
        sourceName: 'Devpost',
        sourceUrl: 'https://devpost.com/genai-hackathon-2026',
        registrationUrl: 'https://devpost.com/genai-hackathon-2026',
        status: 'Published'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1tswr1t._.js.map