import { defineComponent as O, openBlock as c, createElementBlock as T, normalizeClass as H, renderSlot as z, normalizeProps as Ee, guardReactiveProps as Me, pushScopeId as ke, popScopeId as Le, nextTick as Be, createBlock as E, withScopeId as De, resolveComponent as P, normalizeStyle as x, withKeys as Ie, createElementVNode as $, Fragment as Re, createCommentVNode as ee, withCtx as A, createVNode as ce, mergeProps as Fe, toDisplayString as Ve, ref as U, createApp as je, h as xe } from "vue";
import { offset as We, autoPlacement as Ge, shift as qe, flip as Ue, arrow as Ye, size as Xe, computePosition as Ke, getOverflowAncestors as te } from "@floating-ui/dom";
function fe(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? fe(e[o], t[o]) : e[o] = t[o]);
}
const u = {
  // Disable popper components
  disabled: !1,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: !1,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5e3,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: !0,
  // Flip to the opposite placement if needed
  flip: !0,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: !0,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: !0,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: !1,
      // Enable HTML content in directive
      html: !1,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: !0,
      // Hide on clock outside
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function C(e, t) {
  let o = u.themes[e] || {}, i;
  do
    i = o[t], typeof i > "u" ? o.$extend ? o = u.themes[o.$extend] || {} : (o = null, i = u[t]) : o = null;
  while (o);
  return i;
}
function Je(e) {
  const t = [e];
  let o = u.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = u.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((i) => `v-popper--theme-${i}`);
}
function oe(e) {
  const t = [e];
  let o = u.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = u.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let _ = !1;
if (typeof window < "u") {
  _ = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        _ = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let me = !1;
typeof window < "u" && typeof navigator < "u" && (me = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const ge = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), ie = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, se = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function ne(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function W() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const d = [];
let g = null;
const re = {};
function pe(e) {
  let t = re[e];
  return t || (t = re[e] = []), t;
}
let Y = function() {
};
typeof window < "u" && (Y = window.Element);
function n(e) {
  return function(t) {
    return C(t.theme, e);
  };
}
const G = "__floating-vue__popper", K = () => O({
  name: "VPopper",
  provide() {
    return {
      [G]: {
        parentPopper: this
      }
    };
  },
  compatConfig: {
    RENDER_FUNCTION: !1
  },
  inject: {
    [G]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: n("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: n("positioningDisabled")
    },
    placement: {
      type: String,
      default: n("placement"),
      validator: (e) => ge.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: n("delay")
    },
    distance: {
      type: [Number, String],
      default: n("distance")
    },
    skidding: {
      type: [Number, String],
      default: n("skidding")
    },
    triggers: {
      type: Array,
      default: n("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: n("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: n("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: n("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: n("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: n("popperHideTriggers")
    },
    container: {
      type: [String, Object, Y, Boolean],
      default: n("container")
    },
    boundary: {
      type: [String, Y],
      default: n("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: n("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: n("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: n("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: n("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: n("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: n("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: n("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: n("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: n("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: n("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: n("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: n("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: n("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: n("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: n("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: n("flip")
    },
    shift: {
      type: Boolean,
      default: n("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: n("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: n("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: n("disposeTimeout")
    }
  },
  emits: [
    "show",
    "hide",
    "update:shown",
    "apply-show",
    "apply-hide",
    "close-group",
    "close-directive",
    "auto-hide",
    "resize",
    "dispose"
  ],
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[G]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    ...[
      "triggers",
      "positioningDisabled"
    ].reduce((e, t) => (e[t] = "$_refreshListeners", e), {}),
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.$_isDisposed = !0, this.randomId = `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`, this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = !1, force: o = !1 } = {}) {
      var i, s;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.$_pendingHide = !1, (o || !this.disabled) && (((s = this.parentPopper) == null ? void 0 : s.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var o;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.$_pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var e;
      this.$_isDisposed && (this.$_isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.$_isDisposed || (this.$_isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"), this.$emit("dispose"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.$_isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(We({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(Ge({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(qe({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(Ue({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(Ye({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i, rects: s, middlewareData: r }) => {
          let p;
          const { centerOffset: a } = r.arrow;
          return i.startsWith("top") || i.startsWith("bottom") ? p = Math.abs(a) > s.reference.width / 2 : p = Math.abs(a) > s.reference.height / 2, {
            data: {
              overflow: p
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: s, placement: r, middlewareData: p }) => {
            var h;
            if ((h = p.autoSize) != null && h.skip)
              return {};
            let a, l;
            return r.startsWith("top") || r.startsWith("bottom") ? a = s.reference.width : l = s.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = a != null ? `${a}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = l != null ? `${l}px` : null, {
              data: {
                skip: !0
              },
              reset: {
                rects: !0
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(Xe({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i, availableHeight: s }) => {
          this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = s != null ? `${s}px` : null;
        }
      })));
      const o = await Ke(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: o.x,
        y: o.y,
        placement: o.placement,
        strategy: o.strategy,
        arrow: {
          ...o.middlewareData.arrow,
          ...o.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e = null, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
        g.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e = null, t = !1) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await W(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...te(this.$_referenceNode),
        ...te(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), i = o.parentNode.getBoundingClientRect(), s = t.x + t.width / 2 - (i.left + o.offsetLeft), r = t.y + t.height / 2 - (i.top + o.offsetTop);
        this.result.transformOrigin = `${s}px ${r}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let o = 0; o < d.length; o++)
          t = d[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      d.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of oe(this.theme))
        pe(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await W(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.$_pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, ne(d, this), d.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of oe(this.theme)) {
        const i = pe(o);
        ne(i, this), i.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      g === this && (g = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await W(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.$_isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (o) => {
        this.isShown && !this.$_hideInProgress || (o.usedByTooltip = !0, !this.$_preventShow && this.show({ event: o }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ie, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], ie, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, se, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], se, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((i) => i.addEventListener(t, o, _ ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, o, i, s) {
      let r = o;
      i != null && (r = typeof i == "function" ? i(r) : i), r.forEach((p) => {
        const a = t[p];
        a && this.$_registerEventListeners(e, a, s);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((o) => {
        const { targetNodes: i, eventType: s, handler: r } = o;
        !e || e === s ? i.forEach((p) => p.removeEventListener(s, r)) : t.push(o);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.$_isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const o of this.$_targetNodes) {
        const i = o.getAttribute(e);
        i && (o.removeAttribute(e), o.setAttribute(t, i));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const o in e) {
          const i = e[o];
          i == null ? t.removeAttribute(o) : t.setAttribute(o, i);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.$_pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (v >= e.left && v <= e.right && y >= e.top && y <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = v - f, i = y - m, r = t.left + t.width / 2 - f + (t.top + t.height / 2) - m + t.width + t.height, p = f + o * r, a = m + i * r;
        return S(f, m, p, a, t.left, t.top, t.left, t.bottom) || // Left edge
        S(f, m, p, a, t.left, t.top, t.right, t.top) || // Top edge
        S(f, m, p, a, t.right, t.top, t.right, t.bottom) || // Right edge
        S(f, m, p, a, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
typeof document < "u" && typeof window < "u" && (me ? (document.addEventListener("touchstart", ae, _ ? {
  passive: !0,
  capture: !0
} : !0), document.addEventListener("touchend", Ze, _ ? {
  passive: !0,
  capture: !0
} : !0)) : (window.addEventListener("mousedown", ae, !0), window.addEventListener("click", Qe, !0)), window.addEventListener("resize", ot));
function ae(e) {
  for (let t = 0; t < d.length; t++) {
    const o = d[t];
    try {
      const i = o.popperNode();
      o.$_mouseDownContains = i.contains(e.target);
    } catch {
    }
  }
}
function Qe(e) {
  $e(e);
}
function Ze(e) {
  $e(e, !0);
}
function $e(e, t = !1) {
  const o = {};
  for (let i = d.length - 1; i >= 0; i--) {
    const s = d[i];
    try {
      const r = s.$_containsGlobalTarget = et(s, e);
      s.$_pendingHide = !1, requestAnimationFrame(() => {
        if (s.$_pendingHide = !1, !o[s.randomId] && de(s, r, e)) {
          if (s.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && r) {
            let a = s.parentPopper;
            for (; a; )
              o[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let p = s.parentPopper;
          for (; p && de(p, p.$_containsGlobalTarget, e); ) {
            p.$_handleGlobalClose(e, t);
            p = p.parentPopper;
          }
        }
      });
    } catch {
    }
  }
}
function et(e, t) {
  const o = e.popperNode();
  return e.$_mouseDownContains || o.contains(t.target);
}
function de(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || tt(e, o) && !t;
}
function tt(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function ot(e) {
  for (let t = 0; t < d.length; t++)
    d[t].$_computePosition(e);
}
function Ot() {
  for (let e = 0; e < d.length; e++)
    d[e].hide();
}
let f = 0, m = 0, v = 0, y = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  f = v, m = y, v = e.clientX, y = e.clientY;
}, _ ? {
  passive: !0
} : void 0);
function S(e, t, o, i, s, r, p, a) {
  const l = ((p - s) * (t - r) - (a - r) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t)), h = ((o - e) * (t - r) - (i - t) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t));
  return l >= 0 && l <= 1 && h >= 0 && h <= 1;
}
const it = {
  extends: K()
}, M = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, s] of t)
    o[i] = s;
  return o;
};
function st(e, t, o, i, s, r) {
  return c(), T("div", {
    ref: "reference",
    class: H(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    z(e.$slots, "default", Ee(Me(e.slotData)))
  ], 2);
}
const nt = /* @__PURE__ */ M(it, [["render", st]]);
function rt() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o = e.indexOf("Trident/");
  if (o > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var s = e.indexOf("Edge/");
  return s > 0 ? parseInt(e.substring(s + 5, e.indexOf(".", s)), 10) : -1;
}
let N;
function X() {
  X.init || (X.init = !0, N = rt() !== -1);
}
var k = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    X(), Be(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", N && this.$el.appendChild(e), e.data = "about:blank", N || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!N && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const pt = /* @__PURE__ */ De("data-v-b329ee4c");
ke("data-v-b329ee4c");
const at = {
  class: "resize-observer",
  tabindex: "-1"
};
Le();
const dt = /* @__PURE__ */ pt((e, t, o, i, s, r) => (c(), E("div", at)));
k.render = dt;
k.__scopeId = "data-v-b329ee4c";
k.__file = "src/components/ResizeObserver.vue";
const J = (e = "theme") => ({
  computed: {
    themeClass() {
      return Je(this[e]);
    }
  }
}), ht = O({
  name: "VPopperContent",
  components: {
    ResizeObserver: k
  },
  mixins: [
    J()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
});
const lt = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ut = {
  ref: "inner",
  class: "v-popper__inner"
}, ct = /* @__PURE__ */ $("div", { class: "v-popper__arrow-outer" }, null, -1), ft = /* @__PURE__ */ $("div", { class: "v-popper__arrow-inner" }, null, -1), mt = [
  ct,
  ft
];
function gt(e, t, o, i, s, r) {
  const p = P("ResizeObserver");
  return c(), T("div", {
    id: e.popperId,
    ref: "popover",
    class: H(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: x(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Ie((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    $("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    $("div", {
      class: "v-popper__wrapper",
      style: x(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      $("div", ut, [
        e.mounted ? (c(), T(Re, { key: 0 }, [
          $("div", null, [
            z(e.$slots, "default")
          ]),
          e.handleResize ? (c(), E(p, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : ee("", !0)
        ], 64)) : ee("", !0)
      ], 512),
      $("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: x(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, mt, 4)
    ], 4)
  ], 46, lt);
}
const Q = /* @__PURE__ */ M(ht, [["render", gt]]), Z = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
}, $t = O({
  name: "VPopperWrapper",
  components: {
    Popper: nt,
    PopperContent: Q
  },
  mixins: [
    Z,
    J("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function _t(e, t, o, i, s, r) {
  const p = P("PopperContent"), a = P("Popper");
  return c(), E(a, {
    ref: "popper",
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: H([
      e.themeClass
    ])
  }, {
    default: A(({
      popperId: l,
      isShown: h,
      shouldMountContent: B,
      skipTransition: D,
      autoHide: I,
      show: R,
      hide: w,
      handleResize: F,
      onResize: V,
      classes: j,
      result: He
    }) => [
      z(e.$slots, "default", {
        shown: h,
        show: R,
        hide: w
      }),
      ce(p, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: h,
        mounted: B,
        "skip-transition": D,
        "auto-hide": I,
        "handle-resize": F,
        classes: j,
        result: He,
        onHide: w,
        onResize: V
      }, {
        default: A(() => [
          z(e.$slots, "popper", {
            shown: h,
            hide: w
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 8, ["theme", "target-nodes", "popper-node", "class"]);
}
const L = /* @__PURE__ */ M($t, [["render", _t]]), _e = {
  ...L,
  name: "VDropdown",
  vPopperTheme: "dropdown"
};
const we = {
  ...L,
  name: "VMenu",
  vPopperTheme: "menu"
}, ve = {
  ...L,
  name: "VTooltip",
  vPopperTheme: "tooltip"
};
const wt = O({
  name: "VTooltipDirective",
  components: {
    Popper: K(),
    PopperContent: Q
  },
  mixins: [
    Z
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => C(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => C(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, o = this.content(this);
        o.then ? o.then((i) => this.onResult(t, i)) : this.onResult(t, o);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
}), vt = ["innerHTML"], yt = ["textContent"];
function Tt(e, t, o, i, s, r) {
  const p = P("PopperContent"), a = P("Popper");
  return c(), E(a, Fe({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: A(({
      popperId: l,
      isShown: h,
      shouldMountContent: B,
      skipTransition: D,
      autoHide: I,
      hide: R,
      handleResize: w,
      onResize: F,
      classes: V,
      result: j
    }) => [
      ce(p, {
        ref: "popperContent",
        class: H({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: h,
        mounted: B,
        "skip-transition": D,
        "auto-hide": I,
        "handle-resize": w,
        classes: V,
        result: j,
        onHide: R,
        onResize: F
      }, {
        default: A(() => [
          e.html ? (c(), T("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, vt)) : (c(), T("div", {
            key: 1,
            textContent: Ve(e.finalContent)
          }, null, 8, yt))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const ye = /* @__PURE__ */ M(wt, [["render", Tt]]), Te = "v-popper--has-tooltip";
function Pt(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const i of ge)
      t[i] && (o = i);
  return o || (o = C(e.theme || "tooltip", "placement")), o;
}
function Pe(e, t, o) {
  let i;
  const s = typeof t;
  return s === "string" ? i = { content: t } : t && s === "object" ? i = t : i = { content: !1 }, i.placement = Pt(i, o), i.targetNodes = () => [e], i.referenceNode = () => e, i;
}
let q, b, Ct = 0;
function bt() {
  if (q)
    return;
  b = U([]), q = je({
    name: "VTooltipDirectiveApp",
    compatConfig: {
      RENDER_FUNCTION: !1
    },
    setup() {
      return {
        directives: b
      };
    },
    render() {
      return this.directives.map((t) => xe(ye, {
        ...t.options,
        shown: t.shown || t.options.shown,
        key: t.id
      }));
    },
    devtools: {
      hide: !0
    }
  });
  const e = document.createElement("div");
  document.body.appendChild(e), q.mount(e);
}
function St(e, t, o) {
  bt();
  const i = U(Pe(e, t, o)), s = U(!1), r = {
    id: Ct++,
    options: i,
    shown: s
  };
  return b.value.push(r), e.classList && e.classList.add(Te), e.$_popper = {
    options: i,
    item: r,
    show() {
      s.value = !0;
    },
    hide() {
      s.value = !1;
    }
  };
}
function Ce(e) {
  if (e.$_popper) {
    const t = b.value.indexOf(e.$_popper.item);
    t !== -1 && b.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(Te);
}
function he(e, { value: t, modifiers: o }) {
  const i = Pe(e, t, o);
  if (!i.content || C(i.theme || "tooltip", "disabled"))
    Ce(e);
  else {
    let s;
    e.$_popper ? (s = e.$_popper, s.options.value = i) : s = St(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? s.show() : s.hide());
  }
}
const be = {
  beforeMount: he,
  updated: he,
  beforeUnmount(e) {
    Ce(e);
  }
};
function le(e) {
  e.addEventListener("click", Se), e.addEventListener("touchstart", Ne, _ ? {
    passive: !0
  } : !1);
}
function ue(e) {
  e.removeEventListener("click", Se), e.removeEventListener("touchstart", Ne), e.removeEventListener("touchend", ze), e.removeEventListener("touchcancel", Ae);
}
function Se(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function Ne(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", ze), t.addEventListener("touchcancel", Ae);
  }
}
function ze(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], i = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - i.screenY) < 20 && Math.abs(o.screenX - i.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function Ae(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Oe = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && le(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: i }) {
    e.$_closePopoverModifiers = i, t !== o && (typeof t > "u" || t ? le(e) : ue(e));
  },
  beforeUnmount(e) {
    ue(e);
  }
}, Ht = u, Et = be, Mt = Oe, kt = _e, Lt = we, Bt = K, Dt = Q, It = Z, Rt = L, Ft = J, Vt = ve, jt = ye;
function Nt(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, fe(u, t), e.directive("tooltip", be), e.directive("close-popper", Oe), e.component("VTooltip", ve), e.component("VDropdown", _e), e.component("VMenu", we));
}
const xt = {
  // eslint-disable-next-line no-undef
  version: "2.0.0-beta.24",
  install: Nt,
  options: u
};
export {
  kt as Dropdown,
  se as HIDE_EVENT_MAP,
  Lt as Menu,
  Bt as Popper,
  Dt as PopperContent,
  It as PopperMethods,
  Rt as PopperWrapper,
  ie as SHOW_EVENT_MAP,
  Ft as ThemeClass,
  Vt as Tooltip,
  jt as TooltipDirective,
  Mt as VClosePopper,
  Et as VTooltip,
  St as createTooltip,
  xt as default,
  Ce as destroyTooltip,
  Ot as hideAllPoppers,
  Nt as install,
  Ht as options,
  ge as placements
};
