(function(d,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue"),require("@floating-ui/dom")):typeof define=="function"&&define.amd?define(["exports","vue","@floating-ui/dom"],s):(d=typeof globalThis<"u"?globalThis:d||self,s(d.FloatingVue={},d.Vue,d.FloatingUIDOM))})(this,function(d,s,m){"use strict";function K(e,t){for(const o in t)Object.prototype.hasOwnProperty.call(t,o)&&(typeof t[o]=="object"&&e[o]?K(e[o],t[o]):e[o]=t[o])}const c={disabled:!1,distance:5,skidding:0,container:"body",boundary:void 0,instantMove:!1,disposeTimeout:5e3,popperTriggers:[],strategy:"absolute",preventOverflow:!0,flip:!0,shift:!0,overflowPadding:0,arrowPadding:0,arrowOverflow:!0,themes:{tooltip:{placement:"top",triggers:["hover","focus","touch"],hideTriggers:e=>[...e,"click"],delay:{show:200,hide:0},handleResize:!1,html:!1,loadingContent:"..."},dropdown:{placement:"bottom",triggers:["click"],delay:0,handleResize:!0,autoHide:!0},menu:{$extend:"dropdown",triggers:["hover","focus"],popperTriggers:["hover","focus"],delay:{show:0,hide:400}}}};function y(e,t){let o=c.themes[e]||{},i;do i=o[t],typeof i>"u"?o.$extend?o=c.themes[o.$extend]||{}:(o=null,i=c[t]):o=null;while(o);return i}function Te(e){const t=[e];let o=c.themes[e]||{};do o.$extend&&!o.$resetCss?(t.push(o.$extend),o=c.themes[o.$extend]||{}):o=null;while(o);return t.map(i=>`v-popper--theme-${i}`)}function J(e){const t=[e];let o=c.themes[e]||{};do o.$extend?(t.push(o.$extend),o=c.themes[o.$extend]||{}):o=null;while(o);return t}const dt="";let $=!1;if(typeof window<"u"){$=!1;try{const e=Object.defineProperty({},"passive",{get(){$=!0}});window.addEventListener("test",null,e)}catch{}}let Q=!1;typeof window<"u"&&typeof navigator<"u"&&(Q=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);const E=["auto","top","bottom","left","right"].reduce((e,t)=>e.concat([t,`${t}-start`,`${t}-end`]),[]),k={hover:"mouseenter",focus:"focus",click:"click",touch:"touchstart",pointer:"pointerdown"},M={hover:"mouseleave",focus:"blur",click:"click",touch:"touchend",pointer:"pointerup"};function Z(e,t){const o=e.indexOf(t);o!==-1&&e.splice(o,1)}function O(){return new Promise(e=>requestAnimationFrame(()=>{requestAnimationFrame(e)}))}const h=[];let w=null;const ee={};function te(e){let t=ee[e];return t||(t=ee[e]=[]),t}let H=function(){};typeof window<"u"&&(H=window.Element);function r(e){return function(t){return y(t.theme,e)}}const B="__floating-vue__popper",L=()=>s.defineComponent({name:"VPopper",provide(){return{[B]:{parentPopper:this}}},compatConfig:{RENDER_FUNCTION:!1},inject:{[B]:{default:null}},props:{theme:{type:String,required:!0},targetNodes:{type:Function,required:!0},referenceNode:{type:Function,default:null},popperNode:{type:Function,required:!0},shown:{type:Boolean,default:!1},showGroup:{type:String,default:null},ariaId:{default:null},disabled:{type:Boolean,default:r("disabled")},positioningDisabled:{type:Boolean,default:r("positioningDisabled")},placement:{type:String,default:r("placement"),validator:e=>E.includes(e)},delay:{type:[String,Number,Object],default:r("delay")},distance:{type:[Number,String],default:r("distance")},skidding:{type:[Number,String],default:r("skidding")},triggers:{type:Array,default:r("triggers")},showTriggers:{type:[Array,Function],default:r("showTriggers")},hideTriggers:{type:[Array,Function],default:r("hideTriggers")},popperTriggers:{type:Array,default:r("popperTriggers")},popperShowTriggers:{type:[Array,Function],default:r("popperShowTriggers")},popperHideTriggers:{type:[Array,Function],default:r("popperHideTriggers")},container:{type:[String,Object,H,Boolean],default:r("container")},boundary:{type:[String,H],default:r("boundary")},strategy:{type:String,validator:e=>["absolute","fixed"].includes(e),default:r("strategy")},autoHide:{type:[Boolean,Function],default:r("autoHide")},handleResize:{type:Boolean,default:r("handleResize")},instantMove:{type:Boolean,default:r("instantMove")},eagerMount:{type:Boolean,default:r("eagerMount")},popperClass:{type:[String,Array,Object],default:r("popperClass")},computeTransformOrigin:{type:Boolean,default:r("computeTransformOrigin")},autoMinSize:{type:Boolean,default:r("autoMinSize")},autoSize:{type:[Boolean,String],default:r("autoSize")},autoMaxSize:{type:Boolean,default:r("autoMaxSize")},autoBoundaryMaxSize:{type:Boolean,default:r("autoBoundaryMaxSize")},preventOverflow:{type:Boolean,default:r("preventOverflow")},overflowPadding:{type:[Number,String],default:r("overflowPadding")},arrowPadding:{type:[Number,String],default:r("arrowPadding")},arrowOverflow:{type:Boolean,default:r("arrowOverflow")},flip:{type:Boolean,default:r("flip")},shift:{type:Boolean,default:r("shift")},shiftCrossAxis:{type:Boolean,default:r("shiftCrossAxis")},noAutoFocus:{type:Boolean,default:r("noAutoFocus")},disposeTimeout:{type:Number,default:r("disposeTimeout")}},emits:["show","hide","update:shown","apply-show","apply-hide","close-group","close-directive","auto-hide","resize","dispose"],data(){return{isShown:!1,isMounted:!1,skipTransition:!1,classes:{showFrom:!1,showTo:!1,hideFrom:!1,hideTo:!0},result:{x:0,y:0,placement:"",strategy:this.strategy,arrow:{x:0,y:0,centerOffset:0},transformOrigin:null},shownChildren:new Set,lastAutoHide:!0}},computed:{popperId(){return this.ariaId!=null?this.ariaId:this.randomId},shouldMountContent(){return this.eagerMount||this.isMounted},slotData(){return{popperId:this.popperId,isShown:this.isShown,shouldMountContent:this.shouldMountContent,skipTransition:this.skipTransition,autoHide:typeof this.autoHide=="function"?this.lastAutoHide:this.autoHide,show:this.show,hide:this.hide,handleResize:this.handleResize,onResize:this.onResize,classes:{...this.classes,popperClass:this.popperClass},result:this.positioningDisabled?null:this.result,attrs:this.$attrs}},parentPopper(){var e;return(e=this[B])==null?void 0:e.parentPopper},hasPopperShowTriggerHover(){var e,t;return((e=this.popperTriggers)==null?void 0:e.includes("hover"))||((t=this.popperShowTriggers)==null?void 0:t.includes("hover"))}},watch:{shown:"$_autoShowHide",disabled(e){e?this.dispose():this.init()},async container(){this.isShown&&(this.$_ensureTeleport(),await this.$_computePosition())},...["triggers","positioningDisabled"].reduce((e,t)=>(e[t]="$_refreshListeners",e),{}),...["placement","distance","skidding","boundary","strategy","overflowPadding","arrowPadding","preventOverflow","shift","shiftCrossAxis","flip"].reduce((e,t)=>(e[t]="$_computePosition",e),{})},created(){this.$_isDisposed=!0,this.randomId=`popper_${[Math.random(),Date.now()].map(e=>e.toString(36).substring(2,10)).join("_")}`,this.autoMinSize&&console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'),this.autoMaxSize&&console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.")},mounted(){this.init(),this.$_detachPopperNode()},activated(){this.$_autoShowHide()},deactivated(){this.hide()},beforeUnmount(){this.dispose()},methods:{show({event:e=null,skipDelay:t=!1,force:o=!1}={}){var i,n;(i=this.parentPopper)!=null&&i.lockedChild&&this.parentPopper.lockedChild!==this||(this.$_pendingHide=!1,(o||!this.disabled)&&(((n=this.parentPopper)==null?void 0:n.lockedChild)===this&&(this.parentPopper.lockedChild=null),this.$_scheduleShow(e,t),this.$emit("show"),this.$_showFrameLocked=!0,requestAnimationFrame(()=>{this.$_showFrameLocked=!1})),this.$emit("update:shown",!0))},hide({event:e=null,skipDelay:t=!1}={}){var o;if(!this.$_hideInProgress){if(this.shownChildren.size>0){this.$_pendingHide=!0;return}if(this.hasPopperShowTriggerHover&&this.$_isAimingPopper()){this.parentPopper&&(this.parentPopper.lockedChild=this,clearTimeout(this.parentPopper.lockedChildTimer),this.parentPopper.lockedChildTimer=setTimeout(()=>{this.parentPopper.lockedChild===this&&(this.parentPopper.lockedChild.hide({skipDelay:t}),this.parentPopper.lockedChild=null)},1e3));return}((o=this.parentPopper)==null?void 0:o.lockedChild)===this&&(this.parentPopper.lockedChild=null),this.$_pendingHide=!1,this.$_scheduleHide(e,t),this.$emit("hide"),this.$emit("update:shown",!1)}},init(){var e;this.$_isDisposed&&(this.$_isDisposed=!1,this.isMounted=!1,this.$_events=[],this.$_preventShow=!1,this.$_referenceNode=((e=this.referenceNode)==null?void 0:e.call(this))??this.$el,this.$_targetNodes=this.targetNodes().filter(t=>t.nodeType===t.ELEMENT_NODE),this.$_popperNode=this.popperNode(),this.$_innerNode=this.$_popperNode.querySelector(".v-popper__inner"),this.$_arrowNode=this.$_popperNode.querySelector(".v-popper__arrow-container"),this.$_swapTargetAttrs("title","data-original-title"),this.$_detachPopperNode(),this.triggers.length&&this.$_addEventListeners(),this.shown&&this.show())},dispose(){this.$_isDisposed||(this.$_isDisposed=!0,this.$_removeEventListeners(),this.hide({skipDelay:!0}),this.$_detachPopperNode(),this.isMounted=!1,this.isShown=!1,this.$_updateParentShownChildren(!1),this.$_swapTargetAttrs("data-original-title","title"),this.$emit("dispose"))},async onResize(){this.isShown&&(await this.$_computePosition(),this.$emit("resize"))},async $_computePosition(){if(this.$_isDisposed||this.positioningDisabled)return;const e={strategy:this.strategy,middleware:[]};(this.distance||this.skidding)&&e.middleware.push(m.offset({mainAxis:this.distance,crossAxis:this.skidding}));const t=this.placement.startsWith("auto");if(t?e.middleware.push(m.autoPlacement({alignment:this.placement.split("-")[1]??""})):e.placement=this.placement,this.preventOverflow&&(this.shift&&e.middleware.push(m.shift({padding:this.overflowPadding,boundary:this.boundary,crossAxis:this.shiftCrossAxis})),!t&&this.flip&&e.middleware.push(m.flip({padding:this.overflowPadding,boundary:this.boundary}))),e.middleware.push(m.arrow({element:this.$_arrowNode,padding:this.arrowPadding})),this.arrowOverflow&&e.middleware.push({name:"arrowOverflow",fn:({placement:i,rects:n,middlewareData:p})=>{let a;const{centerOffset:l}=p.arrow;return i.startsWith("top")||i.startsWith("bottom")?a=Math.abs(l)>n.reference.width/2:a=Math.abs(l)>n.reference.height/2,{data:{overflow:a}}}}),this.autoMinSize||this.autoSize){const i=this.autoSize?this.autoSize:this.autoMinSize?"min":null;e.middleware.push({name:"autoSize",fn:({rects:n,placement:p,middlewareData:a})=>{var u;if((u=a.autoSize)!=null&&u.skip)return{};let l,f;return p.startsWith("top")||p.startsWith("bottom")?l=n.reference.width:f=n.reference.height,this.$_innerNode.style[i==="min"?"minWidth":i==="max"?"maxWidth":"width"]=l!=null?`${l}px`:null,this.$_innerNode.style[i==="min"?"minHeight":i==="max"?"maxHeight":"height"]=f!=null?`${f}px`:null,{data:{skip:!0},reset:{rects:!0}}}})}(this.autoMaxSize||this.autoBoundaryMaxSize)&&(this.$_innerNode.style.maxWidth=null,this.$_innerNode.style.maxHeight=null,e.middleware.push(m.size({boundary:this.boundary,padding:this.overflowPadding,apply:({availableWidth:i,availableHeight:n})=>{this.$_innerNode.style.maxWidth=i!=null?`${i}px`:null,this.$_innerNode.style.maxHeight=n!=null?`${n}px`:null}})));const o=await m.computePosition(this.$_referenceNode,this.$_popperNode,e);Object.assign(this.result,{x:o.x,y:o.y,placement:o.placement,strategy:o.strategy,arrow:{...o.middlewareData.arrow,...o.middlewareData.arrowOverflow}})},$_scheduleShow(e=null,t=!1){if(this.$_updateParentShownChildren(!0),this.$_hideInProgress=!1,clearTimeout(this.$_scheduleTimer),w&&this.instantMove&&w.instantMove&&w!==this.parentPopper){w.$_applyHide(!0),this.$_applyShow(!0);return}t?this.$_applyShow():this.$_scheduleTimer=setTimeout(this.$_applyShow.bind(this),this.$_computeDelay("show"))},$_scheduleHide(e=null,t=!1){if(this.shownChildren.size>0){this.$_pendingHide=!0;return}this.$_updateParentShownChildren(!1),this.$_hideInProgress=!0,clearTimeout(this.$_scheduleTimer),this.isShown&&(w=this),t?this.$_applyHide():this.$_scheduleTimer=setTimeout(this.$_applyHide.bind(this),this.$_computeDelay("hide"))},$_computeDelay(e){const t=this.delay;return parseInt(t&&t[e]||t||0)},async $_applyShow(e=!1){clearTimeout(this.$_disposeTimer),clearTimeout(this.$_scheduleTimer),this.skipTransition=e,!this.isShown&&(this.$_ensureTeleport(),await O(),await this.$_computePosition(),await this.$_applyShowEffect(),this.positioningDisabled||this.$_registerEventListeners([...m.getOverflowAncestors(this.$_referenceNode),...m.getOverflowAncestors(this.$_popperNode)],"scroll",()=>{this.$_computePosition()}))},async $_applyShowEffect(){if(this.$_hideInProgress)return;if(this.computeTransformOrigin){const t=this.$_referenceNode.getBoundingClientRect(),o=this.$_popperNode.querySelector(".v-popper__wrapper"),i=o.parentNode.getBoundingClientRect(),n=t.x+t.width/2-(i.left+o.offsetLeft),p=t.y+t.height/2-(i.top+o.offsetTop);this.result.transformOrigin=`${n}px ${p}px`}this.isShown=!0,this.$_applyAttrsToTarget({"aria-describedby":this.popperId,"data-popper-shown":""});const e=this.showGroup;if(e){let t;for(let o=0;o<h.length;o++)t=h[o],t.showGroup!==e&&(t.hide(),t.$emit("close-group"))}h.push(this),document.body.classList.add("v-popper--some-open");for(const t of J(this.theme))te(t).push(this),document.body.classList.add(`v-popper--some-open--${t}`);this.$emit("apply-show"),this.classes.showFrom=!0,this.classes.showTo=!1,this.classes.hideFrom=!1,this.classes.hideTo=!1,await O(),this.classes.showFrom=!1,this.classes.showTo=!0,this.noAutoFocus||this.$_popperNode.focus()},async $_applyHide(e=!1){if(this.shownChildren.size>0){this.$_pendingHide=!0,this.$_hideInProgress=!1;return}if(clearTimeout(this.$_scheduleTimer),!this.isShown)return;this.skipTransition=e,Z(h,this),h.length===0&&document.body.classList.remove("v-popper--some-open");for(const o of J(this.theme)){const i=te(o);Z(i,this),i.length===0&&document.body.classList.remove(`v-popper--some-open--${o}`)}w===this&&(w=null),this.isShown=!1,this.$_applyAttrsToTarget({"aria-describedby":void 0,"data-popper-shown":void 0}),clearTimeout(this.$_disposeTimer);const t=this.disposeTimeout;t!==null&&(this.$_disposeTimer=setTimeout(()=>{this.$_popperNode&&(this.$_detachPopperNode(),this.isMounted=!1)},t)),this.$_removeEventListeners("scroll"),this.$emit("apply-hide"),this.classes.showFrom=!1,this.classes.showTo=!1,this.classes.hideFrom=!0,this.classes.hideTo=!1,await O(),this.classes.hideFrom=!1,this.classes.hideTo=!0},$_autoShowHide(){this.shown?this.show():this.hide()},$_ensureTeleport(){if(this.$_isDisposed)return;let e=this.container;if(typeof e=="string"?e=window.document.querySelector(e):e===!1&&(e=this.$_targetNodes[0].parentNode),!e)throw new Error("No container for popover: "+this.container);e.appendChild(this.$_popperNode),this.isMounted=!0},$_addEventListeners(){const e=o=>{this.isShown&&!this.$_hideInProgress||(o.usedByTooltip=!0,!this.$_preventShow&&this.show({event:o}))};this.$_registerTriggerListeners(this.$_targetNodes,k,this.triggers,this.showTriggers,e),this.$_registerTriggerListeners([this.$_popperNode],k,this.popperTriggers,this.popperShowTriggers,e);const t=o=>{o.usedByTooltip||this.hide({event:o})};this.$_registerTriggerListeners(this.$_targetNodes,M,this.triggers,this.hideTriggers,t),this.$_registerTriggerListeners([this.$_popperNode],M,this.popperTriggers,this.popperHideTriggers,t)},$_registerEventListeners(e,t,o){this.$_events.push({targetNodes:e,eventType:t,handler:o}),e.forEach(i=>i.addEventListener(t,o,$?{passive:!0}:void 0))},$_registerTriggerListeners(e,t,o,i,n){let p=o;i!=null&&(p=typeof i=="function"?i(p):i),p.forEach(a=>{const l=t[a];l&&this.$_registerEventListeners(e,l,n)})},$_removeEventListeners(e){const t=[];this.$_events.forEach(o=>{const{targetNodes:i,eventType:n,handler:p}=o;!e||e===n?i.forEach(a=>a.removeEventListener(n,p)):t.push(o)}),this.$_events=t},$_refreshListeners(){this.$_isDisposed||(this.$_removeEventListeners(),this.$_addEventListeners())},$_handleGlobalClose(e,t=!1){this.$_showFrameLocked||(this.hide({event:e}),e.closePopover?this.$emit("close-directive"):this.$emit("auto-hide"),t&&(this.$_preventShow=!0,setTimeout(()=>{this.$_preventShow=!1},300)))},$_detachPopperNode(){this.$_popperNode.parentNode&&this.$_popperNode.parentNode.removeChild(this.$_popperNode)},$_swapTargetAttrs(e,t){for(const o of this.$_targetNodes){const i=o.getAttribute(e);i&&(o.removeAttribute(e),o.setAttribute(t,i))}},$_applyAttrsToTarget(e){for(const t of this.$_targetNodes)for(const o in e){const i=e[o];i==null?t.removeAttribute(o):t.setAttribute(o,i)}},$_updateParentShownChildren(e){let t=this.parentPopper;for(;t;)e?t.shownChildren.add(this.randomId):(t.shownChildren.delete(this.randomId),t.$_pendingHide&&t.hide()),t=t.parentPopper},$_isAimingPopper(){const e=this.$_referenceNode.getBoundingClientRect();if(v>=e.left&&v<=e.right&&T>=e.top&&T<=e.bottom){const t=this.$_popperNode.getBoundingClientRect(),o=v-g,i=T-_,p=t.left+t.width/2-g+(t.top+t.height/2)-_+t.width+t.height,a=g+o*p,l=_+i*p;return S(g,_,a,l,t.left,t.top,t.left,t.bottom)||S(g,_,a,l,t.left,t.top,t.right,t.top)||S(g,_,a,l,t.right,t.top,t.right,t.bottom)||S(g,_,a,l,t.left,t.bottom,t.right,t.bottom)}return!1}},render(){return this.$slots.default(this.slotData)}});typeof document<"u"&&typeof window<"u"&&(Q?(document.addEventListener("touchstart",oe,$?{passive:!0,capture:!0}:!0),document.addEventListener("touchend",Ce,$?{passive:!0,capture:!0}:!0)):(window.addEventListener("mousedown",oe,!0),window.addEventListener("click",Pe,!0)),window.addEventListener("resize",Ne));function oe(e){for(let t=0;t<h.length;t++){const o=h[t];try{const i=o.popperNode();o.$_mouseDownContains=i.contains(e.target)}catch{}}}function Pe(e){ie(e)}function Ce(e){ie(e,!0)}function ie(e,t=!1){const o={};for(let i=h.length-1;i>=0;i--){const n=h[i];try{const p=n.$_containsGlobalTarget=Se(n,e);n.$_pendingHide=!1,requestAnimationFrame(()=>{if(n.$_pendingHide=!1,!o[n.randomId]&&se(n,p,e)){if(n.$_handleGlobalClose(e,t),!e.closeAllPopover&&e.closePopover&&p){let l=n.parentPopper;for(;l;)o[l.randomId]=!0,l=l.parentPopper;return}let a=n.parentPopper;for(;a&&se(a,a.$_containsGlobalTarget,e);){a.$_handleGlobalClose(e,t);a=a.parentPopper}}})}catch{}}}function Se(e,t){const o=e.popperNode();return e.$_mouseDownContains||o.contains(t.target)}function se(e,t,o){return o.closeAllPopover||o.closePopover&&t||be(e,o)&&!t}function be(e,t){if(typeof e.autoHide=="function"){const o=e.autoHide(t);return e.lastAutoHide=o,o}return e.autoHide}function Ne(e){for(let t=0;t<h.length;t++)h[t].$_computePosition(e)}function ze(){for(let e=0;e<h.length;e++)h[e].hide()}let g=0,_=0,v=0,T=0;typeof window<"u"&&window.addEventListener("mousemove",e=>{g=v,_=T,v=e.clientX,T=e.clientY},$?{passive:!0}:void 0);function S(e,t,o,i,n,p,a,l){const f=((a-n)*(t-p)-(l-p)*(e-n))/((l-p)*(o-e)-(a-n)*(i-t)),u=((o-e)*(t-p)-(i-t)*(e-n))/((l-p)*(o-e)-(a-n)*(i-t));return f>=0&&f<=1&&u>=0&&u<=1}const Ae={extends:L()},b=(e,t)=>{const o=e.__vccOpts||e;for(const[i,n]of t)o[i]=n;return o};function Ee(e,t,o,i,n,p){return s.openBlock(),s.createElementBlock("div",{ref:"reference",class:s.normalizeClass(["v-popper",{"v-popper--shown":e.slotData.isShown}])},[s.renderSlot(e.$slots,"default",s.normalizeProps(s.guardReactiveProps(e.slotData)))],2)}const ke=b(Ae,[["render",Ee]]);function Me(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ");if(t>0)return parseInt(e.substring(t+5,e.indexOf(".",t)),10);var o=e.indexOf("Trident/");if(o>0){var i=e.indexOf("rv:");return parseInt(e.substring(i+3,e.indexOf(".",i)),10)}var n=e.indexOf("Edge/");return n>0?parseInt(e.substring(n+5,e.indexOf(".",n)),10):-1}let N;function D(){D.init||(D.init=!0,N=Me()!==-1)}var z={name:"ResizeObserver",props:{emitOnMount:{type:Boolean,default:!1},ignoreWidth:{type:Boolean,default:!1},ignoreHeight:{type:Boolean,default:!1}},emits:["notify"],mounted(){D(),s.nextTick(()=>{this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.emitOnMount&&this.emitSize()});const e=document.createElement("object");this._resizeObject=e,e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex",-1),e.onload=this.addResizeHandlers,e.type="text/html",N&&this.$el.appendChild(e),e.data="about:blank",N||this.$el.appendChild(e)},beforeUnmount(){this.removeResizeHandlers()},methods:{compareAndNotify(){(!this.ignoreWidth&&this._w!==this.$el.offsetWidth||!this.ignoreHeight&&this._h!==this.$el.offsetHeight)&&(this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.emitSize())},emitSize(){this.$emit("notify",{width:this._w,height:this._h})},addResizeHandlers(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.compareAndNotify),this.compareAndNotify()},removeResizeHandlers(){this._resizeObject&&this._resizeObject.onload&&(!N&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.compareAndNotify),this.$el.removeChild(this._resizeObject),this._resizeObject.onload=null,this._resizeObject=null)}}};const Oe=s.withScopeId("data-v-b329ee4c");s.pushScopeId("data-v-b329ee4c");const He={class:"resize-observer",tabindex:"-1"};s.popScopeId();const Be=Oe((e,t,o,i,n,p)=>(s.openBlock(),s.createBlock("div",He)));z.render=Be,z.__scopeId="data-v-b329ee4c",z.__file="src/components/ResizeObserver.vue";const I=(e="theme")=>({computed:{themeClass(){return Te(this[e])}}}),Le=s.defineComponent({name:"VPopperContent",components:{ResizeObserver:z},mixins:[I()],props:{popperId:String,theme:String,shown:Boolean,mounted:Boolean,skipTransition:Boolean,autoHide:Boolean,handleResize:Boolean,classes:Object,result:Object},emits:["hide","resize"],methods:{toPx(e){return e!=null&&!isNaN(e)?`${e}px`:null}}}),ht="",De=["id","aria-hidden","tabindex","data-popper-placement"],Ie={ref:"inner",class:"v-popper__inner"},Re=[s.createElementVNode("div",{class:"v-popper__arrow-outer"},null,-1),s.createElementVNode("div",{class:"v-popper__arrow-inner"},null,-1)];function Ve(e,t,o,i,n,p){const a=s.resolveComponent("ResizeObserver");return s.openBlock(),s.createElementBlock("div",{id:e.popperId,ref:"popover",class:s.normalizeClass(["v-popper__popper",[e.themeClass,e.classes.popperClass,{"v-popper__popper--shown":e.shown,"v-popper__popper--hidden":!e.shown,"v-popper__popper--show-from":e.classes.showFrom,"v-popper__popper--show-to":e.classes.showTo,"v-popper__popper--hide-from":e.classes.hideFrom,"v-popper__popper--hide-to":e.classes.hideTo,"v-popper__popper--skip-transition":e.skipTransition,"v-popper__popper--arrow-overflow":e.result&&e.result.arrow.overflow,"v-popper__popper--no-positioning":!e.result}]]),style:s.normalizeStyle(e.result?{position:e.result.strategy,transform:`translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`}:void 0),"aria-hidden":e.shown?"false":"true",tabindex:e.autoHide?0:void 0,"data-popper-placement":e.result?e.result.placement:void 0,onKeyup:t[2]||(t[2]=s.withKeys(l=>e.autoHide&&e.$emit("hide"),["esc"]))},[s.createElementVNode("div",{class:"v-popper__backdrop",onClick:t[0]||(t[0]=l=>e.autoHide&&e.$emit("hide"))}),s.createElementVNode("div",{class:"v-popper__wrapper",style:s.normalizeStyle(e.result?{transformOrigin:e.result.transformOrigin}:void 0)},[s.createElementVNode("div",Ie,[e.mounted?(s.openBlock(),s.createElementBlock(s.Fragment,{key:0},[s.createElementVNode("div",null,[s.renderSlot(e.$slots,"default")]),e.handleResize?(s.openBlock(),s.createBlock(a,{key:0,onNotify:t[1]||(t[1]=l=>e.$emit("resize",l))})):s.createCommentVNode("",!0)],64)):s.createCommentVNode("",!0)],512),s.createElementVNode("div",{ref:"arrow",class:"v-popper__arrow-container",style:s.normalizeStyle(e.result?{left:e.toPx(e.result.arrow.x),top:e.toPx(e.result.arrow.y)}:void 0)},Re,4)],4)],46,De)}const R=b(Le,[["render",Ve]]),V={methods:{show(...e){return this.$refs.popper.show(...e)},hide(...e){return this.$refs.popper.hide(...e)},dispose(...e){return this.$refs.popper.dispose(...e)},onResize(...e){return this.$refs.popper.onResize(...e)}}},Fe=s.defineComponent({name:"VPopperWrapper",components:{Popper:ke,PopperContent:R},mixins:[V,I("finalTheme")],props:{theme:{type:String,default:null}},computed:{finalTheme(){return this.theme??this.$options.vPopperTheme}},methods:{getTargetNodes(){return Array.from(this.$el.children).filter(e=>e!==this.$refs.popperContent.$el)}}});function je(e,t,o,i,n,p){const a=s.resolveComponent("PopperContent"),l=s.resolveComponent("Popper");return s.openBlock(),s.createBlock(l,{ref:"popper",theme:e.finalTheme,"target-nodes":e.getTargetNodes,"popper-node":()=>e.$refs.popperContent.$el,class:s.normalizeClass([e.themeClass])},{default:s.withCtx(({popperId:f,isShown:u,shouldMountContent:W,skipTransition:q,autoHide:G,show:U,hide:C,handleResize:Y,onResize:x,classes:X,result:lt})=>[s.renderSlot(e.$slots,"default",{shown:u,show:U,hide:C}),s.createVNode(a,{ref:"popperContent","popper-id":f,theme:e.finalTheme,shown:u,mounted:W,"skip-transition":q,"auto-hide":G,"handle-resize":Y,classes:X,result:lt,onHide:C,onResize:x},{default:s.withCtx(()=>[s.renderSlot(e.$slots,"popper",{shown:u,hide:C})]),_:2},1032,["popper-id","theme","shown","mounted","skip-transition","auto-hide","handle-resize","classes","result","onHide","onResize"])]),_:3},8,["theme","target-nodes","popper-node","class"])}const A=b(Fe,[["render",je]]),ne={...A,name:"VDropdown",vPopperTheme:"dropdown"},ft="",re={...A,name:"VMenu",vPopperTheme:"menu"},pe={...A,name:"VTooltip",vPopperTheme:"tooltip"},mt="",We=s.defineComponent({name:"VTooltipDirective",components:{Popper:L(),PopperContent:R},mixins:[V],inheritAttrs:!1,props:{theme:{type:String,default:"tooltip"},html:{type:Boolean,default:e=>y(e.theme,"html")},content:{type:[String,Number,Function],default:null},loadingContent:{type:String,default:e=>y(e.theme,"loadingContent")},targetNodes:{type:Function,required:!0}},data(){return{asyncContent:null}},computed:{isContentAsync(){return typeof this.content=="function"},loading(){return this.isContentAsync&&this.asyncContent==null},finalContent(){return this.isContentAsync?this.loading?this.loadingContent:this.asyncContent:this.content}},watch:{content:{handler(){this.fetchContent(!0)},immediate:!0},async finalContent(){await this.$nextTick(),this.$refs.popper.onResize()}},created(){this.$_fetchId=0},methods:{fetchContent(e){if(typeof this.content=="function"&&this.$_isShown&&(e||!this.$_loading&&this.asyncContent==null)){this.asyncContent=null,this.$_loading=!0;const t=++this.$_fetchId,o=this.content(this);o.then?o.then(i=>this.onResult(t,i)):this.onResult(t,o)}},onResult(e,t){e===this.$_fetchId&&(this.$_loading=!1,this.asyncContent=t)},onShow(){this.$_isShown=!0,this.fetchContent()},onHide(){this.$_isShown=!1}}}),qe=["innerHTML"],Ge=["textContent"];function Ue(e,t,o,i,n,p){const a=s.resolveComponent("PopperContent"),l=s.resolveComponent("Popper");return s.openBlock(),s.createBlock(l,s.mergeProps({ref:"popper"},e.$attrs,{theme:e.theme,"target-nodes":e.targetNodes,"popper-node":()=>e.$refs.popperContent.$el,onApplyShow:e.onShow,onApplyHide:e.onHide}),{default:s.withCtx(({popperId:f,isShown:u,shouldMountContent:W,skipTransition:q,autoHide:G,hide:U,handleResize:C,onResize:Y,classes:x,result:X})=>[s.createVNode(a,{ref:"popperContent",class:s.normalizeClass({"v-popper--tooltip-loading":e.loading}),"popper-id":f,theme:e.theme,shown:u,mounted:W,"skip-transition":q,"auto-hide":G,"handle-resize":C,classes:x,result:X,onHide:U,onResize:Y},{default:s.withCtx(()=>[e.html?(s.openBlock(),s.createElementBlock("div",{key:0,innerHTML:e.finalContent},null,8,qe)):(s.openBlock(),s.createElementBlock("div",{key:1,textContent:s.toDisplayString(e.finalContent)},null,8,Ge))]),_:2},1032,["class","popper-id","theme","shown","mounted","skip-transition","auto-hide","handle-resize","classes","result","onHide","onResize"])]),_:1},16,["theme","target-nodes","popper-node","onApplyShow","onApplyHide"])}const ae=b(We,[["render",Ue]]),le="v-popper--has-tooltip";function Ye(e,t){let o=e.placement;if(!o&&t)for(const i of E)t[i]&&(o=i);return o||(o=y(e.theme||"tooltip","placement")),o}function de(e,t,o){let i;const n=typeof t;return n==="string"?i={content:t}:t&&n==="object"?i=t:i={content:!1},i.placement=Ye(i,o),i.targetNodes=()=>[e],i.referenceNode=()=>e,i}let F,P,xe=0;function Xe(){if(F)return;P=s.ref([]),F=s.createApp({name:"VTooltipDirectiveApp",compatConfig:{RENDER_FUNCTION:!1},setup(){return{directives:P}},render(){return this.directives.map(t=>s.h(ae,{...t.options,shown:t.shown||t.options.shown,key:t.id}))},devtools:{hide:!0}});const e=document.createElement("div");document.body.appendChild(e),F.mount(e)}function he(e,t,o){Xe();const i=s.ref(de(e,t,o)),n=s.ref(!1),p={id:xe++,options:i,shown:n};return P.value.push(p),e.classList&&e.classList.add(le),e.$_popper={options:i,item:p,show(){n.value=!0},hide(){n.value=!1}}}function j(e){if(e.$_popper){const t=P.value.indexOf(e.$_popper.item);t!==-1&&P.value.splice(t,1),delete e.$_popper,delete e.$_popperOldShown,delete e.$_popperMountTarget}e.classList&&e.classList.remove(le)}function ue(e,{value:t,modifiers:o}){const i=de(e,t,o);if(!i.content||y(i.theme||"tooltip","disabled"))j(e);else{let n;e.$_popper?(n=e.$_popper,n.options.value=i):n=he(e,t,o),typeof t.shown<"u"&&t.shown!==e.$_popperOldShown&&(e.$_popperOldShown=t.shown,t.shown?n.show():n.hide())}}const ce={beforeMount:ue,updated:ue,beforeUnmount(e){j(e)}};function fe(e){e.addEventListener("click",ge),e.addEventListener("touchstart",_e,$?{passive:!0}:!1)}function me(e){e.removeEventListener("click",ge),e.removeEventListener("touchstart",_e),e.removeEventListener("touchend",$e),e.removeEventListener("touchcancel",we)}function ge(e){const t=e.currentTarget;e.closePopover=!t.$_vclosepopover_touch,e.closeAllPopover=t.$_closePopoverModifiers&&!!t.$_closePopoverModifiers.all}function _e(e){if(e.changedTouches.length===1){const t=e.currentTarget;t.$_vclosepopover_touch=!0;const o=e.changedTouches[0];t.$_vclosepopover_touchPoint=o,t.addEventListener("touchend",$e),t.addEventListener("touchcancel",we)}}function $e(e){const t=e.currentTarget;if(t.$_vclosepopover_touch=!1,e.changedTouches.length===1){const o=e.changedTouches[0],i=t.$_vclosepopover_touchPoint;e.closePopover=Math.abs(o.screenY-i.screenY)<20&&Math.abs(o.screenX-i.screenX)<20,e.closeAllPopover=t.$_closePopoverModifiers&&!!t.$_closePopoverModifiers.all}}function we(e){const t=e.currentTarget;t.$_vclosepopover_touch=!1}const ye={beforeMount(e,{value:t,modifiers:o}){e.$_closePopoverModifiers=o,(typeof t>"u"||t)&&fe(e)},updated(e,{value:t,oldValue:o,modifiers:i}){e.$_closePopoverModifiers=i,t!==o&&(typeof t>"u"||t?fe(e):me(e))},beforeUnmount(e){me(e)}},Ke=c,Je=ce,Qe=ye,Ze=ne,et=re,tt=L,ot=R,it=V,st=A,nt=I,rt=pe,pt=ae;function ve(e,t={}){e.$_vTooltipInstalled||(e.$_vTooltipInstalled=!0,K(c,t),e.directive("tooltip",ce),e.directive("close-popper",ye),e.component("VTooltip",pe),e.component("VDropdown",ne),e.component("VMenu",re))}const at={version:"2.0.0-beta.24",install:ve,options:c};d.Dropdown=Ze,d.HIDE_EVENT_MAP=M,d.Menu=et,d.Popper=tt,d.PopperContent=ot,d.PopperMethods=it,d.PopperWrapper=st,d.SHOW_EVENT_MAP=k,d.ThemeClass=nt,d.Tooltip=rt,d.TooltipDirective=pt,d.VClosePopper=Qe,d.VTooltip=Je,d.createTooltip=he,d.default=at,d.destroyTooltip=j,d.hideAllPoppers=ze,d.install=ve,d.options=Ke,d.placements=E,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
