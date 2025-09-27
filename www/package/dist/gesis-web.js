/*! For license information please see gesis-web.js.LICENSE.txt */
(()=>{var e,t,n,i,o={215:(e,t,n)=>{var i,o
!function(s){if(void 0===(o="function"==typeof(i=s)?i.call(t,n,t,e):i)||(e.exports=o),e.exports=s(),!!0){var r=window.Cookies,a=window.Cookies=s()
a.noConflict=function(){return window.Cookies=r,a}}}((function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e]
for(var i in n)t[i]=n[i]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(i){function o(){}function s(t,n,s){if("undefined"!=typeof document){"number"==typeof(s=e({path:"/"},o.defaults,s)).expires&&(s.expires=new Date(1*new Date+864e5*s.expires)),s.expires=s.expires?s.expires.toUTCString():""
try{var r=JSON.stringify(n);/^[\{\[]/.test(r)&&(n=r)}catch(e){}n=i.write?i.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape)
var a=""
for(var l in s)s[l]&&(a+="; "+l,!0!==s[l]&&(a+="="+s[l].split(";")[0]))
return document.cookie=t+"="+n+a}}function r(e,n){if("undefined"!=typeof document){for(var o={},s=document.cookie?document.cookie.split("; "):[],r=0;r<s.length;r++){var a=s[r].split("="),l=a.slice(1).join("=")
n||'"'!==l.charAt(0)||(l=l.slice(1,-1))
try{var c=t(a[0])
if(l=(i.read||i)(l,c)||t(l),n)try{l=JSON.parse(l)}catch(e){}if(o[c]=l,e===c)break}catch(e){}}return e?o[e]:o}}return o.set=s,o.get=function(e){return r(e,!1)},o.getJSON=function(e){return r(e,!0)},o.remove=function(t,n){s(t,"",e(n,{expires:-1}))},o.defaults={},o.withConverter=n,o}((function(){}))}))},354:()=>{window.location.host.startsWith("www.gesis.org")||window.addEventListener("message",(e=>{if(e&&"https://www.gesis.org"===e.origin&&(document.querySelector("html").style.scrollBehavior="auto",e.data))if("scroll"===e.data.type)window.scrollTo(e.data.data)
else if("navigation"===e.data.type)console.log("slave: navigating to: ",e.data.data),window.location=e.data.data.replace("https://www.gesis.org",window.location.origin)
else if("click"===e.data.type)console.log("slave: clicking to: ",e.data.data),document.elementFromPoint(e.data.data.pageX-window.pageXOffset,e.data.data.pageY-window.pageYOffset).click()
else if("mobile"===e.data.type){console.log("slave: setting up mobile style")
var t=document.styleSheets[0]
t.insertRule("* { scrollbar-width: none; }",t.cssRules.length),t.insertRule("::-webkit-scrollbar { display: none; }",t.cssRules.length)}}),!1)},414:function(e){e.exports=function(){"use strict"
const e=new Map,t={set(t,n,i){e.has(t)||e.set(t,new Map)
const o=e.get(t)
o.has(n)||0===o.size?o.set(n,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get:(t,n)=>e.has(t)&&e.get(t).get(n)||null,remove(t,n){if(!e.has(t))return
const i=e.get(t)
i.delete(n),0===i.size&&e.delete(t)}},n=1e6,i=1e3,o="transitionend",s=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),r=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),a=e=>{do{e+=Math.floor(Math.random()*n)}while(document.getElementById(e))
return e},l=e=>{if(!e)return 0
let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e)
const o=Number.parseFloat(t),s=Number.parseFloat(n)
return o||s?(t=t.split(",")[0],n=n.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(n))*i):0},c=e=>{e.dispatchEvent(new Event(o))},d=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),u=e=>d(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(s(e)):null,p=e=>{if(!d(e)||0===e.getClientRects().length)return!1
const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])")
if(!n)return t
if(n!==e){const t=e.closest("summary")
if(t&&t.parentNode!==n)return!1
if(null===t)return!1}return t},h=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),f=e=>{if(!document.documentElement.attachShadow)return null
if("function"==typeof e.getRootNode){const t=e.getRootNode()
return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?f(e.parentNode):null},g=()=>{},m=e=>{e.offsetHeight},v=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,y=[],b=e=>{"loading"===document.readyState?(y.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of y)e()})),y.push(e)):e()},w=()=>"rtl"===document.documentElement.dir,_=e=>{b((()=>{const t=v()
if(t){const n=e.NAME,i=t.fn[n]
t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=i,e.jQueryInterface)}}))},x=(e,t=[],n=e)=>"function"==typeof e?e.call(...t):n,T=(e,t,n=!0)=>{if(!n)return void x(e)
const i=5,s=l(t)+i
let r=!1
const a=({target:n})=>{n===t&&(r=!0,t.removeEventListener(o,a),x(e))}
t.addEventListener(o,a),setTimeout((()=>{r||c(t)}),s)},k=(e,t,n,i)=>{const o=e.length
let s=e.indexOf(t)
return-1===s?!n&&i?e[o-1]:e[0]:(s+=n?1:-1,i&&(s=(s+o)%o),e[Math.max(0,Math.min(s,o-1))])},S=/[^.]*(?=\..*)\.|.*/,E=/\..*/,C=/::\d+$/,A={}
let L=1
const $={mouseenter:"mouseover",mouseleave:"mouseout"},O=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"])
function P(e,t){return t&&`${t}::${L++}`||e.uidEvent||L++}function D(e){const t=P(e)
return e.uidEvent=t,A[t]=A[t]||{},A[t]}function M(e,t){return function n(i){return W(i,{delegateTarget:e}),n.oneOff&&F.off(e,i.type,t),t.apply(e,[i])}}function N(e,t,n){return function i(o){const s=e.querySelectorAll(t)
for(let{target:r}=o;r&&r!==this;r=r.parentNode)for(const a of s)if(a===r)return W(o,{delegateTarget:r}),i.oneOff&&F.off(e,o.type,t,n),n.apply(r,[o])}}function j(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function I(e,t,n){const i="string"==typeof t,o=i?n:t||n
let s=B(e)
return O.has(s)||(s=e),[i,o,s]}function H(e,t,n,i,o){if("string"!=typeof t||!e)return
let[s,r,a]=I(t,n,i)
if(t in $){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)}
r=e(r)}const l=D(e),c=l[a]||(l[a]={}),d=j(c,r,s?n:null)
if(d)return void(d.oneOff=d.oneOff&&o)
const u=P(r,t.replace(S,"")),p=s?N(e,n,r):M(e,r)
p.delegationSelector=s?n:null,p.callable=r,p.oneOff=o,p.uidEvent=u,c[u]=p,e.addEventListener(a,p,s)}function q(e,t,n,i,o){const s=j(t[n],i,o)
s&&(e.removeEventListener(n,s,Boolean(o)),delete t[n][s.uidEvent])}function R(e,t,n,i){const o=t[n]||{}
for(const[s,r]of Object.entries(o))s.includes(i)&&q(e,t,n,r.callable,r.delegationSelector)}function B(e){return e=e.replace(E,""),$[e]||e}const F={on(e,t,n,i){H(e,t,n,i,!1)},one(e,t,n,i){H(e,t,n,i,!0)},off(e,t,n,i){if("string"!=typeof t||!e)return
const[o,s,r]=I(t,n,i),a=r!==t,l=D(e),c=l[r]||{},d=t.startsWith(".")
if(void 0===s){if(d)for(const n of Object.keys(l))R(e,l,n,t.slice(1))
for(const[n,i]of Object.entries(c)){const o=n.replace(C,"")
a&&!t.includes(o)||q(e,l,r,i.callable,i.delegationSelector)}}else{if(!Object.keys(c).length)return
q(e,l,r,s,o?n:null)}},trigger(e,t,n){if("string"!=typeof t||!e)return null
const i=v()
let o=null,s=!0,r=!0,a=!1
t!==B(t)&&i&&(o=i.Event(t,n),i(e).trigger(o),s=!o.isPropagationStopped(),r=!o.isImmediatePropagationStopped(),a=o.isDefaultPrevented())
const l=W(new Event(t,{bubbles:s,cancelable:!0}),n)
return a&&l.preventDefault(),r&&e.dispatchEvent(l),l.defaultPrevented&&o&&o.preventDefault(),l}}
function W(e,t={}){for(const[n,i]of Object.entries(t))try{e[n]=i}catch(t){Object.defineProperty(e,n,{configurable:!0,get:()=>i})}return e}function z(e){if("true"===e)return!0
if("false"===e)return!1
if(e===Number(e).toString())return Number(e)
if(""===e||"null"===e)return null
if("string"!=typeof e)return e
try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function U(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const X={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${U(t)}`,n)},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${U(t)}`)},getDataAttributes(e){if(!e)return{}
const t={},n=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")))
for(const i of n){let n=i.replace(/^bs/,"")
n=n.charAt(0).toLowerCase()+n.slice(1),t[n]=z(e.dataset[i])}return t},getDataAttribute:(e,t)=>z(e.getAttribute(`data-bs-${U(t)}`))}
class V{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const n=d(t)?X.getDataAttribute(t,"config"):{}
return{...this.constructor.Default,..."object"==typeof n?n:{},...d(t)?X.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[n,i]of Object.entries(t)){const t=e[n],o=d(t)?"element":r(t)
if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)}}}const Y="5.3.6"
class G extends V{constructor(e,n){super(),(e=u(e))&&(this._element=e,this._config=this._getConfig(n),t.set(this._element,this.constructor.DATA_KEY,this))}dispose(){t.remove(this._element,this.constructor.DATA_KEY),F.off(this._element,this.constructor.EVENT_KEY)
for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,n=!0){T(e,t,n)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return t.get(u(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return Y}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const K=e=>{let t=e.getAttribute("data-bs-target")
if(!t||"#"===t){let n=e.getAttribute("href")
if(!n||!n.includes("#")&&!n.startsWith("."))return null
n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t?t.split(",").map((e=>s(e))).join(","):null},Q={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[]
let i=e.parentNode.closest(t)
for(;i;)n.push(i),i=i.parentNode.closest(t)
return n},prev(e,t){let n=e.previousElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling
for(;n;){if(n.matches(t))return[n]
n=n.nextElementSibling}return[]},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",")
return this.find(t,e).filter((e=>!h(e)&&p(e)))},getSelectorFromElement(e){const t=K(e)
return t&&Q.findOne(t)?t:null},getElementFromSelector(e){const t=K(e)
return t?Q.findOne(t):null},getMultipleElementsFromSelector(e){const t=K(e)
return t?Q.find(t):[]}},J=(e,t="hide")=>{const n=`click.dismiss${e.EVENT_KEY}`,i=e.NAME
F.on(document,n,`[data-bs-dismiss="${i}"]`,(function(n){if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),h(this))return
const o=Q.getElementFromSelector(this)||this.closest(`.${i}`)
e.getOrCreateInstance(o)[t]()}))},Z="alert",ee=".bs.alert",te=`close${ee}`,ne=`closed${ee}`,ie="fade",oe="show"
class se extends G{static get NAME(){return Z}close(){if(F.trigger(this._element,te).defaultPrevented)return
this._element.classList.remove(oe)
const e=this._element.classList.contains(ie)
this._queueCallback((()=>this._destroyElement()),this._element,e)}_destroyElement(){this._element.remove(),F.trigger(this._element,ne),this.dispose()}static jQueryInterface(e){return this.each((function(){const t=se.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e](this)}}))}}J(se,"close"),_(se)
const re="button",ae="active",le='[data-bs-toggle="button"]',ce="click.bs.button.data-api"
class de extends G{static get NAME(){return re}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(ae))}static jQueryInterface(e){return this.each((function(){const t=de.getOrCreateInstance(this)
"toggle"===e&&t[e]()}))}}F.on(document,ce,le,(e=>{e.preventDefault()
const t=e.target.closest(le)
de.getOrCreateInstance(t).toggle()})),_(de)
const ue="swipe",pe=".bs.swipe",he=`touchstart${pe}`,fe=`touchmove${pe}`,ge=`touchend${pe}`,me=`pointerdown${pe}`,ve=`pointerup${pe}`,ye="touch",be="pen",we="pointer-event",_e=40,xe={endCallback:null,leftCallback:null,rightCallback:null},Te={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"}
class ke extends V{constructor(e,t){super(),this._element=e,e&&ke.isSupported()&&(this._config=this._getConfig(t),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents())}static get Default(){return xe}static get DefaultType(){return Te}static get NAME(){return ue}dispose(){F.off(this._element,pe)}_start(e){this._supportPointerEvents?this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX):this._deltaX=e.touches[0].clientX}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),x(this._config.endCallback)}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX}_handleSwipe(){const e=Math.abs(this._deltaX)
if(e<=_e)return
const t=e/this._deltaX
this._deltaX=0,t&&x(t>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(F.on(this._element,me,(e=>this._start(e))),F.on(this._element,ve,(e=>this._end(e))),this._element.classList.add(we)):(F.on(this._element,he,(e=>this._start(e))),F.on(this._element,fe,(e=>this._move(e))),F.on(this._element,ge,(e=>this._end(e))))}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&(e.pointerType===be||e.pointerType===ye)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const Se="carousel",Ee=".bs.carousel",Ce=".data-api",Ae="ArrowLeft",Le="ArrowRight",$e=500,Oe="next",Pe="prev",De="left",Me="right",Ne=`slide${Ee}`,je=`slid${Ee}`,Ie=`keydown${Ee}`,He=`mouseenter${Ee}`,qe=`mouseleave${Ee}`,Re=`dragstart${Ee}`,Be=`load${Ee}${Ce}`,Fe=`click${Ee}${Ce}`,We="carousel",ze="active",Ue="slide",Xe="carousel-item-end",Ve="carousel-item-start",Ye="carousel-item-next",Ge="carousel-item-prev",Ke=".active",Qe=".carousel-item",Je=Ke+Qe,Ze=".carousel-item img",et=".carousel-indicators",tt="[data-bs-slide], [data-bs-slide-to]",nt='[data-bs-ride="carousel"]',it={[Ae]:Me,[Le]:De},ot={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},st={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"}
class rt extends G{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=Q.findOne(et,this._element),this._addEventListeners(),this._config.ride===We&&this.cycle()}static get Default(){return ot}static get DefaultType(){return st}static get NAME(){return Se}next(){this._slide(Oe)}nextWhenVisible(){!document.hidden&&p(this._element)&&this.next()}prev(){this._slide(Pe)}pause(){this._isSliding&&c(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?F.one(this._element,je,(()=>this.cycle())):this.cycle())}to(e){const t=this._getItems()
if(e>t.length-1||e<0)return
if(this._isSliding)return void F.one(this._element,je,(()=>this.to(e)))
const n=this._getItemIndex(this._getActive())
if(n===e)return
const i=e>n?Oe:Pe
this._slide(i,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&F.on(this._element,Ie,(e=>this._keydown(e))),"hover"===this._config.pause&&(F.on(this._element,He,(()=>this.pause())),F.on(this._element,qe,(()=>this._maybeEnableCycle()))),this._config.touch&&ke.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const e of Q.find(Ze,this._element))F.on(e,Re,(e=>e.preventDefault()))
const e={leftCallback:()=>this._slide(this._directionToOrder(De)),rightCallback:()=>this._slide(this._directionToOrder(Me)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),$e+this._config.interval))}}
this._swipeHelper=new ke(this._element,e)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return
const t=it[e.key]
t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return
const t=Q.findOne(Ke,this._indicatorsElement)
t.classList.remove(ze),t.removeAttribute("aria-current")
const n=Q.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement)
n&&(n.classList.add(ze),n.setAttribute("aria-current","true"))}_updateInterval(){const e=this._activeElement||this._getActive()
if(!e)return
const t=Number.parseInt(e.getAttribute("data-bs-interval"),10)
this._config.interval=t||this._config.defaultInterval}_slide(e,t=null){if(this._isSliding)return
const n=this._getActive(),i=e===Oe,o=t||k(this._getItems(),n,i,this._config.wrap)
if(o===n)return
const s=this._getItemIndex(o),r=t=>F.trigger(this._element,t,{relatedTarget:o,direction:this._orderToDirection(e),from:this._getItemIndex(n),to:s})
if(r(Ne).defaultPrevented)return
if(!n||!o)return
const a=Boolean(this._interval)
this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(s),this._activeElement=o
const l=i?Ve:Xe,c=i?Ye:Ge
o.classList.add(c),m(o),n.classList.add(l),o.classList.add(l)
const d=()=>{o.classList.remove(l,c),o.classList.add(ze),n.classList.remove(ze,c,l),this._isSliding=!1,r(je)}
this._queueCallback(d,n,this._isAnimated()),a&&this.cycle()}_isAnimated(){return this._element.classList.contains(Ue)}_getActive(){return Q.findOne(Je,this._element)}_getItems(){return Q.find(Qe,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(e){return w()?e===De?Pe:Oe:e===De?Oe:Pe}_orderToDirection(e){return w()?e===Pe?De:Me:e===Pe?Me:De}static jQueryInterface(e){return this.each((function(){const t=rt.getOrCreateInstance(this,e)
if("number"!=typeof e){if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}else t.to(e)}))}}F.on(document,Fe,tt,(function(e){const t=Q.getElementFromSelector(this)
if(!t||!t.classList.contains(We))return
e.preventDefault()
const n=rt.getOrCreateInstance(t),i=this.getAttribute("data-bs-slide-to")
return i?(n.to(i),void n._maybeEnableCycle()):"next"===X.getDataAttribute(this,"slide")?(n.next(),void n._maybeEnableCycle()):(n.prev(),void n._maybeEnableCycle())})),F.on(window,Be,(()=>{const e=Q.find(nt)
for(const t of e)rt.getOrCreateInstance(t)})),_(rt)
const at="collapse",lt=".bs.collapse",ct=`show${lt}`,dt=`shown${lt}`,ut=`hide${lt}`,pt=`hidden${lt}`,ht=`click${lt}.data-api`,ft="show",gt="collapse",mt="collapsing",vt="collapsed",yt=`:scope .${gt} .${gt}`,bt="collapse-horizontal",wt="width",_t="height",xt=".collapse.show, .collapse.collapsing",Tt='[data-bs-toggle="collapse"]',kt={parent:null,toggle:!0},St={parent:"(null|element)",toggle:"boolean"}
class Et extends G{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[]
const n=Q.find(Tt)
for(const e of n){const t=Q.getSelectorFromElement(e),n=Q.find(t).filter((e=>e===this._element))
null!==t&&n.length&&this._triggerArray.push(e)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return kt}static get DefaultType(){return St}static get NAME(){return at}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return
let e=[]
if(this._config.parent&&(e=this._getFirstLevelChildren(xt).filter((e=>e!==this._element)).map((e=>Et.getOrCreateInstance(e,{toggle:!1})))),e.length&&e[0]._isTransitioning)return
if(F.trigger(this._element,ct).defaultPrevented)return
for(const t of e)t.hide()
const t=this._getDimension()
this._element.classList.remove(gt),this._element.classList.add(mt),this._element.style[t]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0
const n=()=>{this._isTransitioning=!1,this._element.classList.remove(mt),this._element.classList.add(gt,ft),this._element.style[t]="",F.trigger(this._element,dt)},i=`scroll${t[0].toUpperCase()+t.slice(1)}`
this._queueCallback(n,this._element,!0),this._element.style[t]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown())return
if(F.trigger(this._element,ut).defaultPrevented)return
const e=this._getDimension()
this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,m(this._element),this._element.classList.add(mt),this._element.classList.remove(gt,ft)
for(const e of this._triggerArray){const t=Q.getElementFromSelector(e)
t&&!this._isShown(t)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0
const t=()=>{this._isTransitioning=!1,this._element.classList.remove(mt),this._element.classList.add(gt),F.trigger(this._element,pt)}
this._element.style[e]="",this._queueCallback(t,this._element,!0)}_isShown(e=this._element){return e.classList.contains(ft)}_configAfterMerge(e){return e.toggle=Boolean(e.toggle),e.parent=u(e.parent),e}_getDimension(){return this._element.classList.contains(bt)?wt:_t}_initializeChildren(){if(!this._config.parent)return
const e=this._getFirstLevelChildren(Tt)
for(const t of e){const e=Q.getElementFromSelector(t)
e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}}_getFirstLevelChildren(e){const t=Q.find(yt,this._config.parent)
return Q.find(e,this._config.parent).filter((e=>!t.includes(e)))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const n of e)n.classList.toggle(vt,!t),n.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={}
return"string"==typeof e&&/show|hide/.test(e)&&(t.toggle=!1),this.each((function(){const n=Et.getOrCreateInstance(this,t)
if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`)
n[e]()}}))}}F.on(document,ht,Tt,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault()
for(const e of Q.getMultipleElementsFromSelector(this))Et.getOrCreateInstance(e,{toggle:!1}).toggle()})),_(Et)
var Ct="top",At="bottom",Lt="right",$t="left",Ot="auto",Pt=[Ct,At,Lt,$t],Dt="start",Mt="end",Nt="clippingParents",jt="viewport",It="popper",Ht="reference",qt=/*#__PURE__*/Pt.reduce((function(e,t){return e.concat([t+"-"+Dt,t+"-"+Mt])}),[]),Rt=/*#__PURE__*/[].concat(Pt,[Ot]).reduce((function(e,t){return e.concat([t,t+"-"+Dt,t+"-"+Mt])}),[]),Bt="beforeRead",Ft="read",Wt="afterRead",zt="beforeMain",Ut="main",Xt="afterMain",Vt="beforeWrite",Yt="write",Gt="afterWrite",Kt=[Bt,Ft,Wt,zt,Ut,Xt,Vt,Yt,Gt]
function Qt(e){return e?(e.nodeName||"").toLowerCase():null}function Jt(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function Zt(e){return e instanceof Jt(e).Element||e instanceof Element}function en(e){return e instanceof Jt(e).HTMLElement||e instanceof HTMLElement}function tn(e){return"undefined"!=typeof ShadowRoot&&(e instanceof Jt(e).ShadowRoot||e instanceof ShadowRoot)}function nn(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},i=t.attributes[e]||{},o=t.elements[e]
en(o)&&Qt(o)&&(Object.assign(o.style,n),Object.keys(i).forEach((function(e){var t=i[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))}function on(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var i=t.elements[e],o=t.attributes[e]||{},s=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
en(i)&&Qt(i)&&(Object.assign(i.style,s),Object.keys(o).forEach((function(e){i.removeAttribute(e)})))}))}}const sn={name:"applyStyles",enabled:!0,phase:"write",fn:nn,effect:on,requires:["computeStyles"]}
function rn(e){return e.split("-")[0]}var an=Math.max,ln=Math.min,cn=Math.round
function dn(){var e=navigator.userAgentData
return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function un(){return!/^((?!chrome|android).)*safari/i.test(dn())}function pn(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1)
var i=e.getBoundingClientRect(),o=1,s=1
t&&en(e)&&(o=e.offsetWidth>0&&cn(i.width)/e.offsetWidth||1,s=e.offsetHeight>0&&cn(i.height)/e.offsetHeight||1)
var r=(Zt(e)?Jt(e):window).visualViewport,a=!un()&&n,l=(i.left+(a&&r?r.offsetLeft:0))/o,c=(i.top+(a&&r?r.offsetTop:0))/s,d=i.width/o,u=i.height/s
return{width:d,height:u,top:c,right:l+d,bottom:c+u,left:l,x:l,y:c}}function hn(e){var t=pn(e),n=e.offsetWidth,i=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-i)<=1&&(i=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:i}}function fn(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&tn(n)){var i=t
do{if(i&&e.isSameNode(i))return!0
i=i.parentNode||i.host}while(i)}return!1}function gn(e){return Jt(e).getComputedStyle(e)}function mn(e){return["table","td","th"].indexOf(Qt(e))>=0}function vn(e){return((Zt(e)?e.ownerDocument:e.document)||window.document).documentElement}function yn(e){return"html"===Qt(e)?e:e.assignedSlot||e.parentNode||(tn(e)?e.host:null)||vn(e)}function bn(e){return en(e)&&"fixed"!==gn(e).position?e.offsetParent:null}function wn(e){var t=/firefox/i.test(dn())
if(/Trident/i.test(dn())&&en(e)&&"fixed"===gn(e).position)return null
var n=yn(e)
for(tn(n)&&(n=n.host);en(n)&&["html","body"].indexOf(Qt(n))<0;){var i=gn(n)
if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n
n=n.parentNode}return null}function _n(e){for(var t=Jt(e),n=bn(e);n&&mn(n)&&"static"===gn(n).position;)n=bn(n)
return n&&("html"===Qt(n)||"body"===Qt(n)&&"static"===gn(n).position)?t:n||wn(e)||t}function xn(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Tn(e,t,n){return an(e,ln(t,n))}function kn(e,t,n){var i=Tn(e,t,n)
return i>n?n:i}function Sn(){return{top:0,right:0,bottom:0,left:0}}function En(e){return Object.assign({},Sn(),e)}function Cn(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var An=function(e,t){return En("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Cn(e,Pt))}
function Ln(e){var t,n=e.state,i=e.name,o=e.options,s=n.elements.arrow,r=n.modifiersData.popperOffsets,a=rn(n.placement),l=xn(a),c=[$t,Lt].indexOf(a)>=0?"height":"width"
if(s&&r){var d=An(o.padding,n),u=hn(s),p="y"===l?Ct:$t,h="y"===l?At:Lt,f=n.rects.reference[c]+n.rects.reference[l]-r[l]-n.rects.popper[c],g=r[l]-n.rects.reference[l],m=_n(s),v=m?"y"===l?m.clientHeight||0:m.clientWidth||0:0,y=f/2-g/2,b=d[p],w=v-u[c]-d[h],_=v/2-u[c]/2+y,x=Tn(b,_,w),T=l
n.modifiersData[i]=((t={})[T]=x,t.centerOffset=x-_,t)}}function $n(e){var t=e.state,n=e.options.element,i=void 0===n?"[data-popper-arrow]":n
null!=i&&("string"!=typeof i||(i=t.elements.popper.querySelector(i)))&&fn(t.elements.popper,i)&&(t.elements.arrow=i)}const On={name:"arrow",enabled:!0,phase:"main",fn:Ln,effect:$n,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function Pn(e){return e.split("-")[1]}var Dn={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function Mn(e,t){var n=e.x,i=e.y,o=t.devicePixelRatio||1
return{x:cn(n*o)/o||0,y:cn(i*o)/o||0}}function Nn(e){var t,n=e.popper,i=e.popperRect,o=e.placement,s=e.variation,r=e.offsets,a=e.position,l=e.gpuAcceleration,c=e.adaptive,d=e.roundOffsets,u=e.isFixed,p=r.x,h=void 0===p?0:p,f=r.y,g=void 0===f?0:f,m="function"==typeof d?d({x:h,y:g}):{x:h,y:g}
h=m.x,g=m.y
var v=r.hasOwnProperty("x"),y=r.hasOwnProperty("y"),b=$t,w=Ct,_=window
if(c){var x=_n(n),T="clientHeight",k="clientWidth"
x===Jt(n)&&"static"!==gn(x=vn(n)).position&&"absolute"===a&&(T="scrollHeight",k="scrollWidth"),(o===Ct||(o===$t||o===Lt)&&s===Mt)&&(w=At,g-=(u&&x===_&&_.visualViewport?_.visualViewport.height:x[T])-i.height,g*=l?1:-1),o!==$t&&(o!==Ct&&o!==At||s!==Mt)||(b=Lt,h-=(u&&x===_&&_.visualViewport?_.visualViewport.width:x[k])-i.width,h*=l?1:-1)}var S,E=Object.assign({position:a},c&&Dn),C=!0===d?Mn({x:h,y:g},Jt(n)):{x:h,y:g}
return h=C.x,g=C.y,l?Object.assign({},E,((S={})[w]=y?"0":"",S[b]=v?"0":"",S.transform=(_.devicePixelRatio||1)<=1?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",S)):Object.assign({},E,((t={})[w]=y?g+"px":"",t[b]=v?h+"px":"",t.transform="",t))}function jn(e){var t=e.state,n=e.options,i=n.gpuAcceleration,o=void 0===i||i,s=n.adaptive,r=void 0===s||s,a=n.roundOffsets,l=void 0===a||a,c={placement:rn(t.placement),variation:Pn(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Nn(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:r,roundOffsets:l})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Nn(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const In={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:jn,data:{}}
var Hn={passive:!0}
function qn(e){var t=e.state,n=e.instance,i=e.options,o=i.scroll,s=void 0===o||o,r=i.resize,a=void 0===r||r,l=Jt(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return s&&c.forEach((function(e){e.addEventListener("scroll",n.update,Hn)})),a&&l.addEventListener("resize",n.update,Hn),function(){s&&c.forEach((function(e){e.removeEventListener("scroll",n.update,Hn)})),a&&l.removeEventListener("resize",n.update,Hn)}}const Rn={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:qn,data:{}}
var Bn={left:"right",right:"left",bottom:"top",top:"bottom"}
function Fn(e){return e.replace(/left|right|bottom|top/g,(function(e){return Bn[e]}))}var Wn={start:"end",end:"start"}
function zn(e){return e.replace(/start|end/g,(function(e){return Wn[e]}))}function Un(e){var t=Jt(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Xn(e){return pn(vn(e)).left+Un(e).scrollLeft}function Vn(e,t){var n=Jt(e),i=vn(e),o=n.visualViewport,s=i.clientWidth,r=i.clientHeight,a=0,l=0
if(o){s=o.width,r=o.height
var c=un();(c||!c&&"fixed"===t)&&(a=o.offsetLeft,l=o.offsetTop)}return{width:s,height:r,x:a+Xn(e),y:l}}function Yn(e){var t,n=vn(e),i=Un(e),o=null==(t=e.ownerDocument)?void 0:t.body,s=an(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),r=an(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-i.scrollLeft+Xn(e),l=-i.scrollTop
return"rtl"===gn(o||n).direction&&(a+=an(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:r,x:a,y:l}}function Gn(e){var t=gn(e),n=t.overflow,i=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+i)}function Kn(e){return["html","body","#document"].indexOf(Qt(e))>=0?e.ownerDocument.body:en(e)&&Gn(e)?e:Kn(yn(e))}function Qn(e,t){var n
void 0===t&&(t=[])
var i=Kn(e),o=i===(null==(n=e.ownerDocument)?void 0:n.body),s=Jt(i),r=o?[s].concat(s.visualViewport||[],Gn(i)?i:[]):i,a=t.concat(r)
return o?a:a.concat(Qn(yn(r)))}function Jn(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Zn(e,t){var n=pn(e,!1,"fixed"===t)
return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ei(e,t,n){return t===jt?Jn(Vn(e,n)):Zt(t)?Zn(t,n):Jn(Yn(vn(e)))}function ti(e){var t=Qn(yn(e)),n=["absolute","fixed"].indexOf(gn(e).position)>=0&&en(e)?_n(e):e
return Zt(n)?t.filter((function(e){return Zt(e)&&fn(e,n)&&"body"!==Qt(e)})):[]}function ni(e,t,n,i){var o="clippingParents"===t?ti(e):[].concat(t),s=[].concat(o,[n]),r=s[0],a=s.reduce((function(t,n){var o=ei(e,n,i)
return t.top=an(o.top,t.top),t.right=ln(o.right,t.right),t.bottom=ln(o.bottom,t.bottom),t.left=an(o.left,t.left),t}),ei(e,r,i))
return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ii(e){var t,n=e.reference,i=e.element,o=e.placement,s=o?rn(o):null,r=o?Pn(o):null,a=n.x+n.width/2-i.width/2,l=n.y+n.height/2-i.height/2
switch(s){case Ct:t={x:a,y:n.y-i.height}
break
case At:t={x:a,y:n.y+n.height}
break
case Lt:t={x:n.x+n.width,y:l}
break
case $t:t={x:n.x-i.width,y:l}
break
default:t={x:n.x,y:n.y}}var c=s?xn(s):null
if(null!=c){var d="y"===c?"height":"width"
switch(r){case Dt:t[c]=t[c]-(n[d]/2-i[d]/2)
break
case Mt:t[c]=t[c]+(n[d]/2-i[d]/2)}}return t}function oi(e,t){void 0===t&&(t={})
var n=t,i=n.placement,o=void 0===i?e.placement:i,s=n.strategy,r=void 0===s?e.strategy:s,a=n.boundary,l=void 0===a?Nt:a,c=n.rootBoundary,d=void 0===c?jt:c,u=n.elementContext,p=void 0===u?It:u,h=n.altBoundary,f=void 0!==h&&h,g=n.padding,m=void 0===g?0:g,v=En("number"!=typeof m?m:Cn(m,Pt)),y=p===It?Ht:It,b=e.rects.popper,w=e.elements[f?y:p],_=ni(Zt(w)?w:w.contextElement||vn(e.elements.popper),l,d,r),x=pn(e.elements.reference),T=ii({reference:x,element:b,placement:o}),k=Jn(Object.assign({},b,T)),S=p===It?k:x,E={top:_.top-S.top+v.top,bottom:S.bottom-_.bottom+v.bottom,left:_.left-S.left+v.left,right:S.right-_.right+v.right},C=e.modifiersData.offset
if(p===It&&C){var A=C[o]
Object.keys(E).forEach((function(e){var t=[Lt,At].indexOf(e)>=0?1:-1,n=[Ct,At].indexOf(e)>=0?"y":"x"
E[e]+=A[n]*t}))}return E}function si(e,t){void 0===t&&(t={})
var n=t,i=n.placement,o=n.boundary,s=n.rootBoundary,r=n.padding,a=n.flipVariations,l=n.allowedAutoPlacements,c=void 0===l?Rt:l,d=Pn(i),u=d?a?qt:qt.filter((function(e){return Pn(e)===d})):Pt,p=u.filter((function(e){return c.indexOf(e)>=0}))
0===p.length&&(p=u)
var h=p.reduce((function(t,n){return t[n]=oi(e,{placement:n,boundary:o,rootBoundary:s,padding:r})[rn(n)],t}),{})
return Object.keys(h).sort((function(e,t){return h[e]-h[t]}))}function ri(e){if(rn(e)===Ot)return[]
var t=Fn(e)
return[zn(e),t,zn(t)]}function ai(e){var t=e.state,n=e.options,i=e.name
if(!t.modifiersData[i]._skip){for(var o=n.mainAxis,s=void 0===o||o,r=n.altAxis,a=void 0===r||r,l=n.fallbackPlacements,c=n.padding,d=n.boundary,u=n.rootBoundary,p=n.altBoundary,h=n.flipVariations,f=void 0===h||h,g=n.allowedAutoPlacements,m=t.options.placement,v=rn(m),y=l||(v!==m&&f?ri(m):[Fn(m)]),b=[m].concat(y).reduce((function(e,n){return e.concat(rn(n)===Ot?si(t,{placement:n,boundary:d,rootBoundary:u,padding:c,flipVariations:f,allowedAutoPlacements:g}):n)}),[]),w=t.rects.reference,_=t.rects.popper,x=new Map,T=!0,k=b[0],S=0;S<b.length;S++){var E=b[S],C=rn(E),A=Pn(E)===Dt,L=[Ct,At].indexOf(C)>=0,$=L?"width":"height",O=oi(t,{placement:E,boundary:d,rootBoundary:u,altBoundary:p,padding:c}),P=L?A?Lt:$t:A?At:Ct
w[$]>_[$]&&(P=Fn(P))
var D=Fn(P),M=[]
if(s&&M.push(O[C]<=0),a&&M.push(O[P]<=0,O[D]<=0),M.every((function(e){return e}))){k=E,T=!1
break}x.set(E,M)}if(T)for(var N=function(e){var t=b.find((function(t){var n=x.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return k=t,"break"},j=f?3:1;j>0&&"break"!==N(j);j--);t.placement!==k&&(t.modifiersData[i]._skip=!0,t.placement=k,t.reset=!0)}}const li={name:"flip",enabled:!0,phase:"main",fn:ai,requiresIfExists:["offset"],data:{_skip:!1}}
function ci(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function di(e){return[Ct,Lt,At,$t].some((function(t){return e[t]>=0}))}function ui(e){var t=e.state,n=e.name,i=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,r=oi(t,{elementContext:"reference"}),a=oi(t,{altBoundary:!0}),l=ci(r,i),c=ci(a,o,s),d=di(l),u=di(c)
t.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":u})}const pi={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ui}
function hi(e,t,n){var i=rn(e),o=[$t,Ct].indexOf(i)>=0?-1:1,s="function"==typeof n?n(Object.assign({},t,{placement:e})):n,r=s[0],a=s[1]
return r=r||0,a=(a||0)*o,[$t,Lt].indexOf(i)>=0?{x:a,y:r}:{x:r,y:a}}function fi(e){var t=e.state,n=e.options,i=e.name,o=n.offset,s=void 0===o?[0,0]:o,r=Rt.reduce((function(e,n){return e[n]=hi(n,t.rects,s),e}),{}),a=r[t.placement],l=a.x,c=a.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=c),t.modifiersData[i]=r}const gi={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:fi}
function mi(e){var t=e.state,n=e.name
t.modifiersData[n]=ii({reference:t.rects.reference,element:t.rects.popper,placement:t.placement})}const vi={name:"popperOffsets",enabled:!0,phase:"read",fn:mi,data:{}}
function yi(e){return"x"===e?"y":"x"}function bi(e){var t=e.state,n=e.options,i=e.name,o=n.mainAxis,s=void 0===o||o,r=n.altAxis,a=void 0!==r&&r,l=n.boundary,c=n.rootBoundary,d=n.altBoundary,u=n.padding,p=n.tether,h=void 0===p||p,f=n.tetherOffset,g=void 0===f?0:f,m=oi(t,{boundary:l,rootBoundary:c,padding:u,altBoundary:d}),v=rn(t.placement),y=Pn(t.placement),b=!y,w=xn(v),_=yi(w),x=t.modifiersData.popperOffsets,T=t.rects.reference,k=t.rects.popper,S="function"==typeof g?g(Object.assign({},t.rects,{placement:t.placement})):g,E="number"==typeof S?{mainAxis:S,altAxis:S}:Object.assign({mainAxis:0,altAxis:0},S),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,A={x:0,y:0}
if(x){if(s){var L,$="y"===w?Ct:$t,O="y"===w?At:Lt,P="y"===w?"height":"width",D=x[w],M=D+m[$],N=D-m[O],j=h?-k[P]/2:0,I=y===Dt?T[P]:k[P],H=y===Dt?-k[P]:-T[P],q=t.elements.arrow,R=h&&q?hn(q):{width:0,height:0},B=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Sn(),F=B[$],W=B[O],z=Tn(0,T[P],R[P]),U=b?T[P]/2-j-z-F-E.mainAxis:I-z-F-E.mainAxis,X=b?-T[P]/2+j+z+W+E.mainAxis:H+z+W+E.mainAxis,V=t.elements.arrow&&_n(t.elements.arrow),Y=V?"y"===w?V.clientTop||0:V.clientLeft||0:0,G=null!=(L=null==C?void 0:C[w])?L:0,K=D+X-G,Q=Tn(h?ln(M,D+U-G-Y):M,D,h?an(N,K):N)
x[w]=Q,A[w]=Q-D}if(a){var J,Z="x"===w?Ct:$t,ee="x"===w?At:Lt,te=x[_],ne="y"===_?"height":"width",ie=te+m[Z],oe=te-m[ee],se=-1!==[Ct,$t].indexOf(v),re=null!=(J=null==C?void 0:C[_])?J:0,ae=se?ie:te-T[ne]-k[ne]-re+E.altAxis,le=se?te+T[ne]+k[ne]-re-E.altAxis:oe,ce=h&&se?kn(ae,te,le):Tn(h?ae:ie,te,h?le:oe)
x[_]=ce,A[_]=ce-te}t.modifiersData[i]=A}}const wi={name:"preventOverflow",enabled:!0,phase:"main",fn:bi,requiresIfExists:["offset"]}
function _i(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function xi(e){return e!==Jt(e)&&en(e)?_i(e):Un(e)}function Ti(e){var t=e.getBoundingClientRect(),n=cn(t.width)/e.offsetWidth||1,i=cn(t.height)/e.offsetHeight||1
return 1!==n||1!==i}function ki(e,t,n){void 0===n&&(n=!1)
var i=en(t),o=en(t)&&Ti(t),s=vn(t),r=pn(e,o,n),a={scrollLeft:0,scrollTop:0},l={x:0,y:0}
return(i||!i&&!n)&&(("body"!==Qt(t)||Gn(s))&&(a=xi(t)),en(t)?((l=pn(t,!0)).x+=t.clientLeft,l.y+=t.clientTop):s&&(l.x=Xn(s))),{x:r.left+a.scrollLeft-l.x,y:r.top+a.scrollTop-l.y,width:r.width,height:r.height}}function Si(e){var t=new Map,n=new Set,i=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var i=t.get(e)
i&&o(i)}})),i.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),i}function Ei(e){var t=Si(e)
return Kt.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}function Ci(e){var t
return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}function Ai(e){var t=e.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{})
return Object.keys(t).map((function(e){return t[e]}))}var Li={placement:"bottom",modifiers:[],strategy:"absolute"}
function $i(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Oi(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,i=void 0===n?[]:n,o=t.defaultOptions,s=void 0===o?Li:o
return function(e,t,n){void 0===n&&(n=s)
var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},Li,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},r=[],a=!1,l={state:o,setOptions:function(n){var r="function"==typeof n?n(o.options):n
d(),o.options=Object.assign({},s,o.options,r),o.scrollParents={reference:Zt(e)?Qn(e):e.contextElement?Qn(e.contextElement):[],popper:Qn(t)}
var a=Ei(Ai([].concat(i,o.options.modifiers)))
return o.orderedModifiers=a.filter((function(e){return e.enabled})),c(),l.update()},forceUpdate:function(){if(!a){var e=o.elements,t=e.reference,n=e.popper
if($i(t,n)){o.rects={reference:ki(t,_n(n),"fixed"===o.options.strategy),popper:hn(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}))
for(var i=0;i<o.orderedModifiers.length;i++)if(!0!==o.reset){var s=o.orderedModifiers[i],r=s.fn,c=s.options,d=void 0===c?{}:c,u=s.name
"function"==typeof r&&(o=r({state:o,options:d,name:u,instance:l})||o)}else o.reset=!1,i=-1}}},update:Ci((function(){return new Promise((function(e){l.forceUpdate(),e(o)}))})),destroy:function(){d(),a=!0}}
if(!$i(e,t))return l
function c(){o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,i=void 0===n?{}:n,s=e.effect
if("function"==typeof s){var a=s({state:o,name:t,instance:l,options:i}),c=function(){}
r.push(a||c)}}))}function d(){r.forEach((function(e){return e()})),r=[]}return l.setOptions(n).then((function(e){!a&&n.onFirstUpdate&&n.onFirstUpdate(e)})),l}}var Pi=/*#__PURE__*/Oi(),Di=/*#__PURE__*/Oi({defaultModifiers:[Rn,vi,In,sn]}),Mi=/*#__PURE__*/Oi({defaultModifiers:[Rn,vi,In,sn,gi,li,wi,On,pi]})
const Ni=/*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({__proto__:null,afterMain:Xt,afterRead:Wt,afterWrite:Gt,applyStyles:sn,arrow:On,auto:Ot,basePlacements:Pt,beforeMain:zt,beforeRead:Bt,beforeWrite:Vt,bottom:At,clippingParents:Nt,computeStyles:In,createPopper:Mi,createPopperBase:Pi,createPopperLite:Di,detectOverflow:oi,end:Mt,eventListeners:Rn,flip:li,hide:pi,left:$t,main:Ut,modifierPhases:Kt,offset:gi,placements:Rt,popper:It,popperGenerator:Oi,popperOffsets:vi,preventOverflow:wi,read:Ft,reference:Ht,right:Lt,start:Dt,top:Ct,variationPlacements:qt,viewport:jt,write:Yt},Symbol.toStringTag,{value:"Module"})),ji="dropdown",Ii=".bs.dropdown",Hi=".data-api",qi="Escape",Ri="Tab",Bi="ArrowUp",Fi="ArrowDown",Wi=2,zi=`hide${Ii}`,Ui=`hidden${Ii}`,Xi=`show${Ii}`,Vi=`shown${Ii}`,Yi=`click${Ii}${Hi}`,Gi=`keydown${Ii}${Hi}`,Ki=`keyup${Ii}${Hi}`,Qi="show",Ji="dropup",Zi="dropend",eo="dropstart",to="dropup-center",no="dropdown-center",io='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',oo=`${io}.${Qi}`,so=".dropdown-menu",ro=".navbar",ao=".navbar-nav",lo=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",co=w()?"top-end":"top-start",uo=w()?"top-start":"top-end",po=w()?"bottom-end":"bottom-start",ho=w()?"bottom-start":"bottom-end",fo=w()?"left-start":"right-start",go=w()?"right-start":"left-start",mo="top",vo="bottom",yo={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},bo={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"}
class wo extends G{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=Q.next(this._element,so)[0]||Q.prev(this._element,so)[0]||Q.findOne(so,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return yo}static get DefaultType(){return bo}static get NAME(){return ji}toggle(){return this._isShown()?this.hide():this.show()}show(){if(h(this._element)||this._isShown())return
const e={relatedTarget:this._element}
if(!F.trigger(this._element,Xi,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(ao))for(const e of[].concat(...document.body.children))F.on(e,"mouseover",g)
this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Qi),this._element.classList.add(Qi),F.trigger(this._element,Vi,e)}}hide(){if(h(this._element)||!this._isShown())return
const e={relatedTarget:this._element}
this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!F.trigger(this._element,zi,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))F.off(e,"mouseover",g)
this._popper&&this._popper.destroy(),this._menu.classList.remove(Qi),this._element.classList.remove(Qi),this._element.setAttribute("aria-expanded","false"),X.removeDataAttribute(this._menu,"popper"),F.trigger(this._element,Ui,e),this._element.focus()}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!d(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${ji.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`)
return e}_createPopper(){if(void 0===Ni)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)")
let e=this._element
"parent"===this._config.reference?e=this._parent:d(this._config.reference)?e=u(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference)
const t=this._getPopperConfig()
this._popper=Mi(e,this._menu,t)}_isShown(){return this._menu.classList.contains(Qi)}_getPlacement(){const e=this._parent
if(e.classList.contains(Zi))return fo
if(e.classList.contains(eo))return go
if(e.classList.contains(to))return mo
if(e.classList.contains(no))return vo
const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()
return e.classList.contains(Ji)?t?uo:co:t?ho:po}_detectNavbar(){return null!==this._element.closest(ro)}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]}
return(this._inNavbar||"static"===this._config.display)&&(X.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...x(this._config.popperConfig,[void 0,e])}}_selectMenuItem({key:e,target:t}){const n=Q.find(lo,this._menu).filter((e=>p(e)))
n.length&&k(n,t,e===Fi,!n.includes(t)).focus()}static jQueryInterface(e){return this.each((function(){const t=wo.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}static clearMenus(e){if(e.button===Wi||"keyup"===e.type&&e.key!==Ri)return
const t=Q.find(oo)
for(const n of t){const t=wo.getInstance(n)
if(!t||!1===t._config.autoClose)continue
const i=e.composedPath(),o=i.includes(t._menu)
if(i.includes(t._element)||"inside"===t._config.autoClose&&!o||"outside"===t._config.autoClose&&o)continue
if(t._menu.contains(e.target)&&("keyup"===e.type&&e.key===Ri||/input|select|option|textarea|form/i.test(e.target.tagName)))continue
const s={relatedTarget:t._element}
"click"===e.type&&(s.clickEvent=e),t._completeHide(s)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n=e.key===qi,i=[Bi,Fi].includes(e.key)
if(!i&&!n)return
if(t&&!n)return
e.preventDefault()
const o=this.matches(io)?this:Q.prev(this,io)[0]||Q.next(this,io)[0]||Q.findOne(io,e.delegateTarget.parentNode),s=wo.getOrCreateInstance(o)
if(i)return e.stopPropagation(),s.show(),void s._selectMenuItem(e)
s._isShown()&&(e.stopPropagation(),s.hide(),o.focus())}}F.on(document,Gi,io,wo.dataApiKeydownHandler),F.on(document,Gi,so,wo.dataApiKeydownHandler),F.on(document,Yi,wo.clearMenus),F.on(document,Ki,wo.clearMenus),F.on(document,Yi,io,(function(e){e.preventDefault(),wo.getOrCreateInstance(this).toggle()})),_(wo)
const _o="backdrop",xo="fade",To="show",ko=`mousedown.bs.${_o}`,So={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Eo={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"}
class Co extends V{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return So}static get DefaultType(){return Eo}static get NAME(){return _o}show(e){if(!this._config.isVisible)return void x(e)
this._append()
const t=this._getElement()
this._config.isAnimated&&m(t),t.classList.add(To),this._emulateAnimation((()=>{x(e)}))}hide(e){this._config.isVisible?(this._getElement().classList.remove(To),this._emulateAnimation((()=>{this.dispose(),x(e)}))):x(e)}dispose(){this._isAppended&&(F.off(this._element,ko),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const e=document.createElement("div")
e.className=this._config.className,this._config.isAnimated&&e.classList.add(xo),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=u(e.rootElement),e}_append(){if(this._isAppended)return
const e=this._getElement()
this._config.rootElement.append(e),F.on(e,ko,(()=>{x(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(e){T(e,this._getElement(),this._config.isAnimated)}}const Ao="focustrap",Lo=".bs.focustrap",$o=`focusin${Lo}`,Oo=`keydown.tab${Lo}`,Po="Tab",Do="forward",Mo="backward",No={autofocus:!0,trapElement:null},jo={autofocus:"boolean",trapElement:"element"}
class Io extends V{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return No}static get DefaultType(){return jo}static get NAME(){return Ao}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),F.off(document,Lo),F.on(document,$o,(e=>this._handleFocusin(e))),F.on(document,Oo,(e=>this._handleKeydown(e))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,F.off(document,Lo))}_handleFocusin(e){const{trapElement:t}=this._config
if(e.target===document||e.target===t||t.contains(e.target))return
const n=Q.focusableChildren(t)
0===n.length?t.focus():this._lastTabNavDirection===Mo?n[n.length-1].focus():n[0].focus()}_handleKeydown(e){e.key===Po&&(this._lastTabNavDirection=e.shiftKey?Mo:Do)}}const Ho=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",qo=".sticky-top",Ro="padding-right",Bo="margin-right"
class Fo{constructor(){this._element=document.body}getWidth(){const e=document.documentElement.clientWidth
return Math.abs(window.innerWidth-e)}hide(){const e=this.getWidth()
this._disableOverFlow(),this._setElementAttributes(this._element,Ro,(t=>t+e)),this._setElementAttributes(Ho,Ro,(t=>t+e)),this._setElementAttributes(qo,Bo,(t=>t-e))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Ro),this._resetElementAttributes(Ho,Ro),this._resetElementAttributes(qo,Bo)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(e,t,n){const i=this.getWidth(),o=e=>{if(e!==this._element&&window.innerWidth>e.clientWidth+i)return
this._saveInitialAttribute(e,t)
const o=window.getComputedStyle(e).getPropertyValue(t)
e.style.setProperty(t,`${n(Number.parseFloat(o))}px`)}
this._applyManipulationCallback(e,o)}_saveInitialAttribute(e,t){const n=e.style.getPropertyValue(t)
n&&X.setDataAttribute(e,t,n)}_resetElementAttributes(e,t){const n=e=>{const n=X.getDataAttribute(e,t)
null!==n?(X.removeDataAttribute(e,t),e.style.setProperty(t,n)):e.style.removeProperty(t)}
this._applyManipulationCallback(e,n)}_applyManipulationCallback(e,t){if(d(e))t(e)
else for(const n of Q.find(e,this._element))t(n)}}const Wo="modal",zo=".bs.modal",Uo="Escape",Xo=`hide${zo}`,Vo=`hidePrevented${zo}`,Yo=`hidden${zo}`,Go=`show${zo}`,Ko=`shown${zo}`,Qo=`resize${zo}`,Jo=`click.dismiss${zo}`,Zo=`mousedown.dismiss${zo}`,es=`keydown.dismiss${zo}`,ts=`click${zo}.data-api`,ns="modal-open",is="fade",os="show",ss="modal-static",rs=".modal.show",as=".modal-dialog",ls=".modal-body",cs='[data-bs-toggle="modal"]',ds={backdrop:!0,focus:!0,keyboard:!0},us={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"}
class ps extends G{constructor(e,t){super(e,t),this._dialog=Q.findOne(as,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Fo,this._addEventListeners()}static get Default(){return ds}static get DefaultType(){return us}static get NAME(){return Wo}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||F.trigger(this._element,Go,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(ns),this._adjustDialog(),this._backdrop.show((()=>this._showElement(e))))}hide(){this._isShown&&!this._isTransitioning&&(F.trigger(this._element,Xo).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(os),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())))}dispose(){F.off(window,zo),F.off(this._dialog,zo),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Co({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Io({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0
const t=Q.findOne(ls,this._dialog)
t&&(t.scrollTop=0),m(this._element),this._element.classList.add(os)
const n=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,F.trigger(this._element,Ko,{relatedTarget:e})}
this._queueCallback(n,this._dialog,this._isAnimated())}_addEventListeners(){F.on(this._element,es,(e=>{e.key===Uo&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())})),F.on(window,Qo,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),F.on(this._element,Zo,(e=>{F.one(this._element,Jo,(t=>{this._element===e.target&&this._element===t.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(ns),this._resetAdjustments(),this._scrollBar.reset(),F.trigger(this._element,Yo)}))}_isAnimated(){return this._element.classList.contains(is)}_triggerBackdropTransition(){if(F.trigger(this._element,Vo).defaultPrevented)return
const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._element.style.overflowY
"hidden"===t||this._element.classList.contains(ss)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(ss),this._queueCallback((()=>{this._element.classList.remove(ss),this._queueCallback((()=>{this._element.style.overflowY=t}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),n=t>0
if(n&&!e){const e=w()?"paddingLeft":"paddingRight"
this._element.style[e]=`${t}px`}if(!n&&e){const e=w()?"paddingRight":"paddingLeft"
this._element.style[e]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each((function(){const n=ps.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`)
n[e](t)}}))}}F.on(document,ts,cs,(function(e){const t=Q.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&e.preventDefault(),F.one(t,Go,(e=>{e.defaultPrevented||F.one(t,Yo,(()=>{p(this)&&this.focus()}))}))
const n=Q.findOne(rs)
n&&ps.getInstance(n).hide(),ps.getOrCreateInstance(t).toggle(this)})),J(ps),_(ps)
const hs="offcanvas",fs=".bs.offcanvas",gs=".data-api",ms=`load${fs}${gs}`,vs="Escape",ys="show",bs="showing",ws="hiding",_s="offcanvas-backdrop",xs=".offcanvas.show",Ts=`show${fs}`,ks=`shown${fs}`,Ss=`hide${fs}`,Es=`hidePrevented${fs}`,Cs=`hidden${fs}`,As=`resize${fs}`,Ls=`click${fs}${gs}`,$s=`keydown.dismiss${fs}`,Os='[data-bs-toggle="offcanvas"]',Ps={backdrop:!0,keyboard:!0,scroll:!1},Ds={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"}
class Ms extends G{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Ps}static get DefaultType(){return Ds}static get NAME(){return hs}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){if(this._isShown)return
if(F.trigger(this._element,Ts,{relatedTarget:e}).defaultPrevented)return
this._isShown=!0,this._backdrop.show(),this._config.scroll||(new Fo).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(bs)
const t=()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(ys),this._element.classList.remove(bs),F.trigger(this._element,ks,{relatedTarget:e})}
this._queueCallback(t,this._element,!0)}hide(){if(!this._isShown)return
if(F.trigger(this._element,Ss).defaultPrevented)return
this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(ws),this._backdrop.hide()
const e=()=>{this._element.classList.remove(ys,ws),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new Fo).reset(),F.trigger(this._element,Cs)}
this._queueCallback(e,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const e=()=>{"static"!==this._config.backdrop?this.hide():F.trigger(this._element,Es)},t=Boolean(this._config.backdrop)
return new Co({className:_s,isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?e:null})}_initializeFocusTrap(){return new Io({trapElement:this._element})}_addEventListeners(){F.on(this._element,$s,(e=>{e.key===vs&&(this._config.keyboard?this.hide():F.trigger(this._element,Es))}))}static jQueryInterface(e){return this.each((function(){const t=Ms.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e](this)}}))}}F.on(document,Ls,Os,(function(e){const t=Q.getElementFromSelector(this)
if(["A","AREA"].includes(this.tagName)&&e.preventDefault(),h(this))return
F.one(t,Cs,(()=>{p(this)&&this.focus()}))
const n=Q.findOne(xs)
n&&n!==t&&Ms.getInstance(n).hide(),Ms.getOrCreateInstance(t).toggle(this)})),F.on(window,ms,(()=>{for(const e of Q.find(xs))Ms.getOrCreateInstance(e).show()})),F.on(window,As,(()=>{for(const e of Q.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(e).position&&Ms.getOrCreateInstance(e).hide()})),J(Ms),_(Ms)
const Ns={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},js=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Is=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Hs=(e,t)=>{const n=e.nodeName.toLowerCase()
return t.includes(n)?!js.has(n)||Boolean(Is.test(e.nodeValue)):t.filter((e=>e instanceof RegExp)).some((e=>e.test(n)))}
function qs(e,t,n){if(!e.length)return e
if(n&&"function"==typeof n)return n(e)
const i=(new window.DOMParser).parseFromString(e,"text/html"),o=[].concat(...i.body.querySelectorAll("*"))
for(const e of o){const n=e.nodeName.toLowerCase()
if(!Object.keys(t).includes(n)){e.remove()
continue}const i=[].concat(...e.attributes),o=[].concat(t["*"]||[],t[n]||[])
for(const t of i)Hs(t,o)||e.removeAttribute(t.nodeName)}return i.body.innerHTML}const Rs="TemplateFactory",Bs={allowList:Ns,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Fs={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Ws={entry:"(string|element|function|null)",selector:"(string|element)"}
class zs extends V{constructor(e){super(),this._config=this._getConfig(e)}static get Default(){return Bs}static get DefaultType(){return Fs}static get NAME(){return Rs}getContent(){return Object.values(this._config.content).map((e=>this._resolvePossibleFunction(e))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){const e=document.createElement("div")
e.innerHTML=this._maybeSanitize(this._config.template)
for(const[t,n]of Object.entries(this._config.content))this._setContent(e,n,t)
const t=e.children[0],n=this._resolvePossibleFunction(this._config.extraClass)
return n&&t.classList.add(...n.split(" ")),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content)}_checkContent(e){for(const[t,n]of Object.entries(e))super._typeCheckConfig({selector:t,entry:n},Ws)}_setContent(e,t,n){const i=Q.findOne(n,e)
i&&((t=this._resolvePossibleFunction(t))?d(t)?this._putElementInTemplate(u(t),i):this._config.html?i.innerHTML=this._maybeSanitize(t):i.textContent=t:i.remove())}_maybeSanitize(e){return this._config.sanitize?qs(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return x(e,[void 0,this])}_putElementInTemplate(e,t){if(this._config.html)return t.innerHTML="",void t.append(e)
t.textContent=e.textContent}}const Us="tooltip",Xs=new Set(["sanitize","allowList","sanitizeFn"]),Vs="fade",Ys="show",Gs=".tooltip-inner",Ks=".modal",Qs="hide.bs.modal",Js="hover",Zs="focus",er="click",tr="manual",nr="hide",ir="hidden",or="show",sr="shown",rr="inserted",ar="click",lr="focusin",cr="focusout",dr="mouseenter",ur="mouseleave",pr={AUTO:"auto",TOP:"top",RIGHT:w()?"left":"right",BOTTOM:"bottom",LEFT:w()?"right":"left"},hr={allowList:Ns,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},fr={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"}
class gr extends G{constructor(e,t){if(void 0===Ni)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)")
super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return hr}static get DefaultType(){return fr}static get NAME(){return Us}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),F.off(this._element.closest(Ks),Qs,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements")
if(!this._isWithContent()||!this._isEnabled)return
const e=F.trigger(this._element,this.constructor.eventName(or)),t=(f(this._element)||this._element.ownerDocument.documentElement).contains(this._element)
if(e.defaultPrevented||!t)return
this._disposePopper()
const n=this._getTipElement()
this._element.setAttribute("aria-describedby",n.getAttribute("id"))
const{container:i}=this._config
if(this._element.ownerDocument.documentElement.contains(this.tip)||(i.append(n),F.trigger(this._element,this.constructor.eventName(rr))),this._popper=this._createPopper(n),n.classList.add(Ys),"ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))F.on(e,"mouseover",g)
const o=()=>{F.trigger(this._element,this.constructor.eventName(sr)),!1===this._isHovered&&this._leave(),this._isHovered=!1}
this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown())return
if(F.trigger(this._element,this.constructor.eventName(nr)).defaultPrevented)return
if(this._getTipElement().classList.remove(Ys),"ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))F.off(e,"mouseover",g)
this._activeTrigger[er]=!1,this._activeTrigger[Zs]=!1,this._activeTrigger[Js]=!1,this._isHovered=null
const e=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),F.trigger(this._element,this.constructor.eventName(ir)))}
this._queueCallback(e,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(e){const t=this._getTemplateFactory(e).toHtml()
if(!t)return null
t.classList.remove(Vs,Ys),t.classList.add(`bs-${this.constructor.NAME}-auto`)
const n=a(this.constructor.NAME).toString()
return t.setAttribute("id",n),this._isAnimated()&&t.classList.add(Vs),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new zs({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[Gs]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Vs)}_isShown(){return this.tip&&this.tip.classList.contains(Ys)}_createPopper(e){const t=x(this._config.placement,[this,e,this._element]),n=pr[t.toUpperCase()]
return Mi(this._element,e,this._getPopperConfig(n))}_getOffset(){const{offset:e}=this._config
return"string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_resolvePossibleFunction(e){return x(e,[this._element,this._element])}_getPopperConfig(e){const t={placement:e,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:e=>{this._getTipElement().setAttribute("data-popper-placement",e.state.placement)}}]}
return{...t,...x(this._config.popperConfig,[void 0,t])}}_setListeners(){const e=this._config.trigger.split(" ")
for(const t of e)if("click"===t)F.on(this._element,this.constructor.eventName(ar),this._config.selector,(e=>{this._initializeOnDelegatedTarget(e).toggle()}))
else if(t!==tr){const e=t===Js?this.constructor.eventName(dr):this.constructor.eventName(lr),n=t===Js?this.constructor.eventName(ur):this.constructor.eventName(cr)
F.on(this._element,e,this._config.selector,(e=>{const t=this._initializeOnDelegatedTarget(e)
t._activeTrigger["focusin"===e.type?Zs:Js]=!0,t._enter()})),F.on(this._element,n,this._config.selector,(e=>{const t=this._initializeOnDelegatedTarget(e)
t._activeTrigger["focusout"===e.type?Zs:Js]=t._element.contains(e.relatedTarget),t._leave()}))}this._hideModalHandler=()=>{this._element&&this.hide()},F.on(this._element.closest(Ks),Qs,this._hideModalHandler)}_fixTitle(){const e=this._element.getAttribute("title")
e&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",e),this._element.setAttribute("data-bs-original-title",e),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout((()=>{this._isHovered&&this.show()}),this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout((()=>{this._isHovered||this.hide()}),this._config.delay.hide))}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){const t=X.getDataAttributes(this._element)
for(const e of Object.keys(t))Xs.has(e)&&delete t[e]
return e={...t,..."object"==typeof e&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=!1===e.container?document.body:u(e.container),"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),e}_getDelegateConfig(){const e={}
for(const[t,n]of Object.entries(this._config))this.constructor.Default[t]!==n&&(e[t]=n)
return e.selector=!1,e.trigger="manual",e}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(e){return this.each((function(){const t=gr.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}_(gr)
const mr="popover",vr=".popover-header",yr=".popover-body",br={...gr.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},wr={...gr.DefaultType,content:"(null|string|element|function)"}
class _r extends gr{static get Default(){return br}static get DefaultType(){return wr}static get NAME(){return mr}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[vr]:this._getTitle(),[yr]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(e){return this.each((function(){const t=_r.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}_(_r)
const xr="scrollspy",Tr=".bs.scrollspy",kr=`activate${Tr}`,Sr=`click${Tr}`,Er=`load${Tr}.data-api`,Cr="dropdown-item",Ar="active",Lr='[data-bs-spy="scroll"]',$r="[href]",Or=".nav, .list-group",Pr=".nav-link",Dr=`${Pr}, .nav-item > ${Pr}, .list-group-item`,Mr=".dropdown",Nr=".dropdown-toggle",jr={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},Ir={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"}
class Hr extends G{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return jr}static get DefaultType(){return Ir}static get NAME(){return xr}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver()
for(const e of this._observableSections.values())this._observer.observe(e)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(e){return e.target=u(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,"string"==typeof e.threshold&&(e.threshold=e.threshold.split(",").map((e=>Number.parseFloat(e)))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(F.off(this._config.target,Sr),F.on(this._config.target,Sr,$r,(e=>{const t=this._observableSections.get(e.target.hash)
if(t){e.preventDefault()
const n=this._rootElement||window,i=t.offsetTop-this._element.offsetTop
if(n.scrollTo)return void n.scrollTo({top:i,behavior:"smooth"})
n.scrollTop=i}})))}_getNewObserver(){const e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin}
return new IntersectionObserver((e=>this._observerCallback(e)),e)}_observerCallback(e){const t=e=>this._targetLinks.get(`#${e.target.id}`),n=e=>{this._previousScrollData.visibleEntryTop=e.target.offsetTop,this._process(t(e))},i=(this._rootElement||document.documentElement).scrollTop,o=i>=this._previousScrollData.parentScrollTop
this._previousScrollData.parentScrollTop=i
for(const s of e){if(!s.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(s))
continue}const e=s.target.offsetTop>=this._previousScrollData.visibleEntryTop
if(o&&e){if(n(s),!i)return}else o||e||n(s)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map
const e=Q.find($r,this._config.target)
for(const t of e){if(!t.hash||h(t))continue
const e=Q.findOne(decodeURI(t.hash),this._element)
p(e)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,e))}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add(Ar),this._activateParents(e),F.trigger(this._element,kr,{relatedTarget:e}))}_activateParents(e){if(e.classList.contains(Cr))Q.findOne(Nr,e.closest(Mr)).classList.add(Ar)
else for(const t of Q.parents(e,Or))for(const e of Q.prev(t,Dr))e.classList.add(Ar)}_clearActiveClass(e){e.classList.remove(Ar)
const t=Q.find(`${$r}.${Ar}`,e)
for(const e of t)e.classList.remove(Ar)}static jQueryInterface(e){return this.each((function(){const t=Hr.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}F.on(window,Er,(()=>{for(const e of Q.find(Lr))Hr.getOrCreateInstance(e)})),_(Hr)
const qr="tab",Rr=".bs.tab",Br=`hide${Rr}`,Fr=`hidden${Rr}`,Wr=`show${Rr}`,zr=`shown${Rr}`,Ur=`click${Rr}`,Xr=`keydown${Rr}`,Vr=`load${Rr}`,Yr="ArrowLeft",Gr="ArrowRight",Kr="ArrowUp",Qr="ArrowDown",Jr="Home",Zr="End",ea="active",ta="fade",na="show",ia="dropdown",oa=".dropdown-toggle",sa=".dropdown-menu",ra=`:not(${oa})`,aa='.list-group, .nav, [role="tablist"]',la=".nav-item, .list-group-item",ca='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',da=`.nav-link${ra}, .list-group-item${ra}, [role="tab"]${ra}, ${ca}`,ua=`.${ea}[data-bs-toggle="tab"], .${ea}[data-bs-toggle="pill"], .${ea}[data-bs-toggle="list"]`
class pa extends G{constructor(e){super(e),this._parent=this._element.closest(aa),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),F.on(this._element,Xr,(e=>this._keydown(e))))}static get NAME(){return qr}show(){const e=this._element
if(this._elemIsActive(e))return
const t=this._getActiveElem(),n=t?F.trigger(t,Br,{relatedTarget:e}):null
F.trigger(e,Wr,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){if(!e)return
e.classList.add(ea),this._activate(Q.getElementFromSelector(e))
const n=()=>{"tab"===e.getAttribute("role")?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),F.trigger(e,zr,{relatedTarget:t})):e.classList.add(na)}
this._queueCallback(n,e,e.classList.contains(ta))}_deactivate(e,t){if(!e)return
e.classList.remove(ea),e.blur(),this._deactivate(Q.getElementFromSelector(e))
const n=()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),F.trigger(e,Fr,{relatedTarget:t})):e.classList.remove(na)}
this._queueCallback(n,e,e.classList.contains(ta))}_keydown(e){if(![Yr,Gr,Kr,Qr,Jr,Zr].includes(e.key))return
e.stopPropagation(),e.preventDefault()
const t=this._getChildren().filter((e=>!h(e)))
let n
if([Jr,Zr].includes(e.key))n=t[e.key===Jr?0:t.length-1]
else{const i=[Gr,Qr].includes(e.key)
n=k(t,e.target,i,!0)}n&&(n.focus({preventScroll:!0}),pa.getOrCreateInstance(n).show())}_getChildren(){return Q.find(da,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist")
for(const e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e)
const t=this._elemIsActive(e),n=this._getOuterElement(e)
e.setAttribute("aria-selected",t),n!==e&&this._setAttributeIfNotExists(n,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const t=Q.getElementFromSelector(e)
t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`))}_toggleDropDown(e,t){const n=this._getOuterElement(e)
if(!n.classList.contains(ia))return
const i=(e,i)=>{const o=Q.findOne(e,n)
o&&o.classList.toggle(i,t)}
i(oa,ea),i(sa,na),n.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}_elemIsActive(e){return e.classList.contains(ea)}_getInnerElement(e){return e.matches(da)?e:Q.findOne(da,e)}_getOuterElement(e){return e.closest(la)||e}static jQueryInterface(e){return this.each((function(){const t=pa.getOrCreateInstance(this)
if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`)
t[e]()}}))}}F.on(document,Ur,ca,(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),h(this)||pa.getOrCreateInstance(this).show()})),F.on(window,Vr,(()=>{for(const e of Q.find(ua))pa.getOrCreateInstance(e)})),_(pa)
const ha="toast",fa=".bs.toast",ga=`mouseover${fa}`,ma=`mouseout${fa}`,va=`focusin${fa}`,ya=`focusout${fa}`,ba=`hide${fa}`,wa=`hidden${fa}`,_a=`show${fa}`,xa=`shown${fa}`,Ta="fade",ka="hide",Sa="show",Ea="showing",Ca={animation:"boolean",autohide:"boolean",delay:"number"},Aa={animation:!0,autohide:!0,delay:5e3}
class La extends G{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Aa}static get DefaultType(){return Ca}static get NAME(){return ha}show(){if(F.trigger(this._element,_a).defaultPrevented)return
this._clearTimeout(),this._config.animation&&this._element.classList.add(Ta)
const e=()=>{this._element.classList.remove(Ea),F.trigger(this._element,xa),this._maybeScheduleHide()}
this._element.classList.remove(ka),m(this._element),this._element.classList.add(Sa,Ea),this._queueCallback(e,this._element,this._config.animation)}hide(){if(!this.isShown())return
if(F.trigger(this._element,ba).defaultPrevented)return
const e=()=>{this._element.classList.add(ka),this._element.classList.remove(Ea,Sa),F.trigger(this._element,wa)}
this._element.classList.add(Ea),this._queueCallback(e,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Sa),super.dispose()}isShown(){return this._element.classList.contains(Sa)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t
break
case"focusin":case"focusout":this._hasKeyboardInteraction=t}if(t)return void this._clearTimeout()
const n=e.relatedTarget
this._element===n||this._element.contains(n)||this._maybeScheduleHide()}_setListeners(){F.on(this._element,ga,(e=>this._onInteraction(e,!0))),F.on(this._element,ma,(e=>this._onInteraction(e,!1))),F.on(this._element,va,(e=>this._onInteraction(e,!0))),F.on(this._element,ya,(e=>this._onInteraction(e,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each((function(){const t=La.getOrCreateInstance(this,e)
if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`)
t[e](this)}}))}}return J(La),_(La),{Alert:se,Button:de,Carousel:rt,Collapse:Et,Dropdown:wo,Modal:ps,Offcanvas:Ms,Popover:_r,ScrollSpy:Hr,Tab:pa,Toast:La,Tooltip:gr}}()},467:()=>{document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll("[data-bs-scroll-target]").forEach((e=>{e.addEventListener("click",(function(){const e=document.querySelector(this.dataset.bsScrollTarget)
e&&e.scrollIntoView({behavior:"smooth"})}))}))}))},473:()=>{new MutationObserver(((e,t)=>{document.querySelector(".microsite-menu")&&(document.documentElement.style.setProperty("--gs-scroll-padding--top","6rem"),t.disconnect())})).observe(document.body,{childList:!0,subtree:!0})},599:(e,t,n)=>{var i,o,s
!function(){"use strict"
o=[n(692)],i=function(e){var t=window.Slick||{};(t=function(){var t=0
function n(n,i){var o,s=this
s.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:e(n),appendDots:e(n),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(t,n){return e('<button type="button" />').text(n+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},s.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},e.extend(s,s.initials),s.activeBreakpoint=null,s.animType=null,s.animProp=null,s.breakpoints=[],s.breakpointSettings=[],s.cssTransitions=!1,s.focussed=!1,s.interrupted=!1,s.hidden="hidden",s.paused=!0,s.positionProp=null,s.respondTo=null,s.rowCount=1,s.shouldClick=!0,s.$slider=e(n),s.$slidesCache=null,s.transformType=null,s.transitionType=null,s.visibilityChange="visibilitychange",s.windowWidth=0,s.windowTimer=null,o=e(n).data("slick")||{},s.options=e.extend({},s.defaults,i,o),s.currentSlide=s.options.initialSlide,s.originalSettings=s.options,void 0!==document.mozHidden?(s.hidden="mozHidden",s.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(s.hidden="webkitHidden",s.visibilityChange="webkitvisibilitychange"),s.autoPlay=e.proxy(s.autoPlay,s),s.autoPlayClear=e.proxy(s.autoPlayClear,s),s.autoPlayIterator=e.proxy(s.autoPlayIterator,s),s.changeSlide=e.proxy(s.changeSlide,s),s.clickHandler=e.proxy(s.clickHandler,s),s.selectHandler=e.proxy(s.selectHandler,s),s.setPosition=e.proxy(s.setPosition,s),s.swipeHandler=e.proxy(s.swipeHandler,s),s.dragHandler=e.proxy(s.dragHandler,s),s.keyHandler=e.proxy(s.keyHandler,s),s.instanceUid=t++,s.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,s.registerBreakpoints(),s.init(!0)}return n}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},t.prototype.addSlide=t.prototype.slickAdd=function(t,n,i){var o=this
if("boolean"==typeof n)i=n,n=null
else if(n<0||n>=o.slideCount)return!1
o.unload(),"number"==typeof n?0===n&&0===o.$slides.length?e(t).appendTo(o.$slideTrack):i?e(t).insertBefore(o.$slides.eq(n)):e(t).insertAfter(o.$slides.eq(n)):!0===i?e(t).prependTo(o.$slideTrack):e(t).appendTo(o.$slideTrack),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slides.each((function(t,n){e(n).attr("data-slick-index",t)})),o.$slidesCache=o.$slides,o.reinit()},t.prototype.animateHeight=function(){var e=this
if(1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical){var t=e.$slides.eq(e.currentSlide).outerHeight(!0)
e.$list.animate({height:t},e.options.speed)}},t.prototype.animateSlide=function(t,n){var i={},o=this
o.animateHeight(),!0===o.options.rtl&&!1===o.options.vertical&&(t=-t),!1===o.transformsEnabled?!1===o.options.vertical?o.$slideTrack.animate({left:t},o.options.speed,o.options.easing,n):o.$slideTrack.animate({top:t},o.options.speed,o.options.easing,n):!1===o.cssTransitions?(!0===o.options.rtl&&(o.currentLeft=-o.currentLeft),e({animStart:o.currentLeft}).animate({animStart:t},{duration:o.options.speed,easing:o.options.easing,step:function(e){e=Math.ceil(e),!1===o.options.vertical?(i[o.animType]="translate("+e+"px, 0px)",o.$slideTrack.css(i)):(i[o.animType]="translate(0px,"+e+"px)",o.$slideTrack.css(i))},complete:function(){n&&n.call()}})):(o.applyTransition(),t=Math.ceil(t),!1===o.options.vertical?i[o.animType]="translate3d("+t+"px, 0px, 0px)":i[o.animType]="translate3d(0px,"+t+"px, 0px)",o.$slideTrack.css(i),n&&setTimeout((function(){o.disableTransition(),n.call()}),o.options.speed))},t.prototype.getNavTarget=function(){var t=this,n=t.options.asNavFor
return n&&null!==n&&(n=e(n).not(t.$slider)),n},t.prototype.asNavFor=function(t){var n=this.getNavTarget()
null!==n&&"object"==typeof n&&n.each((function(){var n=e(this).slick("getSlick")
n.unslicked||n.slideHandler(t,!0)}))},t.prototype.applyTransition=function(e){var t=this,n={}
!1===t.options.fade?n[t.transitionType]=t.transformType+" "+t.options.speed+"ms "+t.options.cssEase:n[t.transitionType]="opacity "+t.options.speed+"ms "+t.options.cssEase,!1===t.options.fade?t.$slideTrack.css(n):t.$slides.eq(e).css(n)},t.prototype.autoPlay=function(){var e=this
e.autoPlayClear(),e.slideCount>e.options.slidesToShow&&(e.autoPlayTimer=setInterval(e.autoPlayIterator,e.options.autoplaySpeed))},t.prototype.autoPlayClear=function(){var e=this
e.autoPlayTimer&&clearInterval(e.autoPlayTimer)},t.prototype.autoPlayIterator=function(){var e=this,t=e.currentSlide+e.options.slidesToScroll
e.paused||e.interrupted||e.focussed||(!1===e.options.infinite&&(1===e.direction&&e.currentSlide+1===e.slideCount-1?e.direction=0:0===e.direction&&(t=e.currentSlide-e.options.slidesToScroll,e.currentSlide-1==0&&(e.direction=1))),e.slideHandler(t))},t.prototype.buildArrows=function(){var t=this
!0===t.options.arrows&&(t.$prevArrow=e(t.options.prevArrow).addClass("slick-arrow"),t.$nextArrow=e(t.options.nextArrow).addClass("slick-arrow"),t.slideCount>t.options.slidesToShow?(t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.prependTo(t.options.appendArrows),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.appendTo(t.options.appendArrows),!0!==t.options.infinite&&t.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},t.prototype.buildDots=function(){var t,n,i=this
if(!0===i.options.dots&&i.slideCount>i.options.slidesToShow){for(i.$slider.addClass("slick-dotted"),n=e("<ul />").addClass(i.options.dotsClass),t=0;t<=i.getDotCount();t+=1)n.append(e("<li />").append(i.options.customPaging.call(this,i,t)))
i.$dots=n.appendTo(i.options.appendDots),i.$dots.find("li").first().addClass("slick-active")}},t.prototype.buildOut=function(){var t=this
t.$slides=t.$slider.children(t.options.slide+":not(.slick-cloned)").addClass("slick-slide"),t.slideCount=t.$slides.length,t.$slides.each((function(t,n){e(n).attr("data-slick-index",t).data("originalStyling",e(n).attr("style")||"")})),t.$slider.addClass("slick-slider"),t.$slideTrack=0===t.slideCount?e('<div class="slick-track"/>').appendTo(t.$slider):t.$slides.wrapAll('<div class="slick-track"/>').parent(),t.$list=t.$slideTrack.wrap('<div class="slick-list"/>').parent(),t.$slideTrack.css("opacity",0),!0!==t.options.centerMode&&!0!==t.options.swipeToSlide||(t.options.slidesToScroll=1),e("img[data-lazy]",t.$slider).not("[src]").addClass("slick-loading"),t.setupInfinite(),t.buildArrows(),t.buildDots(),t.updateDots(),t.setSlideClasses("number"==typeof t.currentSlide?t.currentSlide:0),!0===t.options.draggable&&t.$list.addClass("draggable")},t.prototype.buildRows=function(){var e,t,n,i,o,s,r,a=this
if(i=document.createDocumentFragment(),s=a.$slider.children(),a.options.rows>0){for(r=a.options.slidesPerRow*a.options.rows,o=Math.ceil(s.length/r),e=0;e<o;e++){var l=document.createElement("div")
for(t=0;t<a.options.rows;t++){var c=document.createElement("div")
for(n=0;n<a.options.slidesPerRow;n++){var d=e*r+(t*a.options.slidesPerRow+n)
s.get(d)&&c.appendChild(s.get(d))}l.appendChild(c)}i.appendChild(l)}a.$slider.empty().append(i),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},t.prototype.checkResponsive=function(t,n){var i,o,s,r=this,a=!1,l=r.$slider.width(),c=window.innerWidth||e(window).width()
if("window"===r.respondTo?s=c:"slider"===r.respondTo?s=l:"min"===r.respondTo&&(s=Math.min(c,l)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){for(i in o=null,r.breakpoints)r.breakpoints.hasOwnProperty(i)&&(!1===r.originalSettings.mobileFirst?s<r.breakpoints[i]&&(o=r.breakpoints[i]):s>r.breakpoints[i]&&(o=r.breakpoints[i]))
null!==o?null!==r.activeBreakpoint?(o!==r.activeBreakpoint||n)&&(r.activeBreakpoint=o,"unslick"===r.breakpointSettings[o]?r.unslick(o):(r.options=e.extend({},r.originalSettings,r.breakpointSettings[o]),!0===t&&(r.currentSlide=r.options.initialSlide),r.refresh(t)),a=o):(r.activeBreakpoint=o,"unslick"===r.breakpointSettings[o]?r.unslick(o):(r.options=e.extend({},r.originalSettings,r.breakpointSettings[o]),!0===t&&(r.currentSlide=r.options.initialSlide),r.refresh(t)),a=o):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===t&&(r.currentSlide=r.options.initialSlide),r.refresh(t),a=o),t||!1===a||r.$slider.trigger("breakpoint",[r,a])}},t.prototype.changeSlide=function(t,n){var i,o,s=this,r=e(t.currentTarget)
switch(r.is("a")&&t.preventDefault(),r.is("li")||(r=r.closest("li")),i=s.slideCount%s.options.slidesToScroll!=0?0:(s.slideCount-s.currentSlide)%s.options.slidesToScroll,t.data.message){case"previous":o=0===i?s.options.slidesToScroll:s.options.slidesToShow-i,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide-o,!1,n)
break
case"next":o=0===i?s.options.slidesToScroll:i,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide+o,!1,n)
break
case"index":var a=0===t.data.index?0:t.data.index||r.index()*s.options.slidesToScroll
s.slideHandler(s.checkNavigable(a),!1,n),r.children().trigger("focus")
break
default:return}},t.prototype.checkNavigable=function(e){var t,n
if(n=0,e>(t=this.getNavigableIndexes())[t.length-1])e=t[t.length-1]
else for(var i in t){if(e<t[i]){e=n
break}n=t[i]}return e},t.prototype.cleanUpEvents=function(){var t=this
t.options.dots&&null!==t.$dots&&(e("li",t.$dots).off("click.slick",t.changeSlide).off("mouseenter.slick",e.proxy(t.interrupt,t,!0)).off("mouseleave.slick",e.proxy(t.interrupt,t,!1)),!0===t.options.accessibility&&t.$dots.off("keydown.slick",t.keyHandler)),t.$slider.off("focus.slick blur.slick"),!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow&&t.$prevArrow.off("click.slick",t.changeSlide),t.$nextArrow&&t.$nextArrow.off("click.slick",t.changeSlide),!0===t.options.accessibility&&(t.$prevArrow&&t.$prevArrow.off("keydown.slick",t.keyHandler),t.$nextArrow&&t.$nextArrow.off("keydown.slick",t.keyHandler))),t.$list.off("touchstart.slick mousedown.slick",t.swipeHandler),t.$list.off("touchmove.slick mousemove.slick",t.swipeHandler),t.$list.off("touchend.slick mouseup.slick",t.swipeHandler),t.$list.off("touchcancel.slick mouseleave.slick",t.swipeHandler),t.$list.off("click.slick",t.clickHandler),e(document).off(t.visibilityChange,t.visibility),t.cleanUpSlideEvents(),!0===t.options.accessibility&&t.$list.off("keydown.slick",t.keyHandler),!0===t.options.focusOnSelect&&e(t.$slideTrack).children().off("click.slick",t.selectHandler),e(window).off("orientationchange.slick.slick-"+t.instanceUid,t.orientationChange),e(window).off("resize.slick.slick-"+t.instanceUid,t.resize),e("[draggable!=true]",t.$slideTrack).off("dragstart",t.preventDefault),e(window).off("load.slick.slick-"+t.instanceUid,t.setPosition)},t.prototype.cleanUpSlideEvents=function(){var t=this
t.$list.off("mouseenter.slick",e.proxy(t.interrupt,t,!0)),t.$list.off("mouseleave.slick",e.proxy(t.interrupt,t,!1))},t.prototype.cleanUpRows=function(){var e,t=this
t.options.rows>0&&((e=t.$slides.children().children()).removeAttr("style"),t.$slider.empty().append(e))},t.prototype.clickHandler=function(e){!1===this.shouldClick&&(e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault())},t.prototype.destroy=function(t){var n=this
n.autoPlayClear(),n.touchObject={},n.cleanUpEvents(),e(".slick-cloned",n.$slider).detach(),n.$dots&&n.$dots.remove(),n.$prevArrow&&n.$prevArrow.length&&(n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),n.htmlExpr.test(n.options.prevArrow)&&n.$prevArrow.remove()),n.$nextArrow&&n.$nextArrow.length&&(n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),n.htmlExpr.test(n.options.nextArrow)&&n.$nextArrow.remove()),n.$slides&&(n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function(){e(this).attr("style",e(this).data("originalStyling"))})),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.detach(),n.$list.detach(),n.$slider.append(n.$slides)),n.cleanUpRows(),n.$slider.removeClass("slick-slider"),n.$slider.removeClass("slick-initialized"),n.$slider.removeClass("slick-dotted"),n.unslicked=!0,t||n.$slider.trigger("destroy",[n])},t.prototype.disableTransition=function(e){var t=this,n={}
n[t.transitionType]="",!1===t.options.fade?t.$slideTrack.css(n):t.$slides.eq(e).css(n)},t.prototype.fadeSlide=function(e,t){var n=this
!1===n.cssTransitions?(n.$slides.eq(e).css({zIndex:n.options.zIndex}),n.$slides.eq(e).animate({opacity:1},n.options.speed,n.options.easing,t)):(n.applyTransition(e),n.$slides.eq(e).css({opacity:1,zIndex:n.options.zIndex}),t&&setTimeout((function(){n.disableTransition(e),t.call()}),n.options.speed))},t.prototype.fadeSlideOut=function(e){var t=this
!1===t.cssTransitions?t.$slides.eq(e).animate({opacity:0,zIndex:t.options.zIndex-2},t.options.speed,t.options.easing):(t.applyTransition(e),t.$slides.eq(e).css({opacity:0,zIndex:t.options.zIndex-2}))},t.prototype.filterSlides=t.prototype.slickFilter=function(e){var t=this
null!==e&&(t.$slidesCache=t.$slides,t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.filter(e).appendTo(t.$slideTrack),t.reinit())},t.prototype.focusHandler=function(){var t=this
t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",(function(n){n.stopImmediatePropagation()
var i=e(this)
setTimeout((function(){t.options.pauseOnFocus&&(t.focussed=i.is(":focus"),t.autoPlay())}),0)}))},t.prototype.getCurrent=t.prototype.slickCurrentSlide=function(){return this.currentSlide},t.prototype.getDotCount=function(){var e=this,t=0,n=0,i=0
if(!0===e.options.infinite)if(e.slideCount<=e.options.slidesToShow)++i
else for(;t<e.slideCount;)++i,t=n+e.options.slidesToScroll,n+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow
else if(!0===e.options.centerMode)i=e.slideCount
else if(e.options.asNavFor)for(;t<e.slideCount;)++i,t=n+e.options.slidesToScroll,n+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow
else i=1+Math.ceil((e.slideCount-e.options.slidesToShow)/e.options.slidesToScroll)
return i-1},t.prototype.getLeft=function(e){var t,n,i,o,s=this,r=0
return s.slideOffset=0,n=s.$slides.first().outerHeight(!0),!0===s.options.infinite?(s.slideCount>s.options.slidesToShow&&(s.slideOffset=s.slideWidth*s.options.slidesToShow*-1,o=-1,!0===s.options.vertical&&!0===s.options.centerMode&&(2===s.options.slidesToShow?o=-1.5:1===s.options.slidesToShow&&(o=-2)),r=n*s.options.slidesToShow*o),s.slideCount%s.options.slidesToScroll!=0&&e+s.options.slidesToScroll>s.slideCount&&s.slideCount>s.options.slidesToShow&&(e>s.slideCount?(s.slideOffset=(s.options.slidesToShow-(e-s.slideCount))*s.slideWidth*-1,r=(s.options.slidesToShow-(e-s.slideCount))*n*-1):(s.slideOffset=s.slideCount%s.options.slidesToScroll*s.slideWidth*-1,r=s.slideCount%s.options.slidesToScroll*n*-1))):e+s.options.slidesToShow>s.slideCount&&(s.slideOffset=(e+s.options.slidesToShow-s.slideCount)*s.slideWidth,r=(e+s.options.slidesToShow-s.slideCount)*n),s.slideCount<=s.options.slidesToShow&&(s.slideOffset=0,r=0),!0===s.options.centerMode&&s.slideCount<=s.options.slidesToShow?s.slideOffset=s.slideWidth*Math.floor(s.options.slidesToShow)/2-s.slideWidth*s.slideCount/2:!0===s.options.centerMode&&!0===s.options.infinite?s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)-s.slideWidth:!0===s.options.centerMode&&(s.slideOffset=0,s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)),t=!1===s.options.vertical?e*s.slideWidth*-1+s.slideOffset:e*n*-1+r,!0===s.options.variableWidth&&(i=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(e):s.$slideTrack.children(".slick-slide").eq(e+s.options.slidesToShow),t=!0===s.options.rtl?i[0]?-1*(s.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,!0===s.options.centerMode&&(i=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(e):s.$slideTrack.children(".slick-slide").eq(e+s.options.slidesToShow+1),t=!0===s.options.rtl?i[0]?-1*(s.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,t+=(s.$list.width()-i.outerWidth())/2)),t},t.prototype.getOption=t.prototype.slickGetOption=function(e){return this.options[e]},t.prototype.getNavigableIndexes=function(){var e,t=this,n=0,i=0,o=[]
for(!1===t.options.infinite?e=t.slideCount:(n=-1*t.options.slidesToScroll,i=-1*t.options.slidesToScroll,e=2*t.slideCount);n<e;)o.push(n),n=i+t.options.slidesToScroll,i+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow
return o},t.prototype.getSlick=function(){return this},t.prototype.getSlideCount=function(){var t,n,i=this
return n=!0===i.options.centerMode?i.slideWidth*Math.floor(i.options.slidesToShow/2):0,!0===i.options.swipeToSlide?(i.$slideTrack.find(".slick-slide").each((function(o,s){if(s.offsetLeft-n+e(s).outerWidth()/2>-1*i.swipeLeft)return t=s,!1})),Math.abs(e(t).attr("data-slick-index")-i.currentSlide)||1):i.options.slidesToScroll},t.prototype.goTo=t.prototype.slickGoTo=function(e,t){this.changeSlide({data:{message:"index",index:parseInt(e)}},t)},t.prototype.init=function(t){var n=this
e(n.$slider).hasClass("slick-initialized")||(e(n.$slider).addClass("slick-initialized"),n.buildRows(),n.buildOut(),n.setProps(),n.startLoad(),n.loadSlider(),n.initializeEvents(),n.updateArrows(),n.updateDots(),n.checkResponsive(!0),n.focusHandler()),t&&n.$slider.trigger("init",[n]),!0===n.options.accessibility&&n.initADA(),n.options.autoplay&&(n.paused=!1,n.autoPlay())},t.prototype.initADA=function(){var t=this,n=Math.ceil(t.slideCount/t.options.slidesToShow),i=t.getNavigableIndexes().filter((function(e){return e>=0&&e<t.slideCount}))
t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==t.$dots&&(t.$slides.not(t.$slideTrack.find(".slick-cloned")).each((function(n){var o=i.indexOf(n)
if(e(this).attr({role:"tabpanel",id:"slick-slide"+t.instanceUid+n,tabindex:-1}),-1!==o){var s="slick-slide-control"+t.instanceUid+o
e("#"+s).length&&e(this).attr({"aria-describedby":s})}})),t.$dots.attr("role","tablist").find("li").each((function(o){var s=i[o]
e(this).attr({role:"presentation"}),e(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+t.instanceUid+o,"aria-controls":"slick-slide"+t.instanceUid+s,"aria-label":o+1+" of "+n,"aria-selected":null,tabindex:"-1"})})).eq(t.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end())
for(var o=t.currentSlide,s=o+t.options.slidesToShow;o<s;o++)t.options.focusOnChange?t.$slides.eq(o).attr({tabindex:"0"}):t.$slides.eq(o).removeAttr("tabindex")
t.activateADA()},t.prototype.initArrowEvents=function(){var e=this
!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},e.changeSlide),e.$nextArrow.off("click.slick").on("click.slick",{message:"next"},e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow.on("keydown.slick",e.keyHandler),e.$nextArrow.on("keydown.slick",e.keyHandler)))},t.prototype.initDotEvents=function(){var t=this
!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&(e("li",t.$dots).on("click.slick",{message:"index"},t.changeSlide),!0===t.options.accessibility&&t.$dots.on("keydown.slick",t.keyHandler)),!0===t.options.dots&&!0===t.options.pauseOnDotsHover&&t.slideCount>t.options.slidesToShow&&e("li",t.$dots).on("mouseenter.slick",e.proxy(t.interrupt,t,!0)).on("mouseleave.slick",e.proxy(t.interrupt,t,!1))},t.prototype.initSlideEvents=function(){var t=this
t.options.pauseOnHover&&(t.$list.on("mouseenter.slick",e.proxy(t.interrupt,t,!0)),t.$list.on("mouseleave.slick",e.proxy(t.interrupt,t,!1)))},t.prototype.initializeEvents=function(){var t=this
t.initArrowEvents(),t.initDotEvents(),t.initSlideEvents(),t.$list.on("touchstart.slick mousedown.slick",{action:"start"},t.swipeHandler),t.$list.on("touchmove.slick mousemove.slick",{action:"move"},t.swipeHandler),t.$list.on("touchend.slick mouseup.slick",{action:"end"},t.swipeHandler),t.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},t.swipeHandler),t.$list.on("click.slick",t.clickHandler),e(document).on(t.visibilityChange,e.proxy(t.visibility,t)),!0===t.options.accessibility&&t.$list.on("keydown.slick",t.keyHandler),!0===t.options.focusOnSelect&&e(t.$slideTrack).children().on("click.slick",t.selectHandler),e(window).on("orientationchange.slick.slick-"+t.instanceUid,e.proxy(t.orientationChange,t)),e(window).on("resize.slick.slick-"+t.instanceUid,e.proxy(t.resize,t)),e("[draggable!=true]",t.$slideTrack).on("dragstart",t.preventDefault),e(window).on("load.slick.slick-"+t.instanceUid,t.setPosition),e(t.setPosition)},t.prototype.initUI=function(){var e=this
!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.show(),e.$nextArrow.show()),!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&e.$dots.show()},t.prototype.keyHandler=function(e){var t=this
e.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===e.keyCode&&!0===t.options.accessibility?t.changeSlide({data:{message:!0===t.options.rtl?"next":"previous"}}):39===e.keyCode&&!0===t.options.accessibility&&t.changeSlide({data:{message:!0===t.options.rtl?"previous":"next"}}))},t.prototype.lazyLoad=function(){var t,n,i,o=this
function s(t){e("img[data-lazy]",t).each((function(){var t=e(this),n=e(this).attr("data-lazy"),i=e(this).attr("data-srcset"),s=e(this).attr("data-sizes")||o.$slider.attr("data-sizes"),r=document.createElement("img")
r.onload=function(){t.animate({opacity:0},100,(function(){i&&(t.attr("srcset",i),s&&t.attr("sizes",s)),t.attr("src",n).animate({opacity:1},200,(function(){t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")})),o.$slider.trigger("lazyLoaded",[o,t,n])}))},r.onerror=function(){t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),o.$slider.trigger("lazyLoadError",[o,t,n])},r.src=n}))}if(!0===o.options.centerMode?!0===o.options.infinite?i=(n=o.currentSlide+(o.options.slidesToShow/2+1))+o.options.slidesToShow+2:(n=Math.max(0,o.currentSlide-(o.options.slidesToShow/2+1)),i=o.options.slidesToShow/2+1+2+o.currentSlide):(n=o.options.infinite?o.options.slidesToShow+o.currentSlide:o.currentSlide,i=Math.ceil(n+o.options.slidesToShow),!0===o.options.fade&&(n>0&&n--,i<=o.slideCount&&i++)),t=o.$slider.find(".slick-slide").slice(n,i),"anticipated"===o.options.lazyLoad)for(var r=n-1,a=i,l=o.$slider.find(".slick-slide"),c=0;c<o.options.slidesToScroll;c++)r<0&&(r=o.slideCount-1),t=(t=t.add(l.eq(r))).add(l.eq(a)),r--,a++
s(t),o.slideCount<=o.options.slidesToShow?s(o.$slider.find(".slick-slide")):o.currentSlide>=o.slideCount-o.options.slidesToShow?s(o.$slider.find(".slick-cloned").slice(0,o.options.slidesToShow)):0===o.currentSlide&&s(o.$slider.find(".slick-cloned").slice(-1*o.options.slidesToShow))},t.prototype.loadSlider=function(){var e=this
e.setPosition(),e.$slideTrack.css({opacity:1}),e.$slider.removeClass("slick-loading"),e.initUI(),"progressive"===e.options.lazyLoad&&e.progressiveLazyLoad()},t.prototype.next=t.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},t.prototype.orientationChange=function(){var e=this
e.checkResponsive(),e.setPosition()},t.prototype.pause=t.prototype.slickPause=function(){var e=this
e.autoPlayClear(),e.paused=!0},t.prototype.play=t.prototype.slickPlay=function(){var e=this
e.autoPlay(),e.options.autoplay=!0,e.paused=!1,e.focussed=!1,e.interrupted=!1},t.prototype.postSlide=function(t){var n=this
n.unslicked||(n.$slider.trigger("afterChange",[n,t]),n.animating=!1,n.slideCount>n.options.slidesToShow&&n.setPosition(),n.swipeLeft=null,n.options.autoplay&&n.autoPlay(),!0===n.options.accessibility&&(n.initADA(),n.options.focusOnChange&&e(n.$slides.get(n.currentSlide)).attr("tabindex",0).focus()))},t.prototype.prev=t.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},t.prototype.preventDefault=function(e){e.preventDefault()},t.prototype.progressiveLazyLoad=function(t){t=t||1
var n,i,o,s,r,a=this,l=e("img[data-lazy]",a.$slider)
l.length?(n=l.first(),i=n.attr("data-lazy"),o=n.attr("data-srcset"),s=n.attr("data-sizes")||a.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){o&&(n.attr("srcset",o),s&&n.attr("sizes",s)),n.attr("src",i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===a.options.adaptiveHeight&&a.setPosition(),a.$slider.trigger("lazyLoaded",[a,n,i]),a.progressiveLazyLoad()},r.onerror=function(){t<3?setTimeout((function(){a.progressiveLazyLoad(t+1)}),500):(n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),a.$slider.trigger("lazyLoadError",[a,n,i]),a.progressiveLazyLoad())},r.src=i):a.$slider.trigger("allImagesLoaded",[a])},t.prototype.refresh=function(t){var n,i,o=this
i=o.slideCount-o.options.slidesToShow,!o.options.infinite&&o.currentSlide>i&&(o.currentSlide=i),o.slideCount<=o.options.slidesToShow&&(o.currentSlide=0),n=o.currentSlide,o.destroy(!0),e.extend(o,o.initials,{currentSlide:n}),o.init(),t||o.changeSlide({data:{message:"index",index:n}},!1)},t.prototype.registerBreakpoints=function(){var t,n,i,o=this,s=o.options.responsive||null
if("array"===e.type(s)&&s.length){for(t in o.respondTo=o.options.respondTo||"window",s)if(i=o.breakpoints.length-1,s.hasOwnProperty(t)){for(n=s[t].breakpoint;i>=0;)o.breakpoints[i]&&o.breakpoints[i]===n&&o.breakpoints.splice(i,1),i--
o.breakpoints.push(n),o.breakpointSettings[n]=s[t].settings}o.breakpoints.sort((function(e,t){return o.options.mobileFirst?e-t:t-e}))}},t.prototype.reinit=function(){var t=this
t.$slides=t.$slideTrack.children(t.options.slide).addClass("slick-slide"),t.slideCount=t.$slides.length,t.currentSlide>=t.slideCount&&0!==t.currentSlide&&(t.currentSlide=t.currentSlide-t.options.slidesToScroll),t.slideCount<=t.options.slidesToShow&&(t.currentSlide=0),t.registerBreakpoints(),t.setProps(),t.setupInfinite(),t.buildArrows(),t.updateArrows(),t.initArrowEvents(),t.buildDots(),t.updateDots(),t.initDotEvents(),t.cleanUpSlideEvents(),t.initSlideEvents(),t.checkResponsive(!1,!0),!0===t.options.focusOnSelect&&e(t.$slideTrack).children().on("click.slick",t.selectHandler),t.setSlideClasses("number"==typeof t.currentSlide?t.currentSlide:0),t.setPosition(),t.focusHandler(),t.paused=!t.options.autoplay,t.autoPlay(),t.$slider.trigger("reInit",[t])},t.prototype.resize=function(){var t=this
e(window).width()!==t.windowWidth&&(clearTimeout(t.windowDelay),t.windowDelay=window.setTimeout((function(){t.windowWidth=e(window).width(),t.checkResponsive(),t.unslicked||t.setPosition()}),50))},t.prototype.removeSlide=t.prototype.slickRemove=function(e,t,n){var i=this
if(e="boolean"==typeof e?!0===(t=e)?0:i.slideCount-1:!0===t?--e:e,i.slideCount<1||e<0||e>i.slideCount-1)return!1
i.unload(),!0===n?i.$slideTrack.children().remove():i.$slideTrack.children(this.options.slide).eq(e).remove(),i.$slides=i.$slideTrack.children(this.options.slide),i.$slideTrack.children(this.options.slide).detach(),i.$slideTrack.append(i.$slides),i.$slidesCache=i.$slides,i.reinit()},t.prototype.setCSS=function(e){var t,n,i=this,o={}
!0===i.options.rtl&&(e=-e),t="left"==i.positionProp?Math.ceil(e)+"px":"0px",n="top"==i.positionProp?Math.ceil(e)+"px":"0px",o[i.positionProp]=e,!1===i.transformsEnabled?i.$slideTrack.css(o):(o={},!1===i.cssTransitions?(o[i.animType]="translate("+t+", "+n+")",i.$slideTrack.css(o)):(o[i.animType]="translate3d("+t+", "+n+", 0px)",i.$slideTrack.css(o)))},t.prototype.setDimensions=function(){var e=this
!1===e.options.vertical?!0===e.options.centerMode&&e.$list.css({padding:"0px "+e.options.centerPadding}):(e.$list.height(e.$slides.first().outerHeight(!0)*e.options.slidesToShow),!0===e.options.centerMode&&e.$list.css({padding:e.options.centerPadding+" 0px"})),e.listWidth=e.$list.width(),e.listHeight=e.$list.height(),!1===e.options.vertical&&!1===e.options.variableWidth?(e.slideWidth=Math.ceil(e.listWidth/e.options.slidesToShow),e.$slideTrack.width(Math.ceil(e.slideWidth*e.$slideTrack.children(".slick-slide").length))):!0===e.options.variableWidth?e.$slideTrack.width(5e3*e.slideCount):(e.slideWidth=Math.ceil(e.listWidth),e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0)*e.$slideTrack.children(".slick-slide").length)))
var t=e.$slides.first().outerWidth(!0)-e.$slides.first().width()
!1===e.options.variableWidth&&e.$slideTrack.children(".slick-slide").width(e.slideWidth-t)},t.prototype.setFade=function(){var t,n=this
n.$slides.each((function(i,o){t=n.slideWidth*i*-1,!0===n.options.rtl?e(o).css({position:"relative",right:t,top:0,zIndex:n.options.zIndex-2,opacity:0}):e(o).css({position:"relative",left:t,top:0,zIndex:n.options.zIndex-2,opacity:0})})),n.$slides.eq(n.currentSlide).css({zIndex:n.options.zIndex-1,opacity:1})},t.prototype.setHeight=function(){var e=this
if(1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical){var t=e.$slides.eq(e.currentSlide).outerHeight(!0)
e.$list.css("height",t)}},t.prototype.setOption=t.prototype.slickSetOption=function(){var t,n,i,o,s,r=this,a=!1
if("object"===e.type(arguments[0])?(i=arguments[0],a=arguments[1],s="multiple"):"string"===e.type(arguments[0])&&(i=arguments[0],o=arguments[1],a=arguments[2],"responsive"===arguments[0]&&"array"===e.type(arguments[1])?s="responsive":void 0!==arguments[1]&&(s="single")),"single"===s)r.options[i]=o
else if("multiple"===s)e.each(i,(function(e,t){r.options[e]=t}))
else if("responsive"===s)for(n in o)if("array"!==e.type(r.options.responsive))r.options.responsive=[o[n]]
else{for(t=r.options.responsive.length-1;t>=0;)r.options.responsive[t].breakpoint===o[n].breakpoint&&r.options.responsive.splice(t,1),t--
r.options.responsive.push(o[n])}a&&(r.unload(),r.reinit())},t.prototype.setPosition=function(){var e=this
e.setDimensions(),e.setHeight(),!1===e.options.fade?e.setCSS(e.getLeft(e.currentSlide)):e.setFade(),e.$slider.trigger("setPosition",[e])},t.prototype.setProps=function(){var e=this,t=document.body.style
e.positionProp=!0===e.options.vertical?"top":"left","top"===e.positionProp?e.$slider.addClass("slick-vertical"):e.$slider.removeClass("slick-vertical"),void 0===t.WebkitTransition&&void 0===t.MozTransition&&void 0===t.msTransition||!0===e.options.useCSS&&(e.cssTransitions=!0),e.options.fade&&("number"==typeof e.options.zIndex?e.options.zIndex<3&&(e.options.zIndex=3):e.options.zIndex=e.defaults.zIndex),void 0!==t.OTransform&&(e.animType="OTransform",e.transformType="-o-transform",e.transitionType="OTransition",void 0===t.perspectiveProperty&&void 0===t.webkitPerspective&&(e.animType=!1)),void 0!==t.MozTransform&&(e.animType="MozTransform",e.transformType="-moz-transform",e.transitionType="MozTransition",void 0===t.perspectiveProperty&&void 0===t.MozPerspective&&(e.animType=!1)),void 0!==t.webkitTransform&&(e.animType="webkitTransform",e.transformType="-webkit-transform",e.transitionType="webkitTransition",void 0===t.perspectiveProperty&&void 0===t.webkitPerspective&&(e.animType=!1)),void 0!==t.msTransform&&(e.animType="msTransform",e.transformType="-ms-transform",e.transitionType="msTransition",void 0===t.msTransform&&(e.animType=!1)),void 0!==t.transform&&!1!==e.animType&&(e.animType="transform",e.transformType="transform",e.transitionType="transition"),e.transformsEnabled=e.options.useTransform&&null!==e.animType&&!1!==e.animType},t.prototype.setSlideClasses=function(e){var t,n,i,o,s=this
if(n=s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),s.$slides.eq(e).addClass("slick-current"),!0===s.options.centerMode){var r=s.options.slidesToShow%2==0?1:0
t=Math.floor(s.options.slidesToShow/2),!0===s.options.infinite&&(e>=t&&e<=s.slideCount-1-t?s.$slides.slice(e-t+r,e+t+1).addClass("slick-active").attr("aria-hidden","false"):(i=s.options.slidesToShow+e,n.slice(i-t+1+r,i+t+2).addClass("slick-active").attr("aria-hidden","false")),0===e?n.eq(n.length-1-s.options.slidesToShow).addClass("slick-center"):e===s.slideCount-1&&n.eq(s.options.slidesToShow).addClass("slick-center")),s.$slides.eq(e).addClass("slick-center")}else e>=0&&e<=s.slideCount-s.options.slidesToShow?s.$slides.slice(e,e+s.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):n.length<=s.options.slidesToShow?n.addClass("slick-active").attr("aria-hidden","false"):(o=s.slideCount%s.options.slidesToShow,i=!0===s.options.infinite?s.options.slidesToShow+e:e,s.options.slidesToShow==s.options.slidesToScroll&&s.slideCount-e<s.options.slidesToShow?n.slice(i-(s.options.slidesToShow-o),i+o).addClass("slick-active").attr("aria-hidden","false"):n.slice(i,i+s.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"))
"ondemand"!==s.options.lazyLoad&&"anticipated"!==s.options.lazyLoad||s.lazyLoad()},t.prototype.setupInfinite=function(){var t,n,i,o=this
if(!0===o.options.fade&&(o.options.centerMode=!1),!0===o.options.infinite&&!1===o.options.fade&&(n=null,o.slideCount>o.options.slidesToShow)){for(i=!0===o.options.centerMode?o.options.slidesToShow+1:o.options.slidesToShow,t=o.slideCount;t>o.slideCount-i;t-=1)n=t-1,e(o.$slides[n]).clone(!0).attr("id","").attr("data-slick-index",n-o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned")
for(t=0;t<i+o.slideCount;t+=1)n=t,e(o.$slides[n]).clone(!0).attr("id","").attr("data-slick-index",n+o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned")
o.$slideTrack.find(".slick-cloned").find("[id]").each((function(){e(this).attr("id","")}))}},t.prototype.interrupt=function(e){var t=this
e||t.autoPlay(),t.interrupted=e},t.prototype.selectHandler=function(t){var n=this,i=e(t.target).is(".slick-slide")?e(t.target):e(t.target).parents(".slick-slide"),o=parseInt(i.attr("data-slick-index"))
o||(o=0),n.slideCount<=n.options.slidesToShow?n.slideHandler(o,!1,!0):n.slideHandler(o)},t.prototype.slideHandler=function(e,t,n){var i,o,s,r,a,l=null,c=this
if(t=t||!1,!(!0===c.animating&&!0===c.options.waitForAnimate||!0===c.options.fade&&c.currentSlide===e))if(!1===t&&c.asNavFor(e),i=e,l=c.getLeft(i),r=c.getLeft(c.currentSlide),c.currentLeft=null===c.swipeLeft?r:c.swipeLeft,!1===c.options.infinite&&!1===c.options.centerMode&&(e<0||e>c.getDotCount()*c.options.slidesToScroll))!1===c.options.fade&&(i=c.currentSlide,!0!==n&&c.slideCount>c.options.slidesToShow?c.animateSlide(r,(function(){c.postSlide(i)})):c.postSlide(i))
else if(!1===c.options.infinite&&!0===c.options.centerMode&&(e<0||e>c.slideCount-c.options.slidesToScroll))!1===c.options.fade&&(i=c.currentSlide,!0!==n&&c.slideCount>c.options.slidesToShow?c.animateSlide(r,(function(){c.postSlide(i)})):c.postSlide(i))
else{if(c.options.autoplay&&clearInterval(c.autoPlayTimer),o=i<0?c.slideCount%c.options.slidesToScroll!=0?c.slideCount-c.slideCount%c.options.slidesToScroll:c.slideCount+i:i>=c.slideCount?c.slideCount%c.options.slidesToScroll!=0?0:i-c.slideCount:i,c.animating=!0,c.$slider.trigger("beforeChange",[c,c.currentSlide,o]),s=c.currentSlide,c.currentSlide=o,c.setSlideClasses(c.currentSlide),c.options.asNavFor&&(a=(a=c.getNavTarget()).slick("getSlick")).slideCount<=a.options.slidesToShow&&a.setSlideClasses(c.currentSlide),c.updateDots(),c.updateArrows(),!0===c.options.fade)return!0!==n?(c.fadeSlideOut(s),c.fadeSlide(o,(function(){c.postSlide(o)}))):c.postSlide(o),void c.animateHeight()
!0!==n&&c.slideCount>c.options.slidesToShow?c.animateSlide(l,(function(){c.postSlide(o)})):c.postSlide(o)}},t.prototype.startLoad=function(){var e=this
!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.hide(),e.$nextArrow.hide()),!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&e.$dots.hide(),e.$slider.addClass("slick-loading")},t.prototype.swipeDirection=function(){var e,t,n,i,o=this
return e=o.touchObject.startX-o.touchObject.curX,t=o.touchObject.startY-o.touchObject.curY,n=Math.atan2(t,e),(i=Math.round(180*n/Math.PI))<0&&(i=360-Math.abs(i)),i<=45&&i>=0||i<=360&&i>=315?!1===o.options.rtl?"left":"right":i>=135&&i<=225?!1===o.options.rtl?"right":"left":!0===o.options.verticalSwiping?i>=35&&i<=135?"down":"up":"vertical"},t.prototype.swipeEnd=function(e){var t,n,i=this
if(i.dragging=!1,i.swiping=!1,i.scrolling)return i.scrolling=!1,!1
if(i.interrupted=!1,i.shouldClick=!(i.touchObject.swipeLength>10),void 0===i.touchObject.curX)return!1
if(!0===i.touchObject.edgeHit&&i.$slider.trigger("edge",[i,i.swipeDirection()]),i.touchObject.swipeLength>=i.touchObject.minSwipe){switch(n=i.swipeDirection()){case"left":case"down":t=i.options.swipeToSlide?i.checkNavigable(i.currentSlide+i.getSlideCount()):i.currentSlide+i.getSlideCount(),i.currentDirection=0
break
case"right":case"up":t=i.options.swipeToSlide?i.checkNavigable(i.currentSlide-i.getSlideCount()):i.currentSlide-i.getSlideCount(),i.currentDirection=1}"vertical"!=n&&(i.slideHandler(t),i.touchObject={},i.$slider.trigger("swipe",[i,n]))}else i.touchObject.startX!==i.touchObject.curX&&(i.slideHandler(i.currentSlide),i.touchObject={})},t.prototype.swipeHandler=function(e){var t=this
if(!(!1===t.options.swipe||"ontouchend"in document&&!1===t.options.swipe||!1===t.options.draggable&&-1!==e.type.indexOf("mouse")))switch(t.touchObject.fingerCount=e.originalEvent&&void 0!==e.originalEvent.touches?e.originalEvent.touches.length:1,t.touchObject.minSwipe=t.listWidth/t.options.touchThreshold,!0===t.options.verticalSwiping&&(t.touchObject.minSwipe=t.listHeight/t.options.touchThreshold),e.data.action){case"start":t.swipeStart(e)
break
case"move":t.swipeMove(e)
break
case"end":t.swipeEnd(e)}},t.prototype.swipeMove=function(e){var t,n,i,o,s,r,a=this
return s=void 0!==e.originalEvent?e.originalEvent.touches:null,!(!a.dragging||a.scrolling||s&&1!==s.length)&&(t=a.getLeft(a.currentSlide),a.touchObject.curX=void 0!==s?s[0].pageX:e.clientX,a.touchObject.curY=void 0!==s?s[0].pageY:e.clientY,a.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(a.touchObject.curX-a.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(a.touchObject.curY-a.touchObject.startY,2))),!a.options.verticalSwiping&&!a.swiping&&r>4?(a.scrolling=!0,!1):(!0===a.options.verticalSwiping&&(a.touchObject.swipeLength=r),n=a.swipeDirection(),void 0!==e.originalEvent&&a.touchObject.swipeLength>4&&(a.swiping=!0,e.preventDefault()),o=(!1===a.options.rtl?1:-1)*(a.touchObject.curX>a.touchObject.startX?1:-1),!0===a.options.verticalSwiping&&(o=a.touchObject.curY>a.touchObject.startY?1:-1),i=a.touchObject.swipeLength,a.touchObject.edgeHit=!1,!1===a.options.infinite&&(0===a.currentSlide&&"right"===n||a.currentSlide>=a.getDotCount()&&"left"===n)&&(i=a.touchObject.swipeLength*a.options.edgeFriction,a.touchObject.edgeHit=!0),!1===a.options.vertical?a.swipeLeft=t+i*o:a.swipeLeft=t+i*(a.$list.height()/a.listWidth)*o,!0===a.options.verticalSwiping&&(a.swipeLeft=t+i*o),!0!==a.options.fade&&!1!==a.options.touchMove&&(!0===a.animating?(a.swipeLeft=null,!1):void a.setCSS(a.swipeLeft))))},t.prototype.swipeStart=function(e){var t,n=this
if(n.interrupted=!0,1!==n.touchObject.fingerCount||n.slideCount<=n.options.slidesToShow)return n.touchObject={},!1
void 0!==e.originalEvent&&void 0!==e.originalEvent.touches&&(t=e.originalEvent.touches[0]),n.touchObject.startX=n.touchObject.curX=void 0!==t?t.pageX:e.clientX,n.touchObject.startY=n.touchObject.curY=void 0!==t?t.pageY:e.clientY,n.dragging=!0},t.prototype.unfilterSlides=t.prototype.slickUnfilter=function(){var e=this
null!==e.$slidesCache&&(e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.appendTo(e.$slideTrack),e.reinit())},t.prototype.unload=function(){var t=this
e(".slick-cloned",t.$slider).remove(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove(),t.$nextArrow&&t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove(),t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},t.prototype.unslick=function(e){var t=this
t.$slider.trigger("unslick",[t,e]),t.destroy()},t.prototype.updateArrows=function(){var e=this
Math.floor(e.options.slidesToShow/2),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):(e.currentSlide>=e.slideCount-e.options.slidesToShow&&!1===e.options.centerMode||e.currentSlide>=e.slideCount-1&&!0===e.options.centerMode)&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},t.prototype.updateDots=function(){var e=this
null!==e.$dots&&(e.$dots.find("li").removeClass("slick-active").end(),e.$dots.find("li").eq(Math.floor(e.currentSlide/e.options.slidesToScroll)).addClass("slick-active"))},t.prototype.visibility=function(){var e=this
e.options.autoplay&&(document[e.hidden]?e.interrupted=!0:e.interrupted=!1)},e.fn.slick=function(){var e,n,i=this,o=arguments[0],s=Array.prototype.slice.call(arguments,1),r=i.length
for(e=0;e<r;e++)if("object"==typeof o||void 0===o?i[e].slick=new t(i[e],o):n=i[e].slick[o].apply(i[e].slick,s),void 0!==n)return n
return i}},void 0===(s="function"==typeof i?i.apply(t,o):i)||(e.exports=s)}()},692:function(e,t){var n
!function(t,n){"use strict"
"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document")
return n(e)}:n(t)}("undefined"!=typeof window?window:this,(function(i,o){"use strict"
var s=[],r=Object.getPrototypeOf,a=s.slice,l=s.flat?function(e){return s.flat.call(e)}:function(e){return s.concat.apply([],e)},c=s.push,d=s.indexOf,u={},p=u.toString,h=u.hasOwnProperty,f=h.toString,g=f.call(Object),m={},v=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},y=function(e){return null!=e&&e===e.window},b=i.document,w={type:!0,src:!0,nonce:!0,noModule:!0}
function _(e,t,n){var i,o,s=(n=n||b).createElement("script")
if(s.text=e,t)for(i in w)(o=t[i]||t.getAttribute&&t.getAttribute(i))&&s.setAttribute(i,o)
n.head.appendChild(s).parentNode.removeChild(s)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?u[p.call(e)]||"object":typeof e}var T="3.7.1",k=/HTML$/i,S=function(e,t){return new S.fn.init(e,t)}
function E(e){var t=!!e&&"length"in e&&e.length,n=x(e)
return!v(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function C(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}S.fn=S.prototype={jquery:T,constructor:S,length:0,toArray:function(){return a.call(this)},get:function(e){return null==e?a.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e)
return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(e){return this.pushStack(S.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(a.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(S.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,n=+e+(e<0?t:0)
return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:c,sort:s.sort,splice:s.splice},S.extend=S.fn.extend=function(){var e,t,n,i,o,s,r=arguments[0]||{},a=1,l=arguments.length,c=!1
for("boolean"==typeof r&&(c=r,r=arguments[a]||{},a++),"object"==typeof r||v(r)||(r={}),a===l&&(r=this,a--);a<l;a++)if(null!=(e=arguments[a]))for(t in e)i=e[t],"__proto__"!==t&&r!==i&&(c&&i&&(S.isPlainObject(i)||(o=Array.isArray(i)))?(n=r[t],s=o&&!Array.isArray(n)?[]:o||S.isPlainObject(n)?n:{},o=!1,r[t]=S.extend(c,s,i)):void 0!==i&&(r[t]=i))
return r},S.extend({expando:"jQuery"+(T+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n
return!(!e||"[object Object]"!==p.call(e))&&(!(t=r(e))||"function"==typeof(n=h.call(t,"constructor")&&t.constructor)&&f.call(n)===g)},isEmptyObject:function(e){var t
for(t in e)return!1
return!0},globalEval:function(e,t,n){_(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,i=0
if(E(e))for(n=e.length;i<n&&!1!==t.call(e[i],i,e[i]);i++);else for(i in e)if(!1===t.call(e[i],i,e[i]))break
return e},text:function(e){var t,n="",i=0,o=e.nodeType
if(!o)for(;t=e[i++];)n+=S.text(t)
return 1===o||11===o?e.textContent:9===o?e.documentElement.textContent:3===o||4===o?e.nodeValue:n},makeArray:function(e,t){var n=t||[]
return null!=e&&(E(Object(e))?S.merge(n,"string"==typeof e?[e]:e):c.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:d.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement
return!k.test(t||n&&n.nodeName||"HTML")},merge:function(e,t){for(var n=+t.length,i=0,o=e.length;i<n;i++)e[o++]=t[i]
return e.length=o,e},grep:function(e,t,n){for(var i=[],o=0,s=e.length,r=!n;o<s;o++)!t(e[o],o)!==r&&i.push(e[o])
return i},map:function(e,t,n){var i,o,s=0,r=[]
if(E(e))for(i=e.length;s<i;s++)null!=(o=t(e[s],s,n))&&r.push(o)
else for(s in e)null!=(o=t(e[s],s,n))&&r.push(o)
return l(r)},guid:1,support:m}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=s[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){u["[object "+t+"]"]=t.toLowerCase()}))
var A=s.pop,L=s.sort,$=s.splice,O="[\\x20\\t\\r\\n\\f]",P=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g")
S.contains=function(e,t){var n=t&&t.parentNode
return e===n||!(!n||1!==n.nodeType||!(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))}
var D=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g
function M(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}S.escapeSelector=function(e){return(e+"").replace(D,M)}
var N=b,j=c
!function(){var e,t,n,o,r,l,c,u,p,f,g=j,v=S.expando,y=0,b=0,w=ee(),_=ee(),x=ee(),T=ee(),k=function(e,t){return e===t&&(r=!0),0},E="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",D="(?:\\\\[\\da-fA-F]{1,6}"+O+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",M="\\["+O+"*("+D+")(?:"+O+"*([*^$|!~]?=)"+O+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+D+"))|)"+O+"*\\]",I=":("+D+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",H=new RegExp(O+"+","g"),q=new RegExp("^"+O+"*,"+O+"*"),R=new RegExp("^"+O+"*([>+~]|"+O+")"+O+"*"),B=new RegExp(O+"|>"),F=new RegExp(I),W=new RegExp("^"+D+"$"),z={ID:new RegExp("^#("+D+")"),CLASS:new RegExp("^\\.("+D+")"),TAG:new RegExp("^("+D+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+I),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),bool:new RegExp("^(?:"+E+")$","i"),needsContext:new RegExp("^"+O+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)","i")},U=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,V=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Y=/[+~]/,G=new RegExp("\\\\[\\da-fA-F]{1,6}"+O+"?|\\\\([^\\r\\n\\f])","g"),K=function(e,t){var n="0x"+e.slice(1)-65536
return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},Q=function(){le()},J=pe((function(e){return!0===e.disabled&&C(e,"fieldset")}),{dir:"parentNode",next:"legend"})
try{g.apply(s=a.call(N.childNodes),N.childNodes),s[N.childNodes.length].nodeType}catch(e){g={apply:function(e,t){j.apply(e,a.call(t))},call:function(e){j.apply(e,a.call(arguments,1))}}}function Z(e,t,n,i){var o,s,r,a,c,d,h,f=t&&t.ownerDocument,y=t?t.nodeType:9
if(n=n||[],"string"!=typeof e||!e||1!==y&&9!==y&&11!==y)return n
if(!i&&(le(t),t=t||l,u)){if(11!==y&&(c=V.exec(e)))if(o=c[1]){if(9===y){if(!(r=t.getElementById(o)))return n
if(r.id===o)return g.call(n,r),n}else if(f&&(r=f.getElementById(o))&&Z.contains(t,r)&&r.id===o)return g.call(n,r),n}else{if(c[2])return g.apply(n,t.getElementsByTagName(e)),n
if((o=c[3])&&t.getElementsByClassName)return g.apply(n,t.getElementsByClassName(o)),n}if(!(T[e+" "]||p&&p.test(e))){if(h=e,f=t,1===y&&(B.test(e)||R.test(e))){for((f=Y.test(e)&&ae(t.parentNode)||t)==t&&m.scope||((a=t.getAttribute("id"))?a=S.escapeSelector(a):t.setAttribute("id",a=v)),s=(d=de(e)).length;s--;)d[s]=(a?"#"+a:":scope")+" "+ue(d[s])
h=d.join(",")}try{return g.apply(n,f.querySelectorAll(h)),n}catch(t){T(e,!0)}finally{a===v&&t.removeAttribute("id")}}}return ye(e.replace(P,"$1"),t,n,i)}function ee(){var e=[]
return function n(i,o){return e.push(i+" ")>t.cacheLength&&delete n[e.shift()],n[i+" "]=o}}function te(e){return e[v]=!0,e}function ne(e){var t=l.createElement("fieldset")
try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ie(e){return function(t){return C(t,"input")&&t.type===e}}function oe(e){return function(t){return(C(t,"input")||C(t,"button"))&&t.type===e}}function se(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&J(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function re(e){return te((function(t){return t=+t,te((function(n,i){for(var o,s=e([],n.length,t),r=s.length;r--;)n[o=s[r]]&&(n[o]=!(i[o]=n[o]))}))}))}function ae(e){return e&&void 0!==e.getElementsByTagName&&e}function le(e){var n,i=e?e.ownerDocument||e:N
return i!=l&&9===i.nodeType&&i.documentElement?(c=(l=i).documentElement,u=!S.isXMLDoc(l),f=c.matches||c.webkitMatchesSelector||c.msMatchesSelector,c.msMatchesSelector&&N!=l&&(n=l.defaultView)&&n.top!==n&&n.addEventListener("unload",Q),m.getById=ne((function(e){return c.appendChild(e).id=S.expando,!l.getElementsByName||!l.getElementsByName(S.expando).length})),m.disconnectedMatch=ne((function(e){return f.call(e,"*")})),m.scope=ne((function(){return l.querySelectorAll(":scope")})),m.cssHas=ne((function(){try{return l.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}})),m.getById?(t.filter.ID=function(e){var t=e.replace(G,K)
return function(e){return e.getAttribute("id")===t}},t.find.ID=function(e,t){if(void 0!==t.getElementById&&u){var n=t.getElementById(e)
return n?[n]:[]}}):(t.filter.ID=function(e){var t=e.replace(G,K)
return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id")
return n&&n.value===t}},t.find.ID=function(e,t){if(void 0!==t.getElementById&&u){var n,i,o,s=t.getElementById(e)
if(s){if((n=s.getAttributeNode("id"))&&n.value===e)return[s]
for(o=t.getElementsByName(e),i=0;s=o[i++];)if((n=s.getAttributeNode("id"))&&n.value===e)return[s]}return[]}}),t.find.TAG=function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},t.find.CLASS=function(e,t){if(void 0!==t.getElementsByClassName&&u)return t.getElementsByClassName(e)},p=[],ne((function(e){var t
c.appendChild(e).innerHTML="<a id='"+v+"' href='' disabled='disabled'></a><select id='"+v+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||p.push("\\["+O+"*(?:value|"+E+")"),e.querySelectorAll("[id~="+v+"-]").length||p.push("~="),e.querySelectorAll("a#"+v+"+*").length||p.push(".#.+[+~]"),e.querySelectorAll(":checked").length||p.push(":checked"),(t=l.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),c.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&p.push(":enabled",":disabled"),(t=l.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||p.push("\\["+O+"*name"+O+"*="+O+"*(?:''|\"\")")})),m.cssHas||p.push(":has"),p=p.length&&new RegExp(p.join("|")),k=function(e,t){if(e===t)return r=!0,0
var n=!e.compareDocumentPosition-!t.compareDocumentPosition
return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!m.sortDetached&&t.compareDocumentPosition(e)===n?e===l||e.ownerDocument==N&&Z.contains(N,e)?-1:t===l||t.ownerDocument==N&&Z.contains(N,t)?1:o?d.call(o,e)-d.call(o,t):0:4&n?-1:1)},l):l}for(e in Z.matches=function(e,t){return Z(e,null,null,t)},Z.matchesSelector=function(e,t){if(le(e),u&&!T[t+" "]&&(!p||!p.test(t)))try{var n=f.call(e,t)
if(n||m.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){T(t,!0)}return Z(t,l,null,[e]).length>0},Z.contains=function(e,t){return(e.ownerDocument||e)!=l&&le(e),S.contains(e,t)},Z.attr=function(e,n){(e.ownerDocument||e)!=l&&le(e)
var i=t.attrHandle[n.toLowerCase()],o=i&&h.call(t.attrHandle,n.toLowerCase())?i(e,n,!u):void 0
return void 0!==o?o:e.getAttribute(n)},Z.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},S.uniqueSort=function(e){var t,n=[],i=0,s=0
if(r=!m.sortStable,o=!m.sortStable&&a.call(e,0),L.call(e,k),r){for(;t=e[s++];)t===e[s]&&(i=n.push(s))
for(;i--;)$.call(e,n[i],1)}return o=null,e},S.fn.uniqueSort=function(){return this.pushStack(S.uniqueSort(a.apply(this)))},t=S.expr={cacheLength:50,createPseudo:te,match:z,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(G,K),e[3]=(e[3]||e[4]||e[5]||"").replace(G,K),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||Z.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&Z.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2]
return z.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&F.test(n)&&(t=de(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(G,K).toLowerCase()
return"*"===e?function(){return!0}:function(e){return C(e,t)}},CLASS:function(e){var t=w[e+" "]
return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&w(e,(function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(i){var o=Z.attr(i,e)
return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&o.indexOf(n)>-1:"$="===t?n&&o.slice(-n.length)===n:"~="===t?(" "+o.replace(H," ")+" ").indexOf(n)>-1:"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,i,o){var s="nth"!==e.slice(0,3),r="last"!==e.slice(-4),a="of-type"===t
return 1===i&&0===o?function(e){return!!e.parentNode}:function(t,n,l){var c,d,u,p,h,f=s!==r?"nextSibling":"previousSibling",g=t.parentNode,m=a&&t.nodeName.toLowerCase(),b=!l&&!a,w=!1
if(g){if(s){for(;f;){for(u=t;u=u[f];)if(a?C(u,m):1===u.nodeType)return!1
h=f="only"===e&&!h&&"nextSibling"}return!0}if(h=[r?g.firstChild:g.lastChild],r&&b){for(w=(p=(c=(d=g[v]||(g[v]={}))[e]||[])[0]===y&&c[1])&&c[2],u=p&&g.childNodes[p];u=++p&&u&&u[f]||(w=p=0)||h.pop();)if(1===u.nodeType&&++w&&u===t){d[e]=[y,p,w]
break}}else if(b&&(w=p=(c=(d=t[v]||(t[v]={}))[e]||[])[0]===y&&c[1]),!1===w)for(;(u=++p&&u&&u[f]||(w=p=0)||h.pop())&&(!(a?C(u,m):1===u.nodeType)||!++w||(b&&((d=u[v]||(u[v]={}))[e]=[y,w]),u!==t)););return(w-=o)===i||w%i==0&&w/i>=0}}},PSEUDO:function(e,n){var i,o=t.pseudos[e]||t.setFilters[e.toLowerCase()]||Z.error("unsupported pseudo: "+e)
return o[v]?o(n):o.length>1?(i=[e,e,"",n],t.setFilters.hasOwnProperty(e.toLowerCase())?te((function(e,t){for(var i,s=o(e,n),r=s.length;r--;)e[i=d.call(e,s[r])]=!(t[i]=s[r])})):function(e){return o(e,0,i)}):o}},pseudos:{not:te((function(e){var t=[],n=[],i=ve(e.replace(P,"$1"))
return i[v]?te((function(e,t,n,o){for(var s,r=i(e,null,o,[]),a=e.length;a--;)(s=r[a])&&(e[a]=!(t[a]=s))})):function(e,o,s){return t[0]=e,i(t,null,s,n),t[0]=null,!n.pop()}})),has:te((function(e){return function(t){return Z(e,t).length>0}})),contains:te((function(e){return e=e.replace(G,K),function(t){return(t.textContent||S.text(t)).indexOf(e)>-1}})),lang:te((function(e){return W.test(e||"")||Z.error("unsupported lang: "+e),e=e.replace(G,K).toLowerCase(),function(t){var n
do{if(n=u?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType)
return!1}})),target:function(e){var t=i.location&&i.location.hash
return t&&t.slice(1)===e.id},root:function(e){return e===c},focus:function(e){return e===function(){try{return l.activeElement}catch(e){}}()&&l.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},enabled:se(!1),disabled:se(!0),checked:function(e){return C(e,"input")&&!!e.checked||C(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1
return!0},parent:function(e){return!t.pseudos.empty(e)},header:function(e){return X.test(e.nodeName)},input:function(e){return U.test(e.nodeName)},button:function(e){return C(e,"input")&&"button"===e.type||C(e,"button")},text:function(e){var t
return C(e,"input")&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:re((function(){return[0]})),last:re((function(e,t){return[t-1]})),eq:re((function(e,t,n){return[n<0?n+t:n]})),even:re((function(e,t){for(var n=0;n<t;n+=2)e.push(n)
return e})),odd:re((function(e,t){for(var n=1;n<t;n+=2)e.push(n)
return e})),lt:re((function(e,t,n){var i
for(i=n<0?n+t:n>t?t:n;--i>=0;)e.push(i)
return e})),gt:re((function(e,t,n){for(var i=n<0?n+t:n;++i<t;)e.push(i)
return e}))}},t.pseudos.nth=t.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})t.pseudos[e]=ie(e)
for(e in{submit:!0,reset:!0})t.pseudos[e]=oe(e)
function ce(){}function de(e,n){var i,o,s,r,a,l,c,d=_[e+" "]
if(d)return n?0:d.slice(0)
for(a=e,l=[],c=t.preFilter;a;){for(r in i&&!(o=q.exec(a))||(o&&(a=a.slice(o[0].length)||a),l.push(s=[])),i=!1,(o=R.exec(a))&&(i=o.shift(),s.push({value:i,type:o[0].replace(P," ")}),a=a.slice(i.length)),t.filter)!(o=z[r].exec(a))||c[r]&&!(o=c[r](o))||(i=o.shift(),s.push({value:i,type:r,matches:o}),a=a.slice(i.length))
if(!i)break}return n?a.length:a?Z.error(e):_(e,l).slice(0)}function ue(e){for(var t=0,n=e.length,i="";t<n;t++)i+=e[t].value
return i}function pe(e,t,n){var i=t.dir,o=t.next,s=o||i,r=n&&"parentNode"===s,a=b++
return t.first?function(t,n,o){for(;t=t[i];)if(1===t.nodeType||r)return e(t,n,o)
return!1}:function(t,n,l){var c,d,u=[y,a]
if(l){for(;t=t[i];)if((1===t.nodeType||r)&&e(t,n,l))return!0}else for(;t=t[i];)if(1===t.nodeType||r)if(d=t[v]||(t[v]={}),o&&C(t,o))t=t[i]||t
else{if((c=d[s])&&c[0]===y&&c[1]===a)return u[2]=c[2]
if(d[s]=u,u[2]=e(t,n,l))return!0}return!1}}function he(e){return e.length>1?function(t,n,i){for(var o=e.length;o--;)if(!e[o](t,n,i))return!1
return!0}:e[0]}function fe(e,t,n,i,o){for(var s,r=[],a=0,l=e.length,c=null!=t;a<l;a++)(s=e[a])&&(n&&!n(s,i,o)||(r.push(s),c&&t.push(a)))
return r}function ge(e,t,n,i,o,s){return i&&!i[v]&&(i=ge(i)),o&&!o[v]&&(o=ge(o,s)),te((function(s,r,a,l){var c,u,p,h,f=[],m=[],v=r.length,y=s||function(e,t,n){for(var i=0,o=t.length;i<o;i++)Z(e,t[i],n)
return n}(t||"*",a.nodeType?[a]:a,[]),b=!e||!s&&t?y:fe(y,f,e,a,l)
if(n?n(b,h=o||(s?e:v||i)?[]:r,a,l):h=b,i)for(c=fe(h,m),i(c,[],a,l),u=c.length;u--;)(p=c[u])&&(h[m[u]]=!(b[m[u]]=p))
if(s){if(o||e){if(o){for(c=[],u=h.length;u--;)(p=h[u])&&c.push(b[u]=p)
o(null,h=[],c,l)}for(u=h.length;u--;)(p=h[u])&&(c=o?d.call(s,p):f[u])>-1&&(s[c]=!(r[c]=p))}}else h=fe(h===r?h.splice(v,h.length):h),o?o(null,r,h,l):g.apply(r,h)}))}function me(e){for(var i,o,s,r=e.length,a=t.relative[e[0].type],l=a||t.relative[" "],c=a?1:0,u=pe((function(e){return e===i}),l,!0),p=pe((function(e){return d.call(i,e)>-1}),l,!0),h=[function(e,t,o){var s=!a&&(o||t!=n)||((i=t).nodeType?u(e,t,o):p(e,t,o))
return i=null,s}];c<r;c++)if(o=t.relative[e[c].type])h=[pe(he(h),o)]
else{if((o=t.filter[e[c].type].apply(null,e[c].matches))[v]){for(s=++c;s<r&&!t.relative[e[s].type];s++);return ge(c>1&&he(h),c>1&&ue(e.slice(0,c-1).concat({value:" "===e[c-2].type?"*":""})).replace(P,"$1"),o,c<s&&me(e.slice(c,s)),s<r&&me(e=e.slice(s)),s<r&&ue(e))}h.push(o)}return he(h)}function ve(e,i){var o,s=[],r=[],a=x[e+" "]
if(!a){for(i||(i=de(e)),o=i.length;o--;)(a=me(i[o]))[v]?s.push(a):r.push(a)
a=x(e,function(e,i){var o=i.length>0,s=e.length>0,r=function(r,a,c,d,p){var h,f,m,v=0,b="0",w=r&&[],_=[],x=n,T=r||s&&t.find.TAG("*",p),k=y+=null==x?1:Math.random()||.1,E=T.length
for(p&&(n=a==l||a||p);b!==E&&null!=(h=T[b]);b++){if(s&&h){for(f=0,a||h.ownerDocument==l||(le(h),c=!u);m=e[f++];)if(m(h,a||l,c)){g.call(d,h)
break}p&&(y=k)}o&&((h=!m&&h)&&v--,r&&w.push(h))}if(v+=b,o&&b!==v){for(f=0;m=i[f++];)m(w,_,a,c)
if(r){if(v>0)for(;b--;)w[b]||_[b]||(_[b]=A.call(d))
_=fe(_)}g.apply(d,_),p&&!r&&_.length>0&&v+i.length>1&&S.uniqueSort(d)}return p&&(y=k,n=x),w}
return o?te(r):r}(r,s)),a.selector=e}return a}function ye(e,n,i,o){var s,r,a,l,c,d="function"==typeof e&&e,p=!o&&de(e=d.selector||e)
if(i=i||[],1===p.length){if((r=p[0]=p[0].slice(0)).length>2&&"ID"===(a=r[0]).type&&9===n.nodeType&&u&&t.relative[r[1].type]){if(!(n=(t.find.ID(a.matches[0].replace(G,K),n)||[])[0]))return i
d&&(n=n.parentNode),e=e.slice(r.shift().value.length)}for(s=z.needsContext.test(e)?0:r.length;s--&&(a=r[s],!t.relative[l=a.type]);)if((c=t.find[l])&&(o=c(a.matches[0].replace(G,K),Y.test(r[0].type)&&ae(n.parentNode)||n))){if(r.splice(s,1),!(e=o.length&&ue(r)))return g.apply(i,o),i
break}}return(d||ve(e,p))(o,n,!u,i,!n||Y.test(e)&&ae(n.parentNode)||n),i}ce.prototype=t.filters=t.pseudos,t.setFilters=new ce,m.sortStable=v.split("").sort(k).join("")===v,le(),m.sortDetached=ne((function(e){return 1&e.compareDocumentPosition(l.createElement("fieldset"))})),S.find=Z,S.expr[":"]=S.expr.pseudos,S.unique=S.uniqueSort,Z.compile=ve,Z.select=ye,Z.setDocument=le,Z.tokenize=de,Z.escape=S.escapeSelector,Z.getText=S.text,Z.isXML=S.isXMLDoc,Z.selectors=S.expr,Z.support=S.support,Z.uniqueSort=S.uniqueSort}()
var I=function(e,t,n){for(var i=[],o=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(o&&S(e).is(n))break
i.push(e)}return i},H=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e)
return n},q=S.expr.match.needsContext,R=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
function B(e,t,n){return v(t)?S.grep(e,(function(e,i){return!!t.call(e,i,e)!==n})):t.nodeType?S.grep(e,(function(e){return e===t!==n})):"string"!=typeof t?S.grep(e,(function(e){return d.call(t,e)>-1!==n})):S.filter(t,e,n)}S.filter=function(e,t,n){var i=t[0]
return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?S.find.matchesSelector(i,e)?[i]:[]:S.find.matches(e,S.grep(t,(function(e){return 1===e.nodeType})))},S.fn.extend({find:function(e){var t,n,i=this.length,o=this
if("string"!=typeof e)return this.pushStack(S(e).filter((function(){for(t=0;t<i;t++)if(S.contains(o[t],this))return!0})))
for(n=this.pushStack([]),t=0;t<i;t++)S.find(e,o[t],n)
return i>1?S.uniqueSort(n):n},filter:function(e){return this.pushStack(B(this,e||[],!1))},not:function(e){return this.pushStack(B(this,e||[],!0))},is:function(e){return!!B(this,"string"==typeof e&&q.test(e)?S(e):e||[],!1).length}})
var F,W=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var i,o
if(!e)return this
if(n=n||F,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:W.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e)
if(i[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:b,!0)),R.test(i[1])&&S.isPlainObject(t))for(i in t)v(this[i])?this[i](t[i]):this.attr(i,t[i])
return this}return(o=b.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,F=S(b)
var z=/^(?:parents|prev(?:Until|All))/,U={children:!0,contents:!0,next:!0,prev:!0}
function X(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length
return this.filter((function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0}))},closest:function(e,t){var n,i=0,o=this.length,s=[],r="string"!=typeof e&&S(e)
if(!q.test(e))for(;i<o;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(r?r.index(n)>-1:1===n.nodeType&&S.find.matchesSelector(n,e))){s.push(n)
break}return this.pushStack(s.length>1?S.uniqueSort(s):s)},index:function(e){return e?"string"==typeof e?d.call(S(e),this[0]):d.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode
return t&&11!==t.nodeType?t:null},parents:function(e){return I(e,"parentNode")},parentsUntil:function(e,t,n){return I(e,"parentNode",n)},next:function(e){return X(e,"nextSibling")},prev:function(e){return X(e,"previousSibling")},nextAll:function(e){return I(e,"nextSibling")},prevAll:function(e){return I(e,"previousSibling")},nextUntil:function(e,t,n){return I(e,"nextSibling",n)},prevUntil:function(e,t,n){return I(e,"previousSibling",n)},siblings:function(e){return H((e.parentNode||{}).firstChild,e)},children:function(e){return H(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(C(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},(function(e,t){S.fn[e]=function(n,i){var o=S.map(this,t,n)
return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=S.filter(i,o)),this.length>1&&(U[e]||S.uniqueSort(o),z.test(e)&&o.reverse()),this.pushStack(o)}}))
var V=/[^\x20\t\r\n\f]+/g
function Y(e){return e}function G(e){throw e}function K(e,t,n,i){var o
try{e&&v(o=e.promise)?o.call(e).done(t).fail(n):e&&v(o=e.then)?o.call(e,t,n):t.apply(void 0,[e].slice(i))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(e){e="string"==typeof e?function(e){var t={}
return S.each(e.match(V)||[],(function(e,n){t[n]=!0})),t}(e):S.extend({},e)
var t,n,i,o,s=[],r=[],a=-1,l=function(){for(o=o||e.once,i=t=!0;r.length;a=-1)for(n=r.shift();++a<s.length;)!1===s[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=s.length,n=!1)
e.memory||(n=!1),t=!1,o&&(s=n?[]:"")},c={add:function(){return s&&(n&&!t&&(a=s.length-1,r.push(n)),function t(n){S.each(n,(function(n,i){v(i)?e.unique&&c.has(i)||s.push(i):i&&i.length&&"string"!==x(i)&&t(i)}))}(arguments),n&&!t&&l()),this},remove:function(){return S.each(arguments,(function(e,t){for(var n;(n=S.inArray(t,s,n))>-1;)s.splice(n,1),n<=a&&a--})),this},has:function(e){return e?S.inArray(e,s)>-1:s.length>0},empty:function(){return s&&(s=[]),this},disable:function(){return o=r=[],s=n="",this},disabled:function(){return!s},lock:function(){return o=r=[],n||t||(s=n=""),this},locked:function(){return!!o},fireWith:function(e,n){return o||(n=[e,(n=n||[]).slice?n.slice():n],r.push(n),t||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}}
return c},S.extend({Deferred:function(e){var t=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],n="pending",o={state:function(){return n},always:function(){return s.done(arguments).fail(arguments),this},catch:function(e){return o.then(null,e)},pipe:function(){var e=arguments
return S.Deferred((function(n){S.each(t,(function(t,i){var o=v(e[i[4]])&&e[i[4]]
s[i[1]]((function(){var e=o&&o.apply(this,arguments)
e&&v(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[i[0]+"With"](this,o?[e]:arguments)}))})),e=null})).promise()},then:function(e,n,o){var s=0
function r(e,t,n,o){return function(){var a=this,l=arguments,c=function(){var i,c
if(!(e<s)){if((i=n.apply(a,l))===t.promise())throw new TypeError("Thenable self-resolution")
c=i&&("object"==typeof i||"function"==typeof i)&&i.then,v(c)?o?c.call(i,r(s,t,Y,o),r(s,t,G,o)):(s++,c.call(i,r(s,t,Y,o),r(s,t,G,o),r(s,t,Y,t.notifyWith))):(n!==Y&&(a=void 0,l=[i]),(o||t.resolveWith)(a,l))}},d=o?c:function(){try{c()}catch(i){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(i,d.error),e+1>=s&&(n!==G&&(a=void 0,l=[i]),t.rejectWith(a,l))}}
e?d():(S.Deferred.getErrorHook?d.error=S.Deferred.getErrorHook():S.Deferred.getStackHook&&(d.error=S.Deferred.getStackHook()),i.setTimeout(d))}}return S.Deferred((function(i){t[0][3].add(r(0,i,v(o)?o:Y,i.notifyWith)),t[1][3].add(r(0,i,v(e)?e:Y)),t[2][3].add(r(0,i,v(n)?n:G))})).promise()},promise:function(e){return null!=e?S.extend(e,o):o}},s={}
return S.each(t,(function(e,i){var r=i[2],a=i[5]
o[i[1]]=r.add,a&&r.add((function(){n=a}),t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),r.add(i[3].fire),s[i[0]]=function(){return s[i[0]+"With"](this===s?void 0:this,arguments),this},s[i[0]+"With"]=r.fireWith})),o.promise(s),e&&e.call(s,s),s},when:function(e){var t=arguments.length,n=t,i=Array(n),o=a.call(arguments),s=S.Deferred(),r=function(e){return function(n){i[e]=this,o[e]=arguments.length>1?a.call(arguments):n,--t||s.resolveWith(i,o)}}
if(t<=1&&(K(e,s.done(r(n)).resolve,s.reject,!t),"pending"===s.state()||v(o[n]&&o[n].then)))return s.then()
for(;n--;)K(o[n],r(n),s.reject)
return s.promise()}})
var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/
S.Deferred.exceptionHook=function(e,t){i.console&&i.console.warn&&e&&Q.test(e.name)&&i.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){i.setTimeout((function(){throw e}))}
var J=S.Deferred()
function Z(){b.removeEventListener("DOMContentLoaded",Z),i.removeEventListener("load",Z),S.ready()}S.fn.ready=function(e){return J.then(e).catch((function(e){S.readyException(e)})),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0,!0!==e&&--S.readyWait>0||J.resolveWith(b,[S]))}}),S.ready.then=J.then,"complete"===b.readyState||"loading"!==b.readyState&&!b.documentElement.doScroll?i.setTimeout(S.ready):(b.addEventListener("DOMContentLoaded",Z),i.addEventListener("load",Z))
var ee=function(e,t,n,i,o,s,r){var a=0,l=e.length,c=null==n
if("object"===x(n))for(a in o=!0,n)ee(e,t,a,n[a],!0,s,r)
else if(void 0!==i&&(o=!0,v(i)||(r=!0),c&&(r?(t.call(e,i),t=null):(c=t,t=function(e,t,n){return c.call(S(e),n)})),t))for(;a<l;a++)t(e[a],n,r?i:i.call(e[a],a,t(e[a],n)))
return o?e:c?t.call(e):l?t(e[0],n):s},te=/^-ms-/,ne=/-([a-z])/g
function ie(e,t){return t.toUpperCase()}function oe(e){return e.replace(te,"ms-").replace(ne,ie)}var se=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType}
function re(){this.expando=S.expando+re.uid++}re.uid=1,re.prototype={cache:function(e){var t=e[this.expando]
return t||(t={},se(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var i,o=this.cache(e)
if("string"==typeof t)o[oe(t)]=n
else for(i in t)o[oe(i)]=t[i]
return o},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][oe(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i=e[this.expando]
if(void 0!==i){if(void 0!==t){n=(t=Array.isArray(t)?t.map(oe):(t=oe(t))in i?[t]:t.match(V)||[]).length
for(;n--;)delete i[t[n]]}(void 0===t||S.isEmptyObject(i))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando]
return void 0!==t&&!S.isEmptyObject(t)}}
var ae=new re,le=new re,ce=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,de=/[A-Z]/g
function ue(e,t,n){var i
if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(de,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(i))){try{n=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:ce.test(e)?JSON.parse(e):e)}(n)}catch(e){}le.set(e,t,n)}else n=void 0
return n}S.extend({hasData:function(e){return le.hasData(e)||ae.hasData(e)},data:function(e,t,n){return le.access(e,t,n)},removeData:function(e,t){le.remove(e,t)},_data:function(e,t,n){return ae.access(e,t,n)},_removeData:function(e,t){ae.remove(e,t)}}),S.fn.extend({data:function(e,t){var n,i,o,s=this[0],r=s&&s.attributes
if(void 0===e){if(this.length&&(o=le.get(s),1===s.nodeType&&!ae.get(s,"hasDataAttrs"))){for(n=r.length;n--;)r[n]&&0===(i=r[n].name).indexOf("data-")&&(i=oe(i.slice(5)),ue(s,i,o[i]))
ae.set(s,"hasDataAttrs",!0)}return o}return"object"==typeof e?this.each((function(){le.set(this,e)})):ee(this,(function(t){var n
if(s&&void 0===t)return void 0!==(n=le.get(s,e))||void 0!==(n=ue(s,e))?n:void 0
this.each((function(){le.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){le.remove(this,e)}))}}),S.extend({queue:function(e,t,n){var i
if(e)return t=(t||"fx")+"queue",i=ae.get(e,t),n&&(!i||Array.isArray(n)?i=ae.access(e,t,S.makeArray(n)):i.push(n)),i||[]},dequeue:function(e,t){t=t||"fx"
var n=S.queue(e,t),i=n.length,o=n.shift(),s=S._queueHooks(e,t)
"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===t&&n.unshift("inprogress"),delete s.stop,o.call(e,(function(){S.dequeue(e,t)}),s)),!i&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks"
return ae.get(e,n)||ae.access(e,n,{empty:S.Callbacks("once memory").add((function(){ae.remove(e,[t+"queue",n])}))})}}),S.fn.extend({queue:function(e,t){var n=2
return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?S.queue(this[0],e):void 0===t?this:this.each((function(){var n=S.queue(this,e,t)
S._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&S.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){S.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,o=S.Deferred(),s=this,r=this.length,a=function(){--i||o.resolveWith(s,[s])}
for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";r--;)(n=ae.get(s[r],e+"queueHooks"))&&n.empty&&(i++,n.empty.add(a))
return a(),o.promise(t)}})
var pe=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,he=new RegExp("^(?:([+-])=|)("+pe+")([a-z%]*)$","i"),fe=["Top","Right","Bottom","Left"],ge=b.documentElement,me=function(e){return S.contains(e.ownerDocument,e)},ve={composed:!0}
ge.getRootNode&&(me=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(ve)===e.ownerDocument})
var ye=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&me(e)&&"none"===S.css(e,"display")}
function be(e,t,n,i){var o,s,r=20,a=i?function(){return i.cur()}:function(){return S.css(e,t,"")},l=a(),c=n&&n[3]||(S.cssNumber[t]?"":"px"),d=e.nodeType&&(S.cssNumber[t]||"px"!==c&&+l)&&he.exec(S.css(e,t))
if(d&&d[3]!==c){for(l/=2,c=c||d[3],d=+l||1;r--;)S.style(e,t,d+c),(1-s)*(1-(s=a()/l||.5))<=0&&(r=0),d/=s
d*=2,S.style(e,t,d+c),n=n||[]}return n&&(d=+d||+l||0,o=n[1]?d+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=d,i.end=o)),o}var we={}
function _e(e){var t,n=e.ownerDocument,i=e.nodeName,o=we[i]
return o||(t=n.body.appendChild(n.createElement(i)),o=S.css(t,"display"),t.parentNode.removeChild(t),"none"===o&&(o="block"),we[i]=o,o)}function xe(e,t){for(var n,i,o=[],s=0,r=e.length;s<r;s++)(i=e[s]).style&&(n=i.style.display,t?("none"===n&&(o[s]=ae.get(i,"display")||null,o[s]||(i.style.display="")),""===i.style.display&&ye(i)&&(o[s]=_e(i))):"none"!==n&&(o[s]="none",ae.set(i,"display",n)))
for(s=0;s<r;s++)null!=o[s]&&(e[s].style.display=o[s])
return e}S.fn.extend({show:function(){return xe(this,!0)},hide:function(){return xe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){ye(this)?S(this).show():S(this).hide()}))}})
var Te,ke,Se=/^(?:checkbox|radio)$/i,Ee=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,Ce=/^$|^module$|\/(?:java|ecma)script/i
Te=b.createDocumentFragment().appendChild(b.createElement("div")),(ke=b.createElement("input")).setAttribute("type","radio"),ke.setAttribute("checked","checked"),ke.setAttribute("name","t"),Te.appendChild(ke),m.checkClone=Te.cloneNode(!0).cloneNode(!0).lastChild.checked,Te.innerHTML="<textarea>x</textarea>",m.noCloneChecked=!!Te.cloneNode(!0).lastChild.defaultValue,Te.innerHTML="<option></option>",m.option=!!Te.lastChild
var Ae={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}
function Le(e,t){var n
return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&C(e,t)?S.merge([e],n):n}function $e(e,t){for(var n=0,i=e.length;n<i;n++)ae.set(e[n],"globalEval",!t||ae.get(t[n],"globalEval"))}Ae.tbody=Ae.tfoot=Ae.colgroup=Ae.caption=Ae.thead,Ae.th=Ae.td,m.option||(Ae.optgroup=Ae.option=[1,"<select multiple='multiple'>","</select>"])
var Oe=/<|&#?\w+;/
function Pe(e,t,n,i,o){for(var s,r,a,l,c,d,u=t.createDocumentFragment(),p=[],h=0,f=e.length;h<f;h++)if((s=e[h])||0===s)if("object"===x(s))S.merge(p,s.nodeType?[s]:s)
else if(Oe.test(s)){for(r=r||u.appendChild(t.createElement("div")),a=(Ee.exec(s)||["",""])[1].toLowerCase(),l=Ae[a]||Ae._default,r.innerHTML=l[1]+S.htmlPrefilter(s)+l[2],d=l[0];d--;)r=r.lastChild
S.merge(p,r.childNodes),(r=u.firstChild).textContent=""}else p.push(t.createTextNode(s))
for(u.textContent="",h=0;s=p[h++];)if(i&&S.inArray(s,i)>-1)o&&o.push(s)
else if(c=me(s),r=Le(u.appendChild(s),"script"),c&&$e(r),n)for(d=0;s=r[d++];)Ce.test(s.type||"")&&n.push(s)
return u}var De=/^([^.]*)(?:\.(.+)|)/
function Me(){return!0}function Ne(){return!1}function je(e,t,n,i,o,s){var r,a
if("object"==typeof t){for(a in"string"!=typeof n&&(i=i||n,n=void 0),t)je(e,a,n,i,t[a],s)
return e}if(null==i&&null==o?(o=n,i=n=void 0):null==o&&("string"==typeof n?(o=i,i=void 0):(o=i,i=n,n=void 0)),!1===o)o=Ne
else if(!o)return e
return 1===s&&(r=o,o=function(e){return S().off(e),r.apply(this,arguments)},o.guid=r.guid||(r.guid=S.guid++)),e.each((function(){S.event.add(this,t,o,i,n)}))}function Ie(e,t,n){n?(ae.set(e,t,!1),S.event.add(e,t,{namespace:!1,handler:function(e){var n,i=ae.get(this,t)
if(1&e.isTrigger&&this[t]){if(i)(S.event.special[t]||{}).delegateType&&e.stopPropagation()
else if(i=a.call(arguments),ae.set(this,t,i),this[t](),n=ae.get(this,t),ae.set(this,t,!1),i!==n)return e.stopImmediatePropagation(),e.preventDefault(),n}else i&&(ae.set(this,t,S.event.trigger(i[0],i.slice(1),this)),e.stopPropagation(),e.isImmediatePropagationStopped=Me)}})):void 0===ae.get(e,t)&&S.event.add(e,t,Me)}S.event={global:{},add:function(e,t,n,i,o){var s,r,a,l,c,d,u,p,h,f,g,m=ae.get(e)
if(se(e))for(n.handler&&(n=(s=n).handler,o=s.selector),o&&S.find.matchesSelector(ge,o),n.guid||(n.guid=S.guid++),(l=m.events)||(l=m.events=Object.create(null)),(r=m.handle)||(r=m.handle=function(t){return void 0!==S&&S.event.triggered!==t.type?S.event.dispatch.apply(e,arguments):void 0}),c=(t=(t||"").match(V)||[""]).length;c--;)h=g=(a=De.exec(t[c])||[])[1],f=(a[2]||"").split(".").sort(),h&&(u=S.event.special[h]||{},h=(o?u.delegateType:u.bindType)||h,u=S.event.special[h]||{},d=S.extend({type:h,origType:g,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&S.expr.match.needsContext.test(o),namespace:f.join(".")},s),(p=l[h])||((p=l[h]=[]).delegateCount=0,u.setup&&!1!==u.setup.call(e,i,f,r)||e.addEventListener&&e.addEventListener(h,r)),u.add&&(u.add.call(e,d),d.handler.guid||(d.handler.guid=n.guid)),o?p.splice(p.delegateCount++,0,d):p.push(d),S.event.global[h]=!0)},remove:function(e,t,n,i,o){var s,r,a,l,c,d,u,p,h,f,g,m=ae.hasData(e)&&ae.get(e)
if(m&&(l=m.events)){for(c=(t=(t||"").match(V)||[""]).length;c--;)if(h=g=(a=De.exec(t[c])||[])[1],f=(a[2]||"").split(".").sort(),h){for(u=S.event.special[h]||{},p=l[h=(i?u.delegateType:u.bindType)||h]||[],a=a[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),r=s=p.length;s--;)d=p[s],!o&&g!==d.origType||n&&n.guid!==d.guid||a&&!a.test(d.namespace)||i&&i!==d.selector&&("**"!==i||!d.selector)||(p.splice(s,1),d.selector&&p.delegateCount--,u.remove&&u.remove.call(e,d))
r&&!p.length&&(u.teardown&&!1!==u.teardown.call(e,f,m.handle)||S.removeEvent(e,h,m.handle),delete l[h])}else for(h in l)S.event.remove(e,h+t[c],n,i,!0)
S.isEmptyObject(l)&&ae.remove(e,"handle events")}},dispatch:function(e){var t,n,i,o,s,r,a=new Array(arguments.length),l=S.event.fix(e),c=(ae.get(this,"events")||Object.create(null))[l.type]||[],d=S.event.special[l.type]||{}
for(a[0]=l,t=1;t<arguments.length;t++)a[t]=arguments[t]
if(l.delegateTarget=this,!d.preDispatch||!1!==d.preDispatch.call(this,l)){for(r=S.event.handlers.call(this,l,c),t=0;(o=r[t++])&&!l.isPropagationStopped();)for(l.currentTarget=o.elem,n=0;(s=o.handlers[n++])&&!l.isImmediatePropagationStopped();)l.rnamespace&&!1!==s.namespace&&!l.rnamespace.test(s.namespace)||(l.handleObj=s,l.data=s.data,void 0!==(i=((S.event.special[s.origType]||{}).handle||s.handler).apply(o.elem,a))&&!1===(l.result=i)&&(l.preventDefault(),l.stopPropagation()))
return d.postDispatch&&d.postDispatch.call(this,l),l.result}},handlers:function(e,t){var n,i,o,s,r,a=[],l=t.delegateCount,c=e.target
if(l&&c.nodeType&&!("click"===e.type&&e.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==e.type||!0!==c.disabled)){for(s=[],r={},n=0;n<l;n++)void 0===r[o=(i=t[n]).selector+" "]&&(r[o]=i.needsContext?S(o,this).index(c)>-1:S.find(o,this,null,[c]).length),r[o]&&s.push(i)
s.length&&a.push({elem:c,handlers:s})}return c=this,l<t.length&&a.push({elem:c,handlers:t.slice(l)}),a},addProp:function(e,t){Object.defineProperty(S.Event.prototype,e,{enumerable:!0,configurable:!0,get:v(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e
return Se.test(t.type)&&t.click&&C(t,"input")&&Ie(t,"click",!0),!1},trigger:function(e){var t=this||e
return Se.test(t.type)&&t.click&&C(t,"input")&&Ie(t,"click"),!0},_default:function(e){var t=e.target
return Se.test(t.type)&&t.click&&C(t,"input")&&ae.get(t,"click")||C(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t)
e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Me:Ne,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ne,isPropagationStopped:Ne,isImmediatePropagationStopped:Ne,isSimulated:!1,preventDefault:function(){var e=this.originalEvent
this.isDefaultPrevented=Me,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent
this.isPropagationStopped=Me,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent
this.isImmediatePropagationStopped=Me,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},(function(e,t){function n(e){if(b.documentMode){var n=ae.get(this,"handle"),i=S.event.fix(e)
i.type="focusin"===e.type?"focus":"blur",i.isSimulated=!0,n(e),i.target===i.currentTarget&&n(i)}else S.event.simulate(t,e.target,S.event.fix(e))}S.event.special[e]={setup:function(){var i
if(Ie(this,e,!0),!b.documentMode)return!1;(i=ae.get(this,t))||this.addEventListener(t,n),ae.set(this,t,(i||0)+1)},trigger:function(){return Ie(this,e),!0},teardown:function(){var e
if(!b.documentMode)return!1;(e=ae.get(this,t)-1)?ae.set(this,t,e):(this.removeEventListener(t,n),ae.remove(this,t))},_default:function(t){return ae.get(t.target,e)},delegateType:t},S.event.special[t]={setup:function(){var i=this.ownerDocument||this.document||this,o=b.documentMode?this:i,s=ae.get(o,t)
s||(b.documentMode?this.addEventListener(t,n):i.addEventListener(e,n,!0)),ae.set(o,t,(s||0)+1)},teardown:function(){var i=this.ownerDocument||this.document||this,o=b.documentMode?this:i,s=ae.get(o,t)-1
s?ae.set(o,t,s):(b.documentMode?this.removeEventListener(t,n):i.removeEventListener(e,n,!0),ae.remove(o,t))}}})),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){S.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=e.relatedTarget,o=e.handleObj
return i&&(i===this||S.contains(this,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}})),S.fn.extend({on:function(e,t,n,i){return je(this,e,t,n,i)},one:function(e,t,n,i){return je(this,e,t,n,i,1)},off:function(e,t,n){var i,o
if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,S(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this
if("object"==typeof e){for(o in e)this.off(o,t,e[o])
return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ne),this.each((function(){S.event.remove(this,e,n,t)}))}})
var He=/<script|<style|<link/i,qe=/checked\s*(?:[^=]|=\s*.checked.)/i,Re=/^\s*<!\[CDATA\[|\]\]>\s*$/g
function Be(e,t){return C(e,"table")&&C(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function Fe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function We(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function ze(e,t){var n,i,o,s,r,a
if(1===t.nodeType){if(ae.hasData(e)&&(a=ae.get(e).events))for(o in ae.remove(t,"handle events"),a)for(n=0,i=a[o].length;n<i;n++)S.event.add(t,o,a[o][n])
le.hasData(e)&&(s=le.access(e),r=S.extend({},s),le.set(t,r))}}function Ue(e,t){var n=t.nodeName.toLowerCase()
"input"===n&&Se.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Xe(e,t,n,i){t=l(t)
var o,s,r,a,c,d,u=0,p=e.length,h=p-1,f=t[0],g=v(f)
if(g||p>1&&"string"==typeof f&&!m.checkClone&&qe.test(f))return e.each((function(o){var s=e.eq(o)
g&&(t[0]=f.call(this,o,s.html())),Xe(s,t,n,i)}))
if(p&&(s=(o=Pe(t,e[0].ownerDocument,!1,e,i)).firstChild,1===o.childNodes.length&&(o=s),s||i)){for(a=(r=S.map(Le(o,"script"),Fe)).length;u<p;u++)c=o,u!==h&&(c=S.clone(c,!0,!0),a&&S.merge(r,Le(c,"script"))),n.call(e[u],c,u)
if(a)for(d=r[r.length-1].ownerDocument,S.map(r,We),u=0;u<a;u++)c=r[u],Ce.test(c.type||"")&&!ae.access(c,"globalEval")&&S.contains(d,c)&&(c.src&&"module"!==(c.type||"").toLowerCase()?S._evalUrl&&!c.noModule&&S._evalUrl(c.src,{nonce:c.nonce||c.getAttribute("nonce")},d):_(c.textContent.replace(Re,""),c,d))}return e}function Ve(e,t,n){for(var i,o=t?S.filter(t,e):e,s=0;null!=(i=o[s]);s++)n||1!==i.nodeType||S.cleanData(Le(i)),i.parentNode&&(n&&me(i)&&$e(Le(i,"script")),i.parentNode.removeChild(i))
return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var i,o,s,r,a=e.cloneNode(!0),l=me(e)
if(!(m.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(r=Le(a),i=0,o=(s=Le(e)).length;i<o;i++)Ue(s[i],r[i])
if(t)if(n)for(s=s||Le(e),r=r||Le(a),i=0,o=s.length;i<o;i++)ze(s[i],r[i])
else ze(e,a)
return(r=Le(a,"script")).length>0&&$e(r,!l&&Le(e,"script")),a},cleanData:function(e){for(var t,n,i,o=S.event.special,s=0;void 0!==(n=e[s]);s++)if(se(n)){if(t=n[ae.expando]){if(t.events)for(i in t.events)o[i]?S.event.remove(n,i):S.removeEvent(n,i,t.handle)
n[ae.expando]=void 0}n[le.expando]&&(n[le.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Ve(this,e,!0)},remove:function(e){return Ve(this,e)},text:function(e){return ee(this,(function(e){return void 0===e?S.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return Xe(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Be(this,e).appendChild(e)}))},prepend:function(){return Xe(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Be(this,e)
t.insertBefore(e,t.firstChild)}}))},before:function(){return Xe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return Xe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(Le(e,!1)),e.textContent="")
return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return S.clone(this,e,t)}))},html:function(e){return ee(this,(function(e){var t=this[0]||{},n=0,i=this.length
if(void 0===e&&1===t.nodeType)return t.innerHTML
if("string"==typeof e&&!He.test(e)&&!Ae[(Ee.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e)
try{for(;n<i;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(Le(t,!1)),t.innerHTML=e)
t=0}catch(e){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[]
return Xe(this,arguments,(function(t){var n=this.parentNode
S.inArray(this,e)<0&&(S.cleanData(Le(this)),n&&n.replaceChild(t,this))}),e)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){S.fn[e]=function(e){for(var n,i=[],o=S(e),s=o.length-1,r=0;r<=s;r++)n=r===s?this:this.clone(!0),S(o[r])[t](n),c.apply(i,n.get())
return this.pushStack(i)}}))
var Ye=new RegExp("^("+pe+")(?!px)[a-z%]+$","i"),Ge=/^--/,Ke=function(e){var t=e.ownerDocument.defaultView
return t&&t.opener||(t=i),t.getComputedStyle(e)},Qe=function(e,t,n){var i,o,s={}
for(o in t)s[o]=e.style[o],e.style[o]=t[o]
for(o in i=n.call(e),t)e.style[o]=s[o]
return i},Je=new RegExp(fe.join("|"),"i")
function Ze(e,t,n){var i,o,s,r,a=Ge.test(t),l=e.style
return(n=n||Ke(e))&&(r=n.getPropertyValue(t)||n[t],a&&r&&(r=r.replace(P,"$1")||void 0),""!==r||me(e)||(r=S.style(e,t)),!m.pixelBoxStyles()&&Ye.test(r)&&Je.test(t)&&(i=l.width,o=l.minWidth,s=l.maxWidth,l.minWidth=l.maxWidth=l.width=r,r=n.width,l.width=i,l.minWidth=o,l.maxWidth=s)),void 0!==r?r+"":r}function et(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments)
delete this.get}}}!function(){function e(){if(d){c.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",d.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ge.appendChild(c).appendChild(d)
var e=i.getComputedStyle(d)
n="1%"!==e.top,l=12===t(e.marginLeft),d.style.right="60%",r=36===t(e.right),o=36===t(e.width),d.style.position="absolute",s=12===t(d.offsetWidth/3),ge.removeChild(c),d=null}}function t(e){return Math.round(parseFloat(e))}var n,o,s,r,a,l,c=b.createElement("div"),d=b.createElement("div")
d.style&&(d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",m.clearCloneStyle="content-box"===d.style.backgroundClip,S.extend(m,{boxSizingReliable:function(){return e(),o},pixelBoxStyles:function(){return e(),r},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),l},scrollboxSize:function(){return e(),s},reliableTrDimensions:function(){var e,t,n,o
return null==a&&(e=b.createElement("table"),t=b.createElement("tr"),n=b.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="box-sizing:content-box;border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",ge.appendChild(e).appendChild(t).appendChild(n),o=i.getComputedStyle(t),a=parseInt(o.height,10)+parseInt(o.borderTopWidth,10)+parseInt(o.borderBottomWidth,10)===t.offsetHeight,ge.removeChild(e)),a}}))}()
var tt=["Webkit","Moz","ms"],nt=b.createElement("div").style,it={}
function ot(e){var t=S.cssProps[e]||it[e]
return t||(e in nt?e:it[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=tt.length;n--;)if((e=tt[n]+t)in nt)return e}(e)||e)}var st=/^(none|table(?!-c[ea]).+)/,rt={position:"absolute",visibility:"hidden",display:"block"},at={letterSpacing:"0",fontWeight:"400"}
function lt(e,t,n){var i=he.exec(t)
return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):t}function ct(e,t,n,i,o,s){var r="width"===t?1:0,a=0,l=0,c=0
if(n===(i?"border":"content"))return 0
for(;r<4;r+=2)"margin"===n&&(c+=S.css(e,n+fe[r],!0,o)),i?("content"===n&&(l-=S.css(e,"padding"+fe[r],!0,o)),"margin"!==n&&(l-=S.css(e,"border"+fe[r]+"Width",!0,o))):(l+=S.css(e,"padding"+fe[r],!0,o),"padding"!==n?l+=S.css(e,"border"+fe[r]+"Width",!0,o):a+=S.css(e,"border"+fe[r]+"Width",!0,o))
return!i&&s>=0&&(l+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-s-l-a-.5))||0),l+c}function dt(e,t,n){var i=Ke(e),o=(!m.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=o,r=Ze(e,t,i),a="offset"+t[0].toUpperCase()+t.slice(1)
if(Ye.test(r)){if(!n)return r
r="auto"}return(!m.boxSizingReliable()&&o||!m.reliableTrDimensions()&&C(e,"tr")||"auto"===r||!parseFloat(r)&&"inline"===S.css(e,"display",!1,i))&&e.getClientRects().length&&(o="border-box"===S.css(e,"boxSizing",!1,i),(s=a in e)&&(r=e[a])),(r=parseFloat(r)||0)+ct(e,t,n||(o?"border":"content"),s,i,r)+"px"}function ut(e,t,n,i,o){return new ut.prototype.init(e,t,n,i,o)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ze(e,"opacity")
return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,s,r,a=oe(t),l=Ge.test(t),c=e.style
if(l||(t=ot(a)),r=S.cssHooks[t]||S.cssHooks[a],void 0===n)return r&&"get"in r&&void 0!==(o=r.get(e,!1,i))?o:c[t]
"string"===(s=typeof n)&&(o=he.exec(n))&&o[1]&&(n=be(e,t,o),s="number"),null!=n&&n==n&&("number"!==s||l||(n+=o&&o[3]||(S.cssNumber[a]?"":"px")),m.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),r&&"set"in r&&void 0===(n=r.set(e,n,i))||(l?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,i){var o,s,r,a=oe(t)
return Ge.test(t)||(t=ot(a)),(r=S.cssHooks[t]||S.cssHooks[a])&&"get"in r&&(o=r.get(e,!0,n)),void 0===o&&(o=Ze(e,t,i)),"normal"===o&&t in at&&(o=at[t]),""===n||n?(s=parseFloat(o),!0===n||isFinite(s)?s||0:o):o}}),S.each(["height","width"],(function(e,t){S.cssHooks[t]={get:function(e,n,i){if(n)return!st.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?dt(e,t,i):Qe(e,rt,(function(){return dt(e,t,i)}))},set:function(e,n,i){var o,s=Ke(e),r=!m.scrollboxSize()&&"absolute"===s.position,a=(r||i)&&"border-box"===S.css(e,"boxSizing",!1,s),l=i?ct(e,t,i,a,s):0
return a&&r&&(l-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(s[t])-ct(e,t,"border",!1,s)-.5)),l&&(o=he.exec(n))&&"px"!==(o[3]||"px")&&(e.style[t]=n,n=S.css(e,t)),lt(0,n,l)}}})),S.cssHooks.marginLeft=et(m.reliableMarginLeft,(function(e,t){if(t)return(parseFloat(Ze(e,"marginLeft"))||e.getBoundingClientRect().left-Qe(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),S.each({margin:"",padding:"",border:"Width"},(function(e,t){S.cssHooks[e+t]={expand:function(n){for(var i=0,o={},s="string"==typeof n?n.split(" "):[n];i<4;i++)o[e+fe[i]+t]=s[i]||s[i-2]||s[0]
return o}},"margin"!==e&&(S.cssHooks[e+t].set=lt)})),S.fn.extend({css:function(e,t){return ee(this,(function(e,t,n){var i,o,s={},r=0
if(Array.isArray(t)){for(i=Ke(e),o=t.length;r<o;r++)s[t[r]]=S.css(e,t[r],!1,i)
return s}return void 0!==n?S.style(e,t,n):S.css(e,t)}),e,t,arguments.length>1)}}),S.Tween=ut,ut.prototype={constructor:ut,init:function(e,t,n,i,o,s){this.elem=e,this.prop=n,this.easing=o||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=s||(S.cssNumber[n]?"":"px")},cur:function(){var e=ut.propHooks[this.prop]
return e&&e.get?e.get(this):ut.propHooks._default.get(this)},run:function(e){var t,n=ut.propHooks[this.prop]
return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):ut.propHooks._default.set(this),this}},ut.prototype.init.prototype=ut.prototype,ut.propHooks={_default:{get:function(e){var t
return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[ot(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}},ut.propHooks.scrollTop=ut.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=ut.prototype.init,S.fx.step={}
var pt,ht,ft=/^(?:toggle|show|hide)$/,gt=/queueHooks$/
function mt(){ht&&(!1===b.hidden&&i.requestAnimationFrame?i.requestAnimationFrame(mt):i.setTimeout(mt,S.fx.interval),S.fx.tick())}function vt(){return i.setTimeout((function(){pt=void 0})),pt=Date.now()}function yt(e,t){var n,i=0,o={height:e}
for(t=t?1:0;i<4;i+=2-t)o["margin"+(n=fe[i])]=o["padding"+n]=e
return t&&(o.opacity=o.width=e),o}function bt(e,t,n){for(var i,o=(wt.tweeners[t]||[]).concat(wt.tweeners["*"]),s=0,r=o.length;s<r;s++)if(i=o[s].call(n,t,e))return i}function wt(e,t,n){var i,o,s=0,r=wt.prefilters.length,a=S.Deferred().always((function(){delete l.elem})),l=function(){if(o)return!1
for(var t=pt||vt(),n=Math.max(0,c.startTime+c.duration-t),i=1-(n/c.duration||0),s=0,r=c.tweens.length;s<r;s++)c.tweens[s].run(i)
return a.notifyWith(e,[c,i,n]),i<1&&r?n:(r||a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:S.extend({},t),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},n),originalProperties:t,originalOptions:n,startTime:pt||vt(),duration:n.duration,tweens:[],createTween:function(t,n){var i=S.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing)
return c.tweens.push(i),i},stop:function(t){var n=0,i=t?c.tweens.length:0
if(o)return this
for(o=!0;n<i;n++)c.tweens[n].run(1)
return t?(a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c,t])):a.rejectWith(e,[c,t]),this}}),d=c.props
for(!function(e,t){var n,i,o,s,r
for(n in e)if(o=t[i=oe(n)],s=e[n],Array.isArray(s)&&(o=s[1],s=e[n]=s[0]),n!==i&&(e[i]=s,delete e[n]),(r=S.cssHooks[i])&&"expand"in r)for(n in s=r.expand(s),delete e[i],s)n in e||(e[n]=s[n],t[n]=o)
else t[i]=o}(d,c.opts.specialEasing);s<r;s++)if(i=wt.prefilters[s].call(c,e,d,c.opts))return v(i.stop)&&(S._queueHooks(c.elem,c.opts.queue).stop=i.stop.bind(i)),i
return S.map(d,bt,c),v(c.opts.start)&&c.opts.start.call(e,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),S.fx.timer(S.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c}S.Animation=S.extend(wt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t)
return be(n.elem,e,he.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(V)
for(var n,i=0,o=e.length;i<o;i++)n=e[i],wt.tweeners[n]=wt.tweeners[n]||[],wt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var i,o,s,r,a,l,c,d,u="width"in t||"height"in t,p=this,h={},f=e.style,g=e.nodeType&&ye(e),m=ae.get(e,"fxshow")
for(i in n.queue||(null==(r=S._queueHooks(e,"fx")).unqueued&&(r.unqueued=0,a=r.empty.fire,r.empty.fire=function(){r.unqueued||a()}),r.unqueued++,p.always((function(){p.always((function(){r.unqueued--,S.queue(e,"fx").length||r.empty.fire()}))}))),t)if(o=t[i],ft.test(o)){if(delete t[i],s=s||"toggle"===o,o===(g?"hide":"show")){if("show"!==o||!m||void 0===m[i])continue
g=!0}h[i]=m&&m[i]||S.style(e,i)}if((l=!S.isEmptyObject(t))||!S.isEmptyObject(h))for(i in u&&1===e.nodeType&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],null==(c=m&&m.display)&&(c=ae.get(e,"display")),"none"===(d=S.css(e,"display"))&&(c?d=c:(xe([e],!0),c=e.style.display||c,d=S.css(e,"display"),xe([e]))),("inline"===d||"inline-block"===d&&null!=c)&&"none"===S.css(e,"float")&&(l||(p.done((function(){f.display=c})),null==c&&(d=f.display,c="none"===d?"":d)),f.display="inline-block")),n.overflow&&(f.overflow="hidden",p.always((function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]}))),l=!1,h)l||(m?"hidden"in m&&(g=m.hidden):m=ae.access(e,"fxshow",{display:c}),s&&(m.hidden=!g),g&&xe([e],!0),p.done((function(){for(i in g||xe([e]),ae.remove(e,"fxshow"),h)S.style(e,i,h[i])}))),l=bt(g?m[i]:0,i,p),i in m||(m[i]=l.start,g&&(l.end=l.start,l.start=0))}],prefilter:function(e,t){t?wt.prefilters.unshift(e):wt.prefilters.push(e)}}),S.speed=function(e,t,n){var i=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t}
return S.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in S.fx.speeds?i.duration=S.fx.speeds[i.duration]:i.duration=S.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){v(i.old)&&i.old.call(this),i.queue&&S.dequeue(this,i.queue)},i},S.fn.extend({fadeTo:function(e,t,n,i){return this.filter(ye).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var o=S.isEmptyObject(e),s=S.speed(t,n,i),r=function(){var t=wt(this,S.extend({},e),s);(o||ae.get(this,"finish"))&&t.stop(!0)}
return r.finish=r,o||!1===s.queue?this.each(r):this.queue(s.queue,r)},stop:function(e,t,n){var i=function(e){var t=e.stop
delete e.stop,t(n)}
return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each((function(){var t=!0,o=null!=e&&e+"queueHooks",s=S.timers,r=ae.get(this)
if(o)r[o]&&r[o].stop&&i(r[o])
else for(o in r)r[o]&&r[o].stop&&gt.test(o)&&i(r[o])
for(o=s.length;o--;)s[o].elem!==this||null!=e&&s[o].queue!==e||(s[o].anim.stop(n),t=!1,s.splice(o,1))
!t&&n||S.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=ae.get(this),i=n[e+"queue"],o=n[e+"queueHooks"],s=S.timers,r=i?i.length:0
for(n.finish=!0,S.queue(this,e,[]),o&&o.stop&&o.stop.call(this,!0),t=s.length;t--;)s[t].elem===this&&s[t].queue===e&&(s[t].anim.stop(!0),s.splice(t,1))
for(t=0;t<r;t++)i[t]&&i[t].finish&&i[t].finish.call(this)
delete n.finish}))}}),S.each(["toggle","show","hide"],(function(e,t){var n=S.fn[t]
S.fn[t]=function(e,i,o){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(yt(t,!0),e,i,o)}})),S.each({slideDown:yt("show"),slideUp:yt("hide"),slideToggle:yt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){S.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}})),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers
for(pt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1)
n.length||S.fx.stop(),pt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){ht||(ht=!0,mt())},S.fx.stop=function(){ht=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(e,t){return e=S.fx&&S.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,n){var o=i.setTimeout(t,e)
n.stop=function(){i.clearTimeout(o)}}))},function(){var e=b.createElement("input"),t=b.createElement("select").appendChild(b.createElement("option"))
e.type="checkbox",m.checkOn=""!==e.value,m.optSelected=t.selected,(e=b.createElement("input")).value="t",e.type="radio",m.radioValue="t"===e.value}()
var _t,xt=S.expr.attrHandle
S.fn.extend({attr:function(e,t){return ee(this,S.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){S.removeAttr(this,e)}))}}),S.extend({attr:function(e,t,n){var i,o,s=e.nodeType
if(3!==s&&8!==s&&2!==s)return void 0===e.getAttribute?S.prop(e,t,n):(1===s&&S.isXMLDoc(e)||(o=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?_t:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):o&&"set"in o&&void 0!==(i=o.set(e,n,t))?i:(e.setAttribute(t,n+""),n):o&&"get"in o&&null!==(i=o.get(e,t))?i:null==(i=S.find.attr(e,t))?void 0:i)},attrHooks:{type:{set:function(e,t){if(!m.radioValue&&"radio"===t&&C(e,"input")){var n=e.value
return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i=0,o=t&&t.match(V)
if(o&&1===e.nodeType)for(;n=o[i++];)e.removeAttribute(n)}}),_t={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=xt[t]||S.find.attr
xt[t]=function(e,t,i){var o,s,r=t.toLowerCase()
return i||(s=xt[r],xt[r]=o,o=null!=n(e,t,i)?r:null,xt[r]=s),o}}))
var Tt=/^(?:input|select|textarea|button)$/i,kt=/^(?:a|area)$/i
function St(e){return(e.match(V)||[]).join(" ")}function Et(e){return e.getAttribute&&e.getAttribute("class")||""}function Ct(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(V)||[]}S.fn.extend({prop:function(e,t){return ee(this,S.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[S.propFix[e]||e]}))}}),S.extend({prop:function(e,t,n){var i,o,s=e.nodeType
if(3!==s&&8!==s&&2!==s)return 1===s&&S.isXMLDoc(e)||(t=S.propFix[t]||t,o=S.propHooks[t]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(e,n,t))?i:e[t]=n:o&&"get"in o&&null!==(i=o.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex")
return t?parseInt(t,10):Tt.test(e.nodeName)||kt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),m.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode
return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode
t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){S.propFix[this.toLowerCase()]=this})),S.fn.extend({addClass:function(e){var t,n,i,o,s,r
return v(e)?this.each((function(t){S(this).addClass(e.call(this,t,Et(this)))})):(t=Ct(e)).length?this.each((function(){if(i=Et(this),n=1===this.nodeType&&" "+St(i)+" "){for(s=0;s<t.length;s++)o=t[s],n.indexOf(" "+o+" ")<0&&(n+=o+" ")
r=St(n),i!==r&&this.setAttribute("class",r)}})):this},removeClass:function(e){var t,n,i,o,s,r
return v(e)?this.each((function(t){S(this).removeClass(e.call(this,t,Et(this)))})):arguments.length?(t=Ct(e)).length?this.each((function(){if(i=Et(this),n=1===this.nodeType&&" "+St(i)+" "){for(s=0;s<t.length;s++)for(o=t[s];n.indexOf(" "+o+" ")>-1;)n=n.replace(" "+o+" "," ")
r=St(n),i!==r&&this.setAttribute("class",r)}})):this:this.attr("class","")},toggleClass:function(e,t){var n,i,o,s,r=typeof e,a="string"===r||Array.isArray(e)
return v(e)?this.each((function(n){S(this).toggleClass(e.call(this,n,Et(this),t),t)})):"boolean"==typeof t&&a?t?this.addClass(e):this.removeClass(e):(n=Ct(e),this.each((function(){if(a)for(s=S(this),o=0;o<n.length;o++)i=n[o],s.hasClass(i)?s.removeClass(i):s.addClass(i)
else void 0!==e&&"boolean"!==r||((i=Et(this))&&ae.set(this,"__className__",i),this.setAttribute&&this.setAttribute("class",i||!1===e?"":ae.get(this,"__className__")||""))})))},hasClass:function(e){var t,n,i=0
for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+St(Et(n))+" ").indexOf(t)>-1)return!0
return!1}})
var At=/\r/g
S.fn.extend({val:function(e){var t,n,i,o=this[0]
return arguments.length?(i=v(e),this.each((function(n){var o
1===this.nodeType&&(null==(o=i?e.call(this,n,S(this).val()):e)?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=S.map(o,(function(e){return null==e?"":e+""}))),(t=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,o,"value")||(this.value=o))}))):o?(t=S.valHooks[o.type]||S.valHooks[o.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(o,"value"))?n:"string"==typeof(n=o.value)?n.replace(At,""):null==n?"":n:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value")
return null!=t?t:St(S.text(e))}},select:{get:function(e){var t,n,i,o=e.options,s=e.selectedIndex,r="select-one"===e.type,a=r?null:[],l=r?s+1:o.length
for(i=s<0?l:r?s:0;i<l;i++)if(((n=o[i]).selected||i===s)&&!n.disabled&&(!n.parentNode.disabled||!C(n.parentNode,"optgroup"))){if(t=S(n).val(),r)return t
a.push(t)}return a},set:function(e,t){for(var n,i,o=e.options,s=S.makeArray(t),r=o.length;r--;)((i=o[r]).selected=S.inArray(S.valHooks.option.get(i),s)>-1)&&(n=!0)
return n||(e.selectedIndex=-1),s}}}}),S.each(["radio","checkbox"],(function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=S.inArray(S(e).val(),t)>-1}},m.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}))
var Lt=i.location,$t={guid:Date.now()},Ot=/\?/
S.parseXML=function(e){var t,n
if(!e||"string"!=typeof e)return null
try{t=(new i.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,(function(e){return e.textContent})).join("\n"):e)),t}
var Pt=/^(?:focusinfocus|focusoutblur)$/,Dt=function(e){e.stopPropagation()}
S.extend(S.event,{trigger:function(e,t,n,o){var s,r,a,l,c,d,u,p,f=[n||b],g=h.call(e,"type")?e.type:e,m=h.call(e,"namespace")?e.namespace.split("."):[]
if(r=p=a=n=n||b,3!==n.nodeType&&8!==n.nodeType&&!Pt.test(g+S.event.triggered)&&(g.indexOf(".")>-1&&(m=g.split("."),g=m.shift(),m.sort()),c=g.indexOf(":")<0&&"on"+g,(e=e[S.expando]?e:new S.Event(g,"object"==typeof e&&e)).isTrigger=o?2:3,e.namespace=m.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),u=S.event.special[g]||{},o||!u.trigger||!1!==u.trigger.apply(n,t))){if(!o&&!u.noBubble&&!y(n)){for(l=u.delegateType||g,Pt.test(l+g)||(r=r.parentNode);r;r=r.parentNode)f.push(r),a=r
a===(n.ownerDocument||b)&&f.push(a.defaultView||a.parentWindow||i)}for(s=0;(r=f[s++])&&!e.isPropagationStopped();)p=r,e.type=s>1?l:u.bindType||g,(d=(ae.get(r,"events")||Object.create(null))[e.type]&&ae.get(r,"handle"))&&d.apply(r,t),(d=c&&r[c])&&d.apply&&se(r)&&(e.result=d.apply(r,t),!1===e.result&&e.preventDefault())
return e.type=g,o||e.isDefaultPrevented()||u._default&&!1!==u._default.apply(f.pop(),t)||!se(n)||c&&v(n[g])&&!y(n)&&((a=n[c])&&(n[c]=null),S.event.triggered=g,e.isPropagationStopped()&&p.addEventListener(g,Dt),n[g](),e.isPropagationStopped()&&p.removeEventListener(g,Dt),S.event.triggered=void 0,a&&(n[c]=a)),e.result}},simulate:function(e,t,n){var i=S.extend(new S.Event,n,{type:e,isSimulated:!0})
S.event.trigger(i,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each((function(){S.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0]
if(n)return S.event.trigger(e,t,n,!0)}})
var Mt=/\[\]$/,Nt=/\r?\n/g,jt=/^(?:submit|button|image|reset|file)$/i,It=/^(?:input|select|textarea|keygen)/i
function Ht(e,t,n,i){var o
if(Array.isArray(t))S.each(t,(function(t,o){n||Mt.test(e)?i(e,o):Ht(e+"["+("object"==typeof o&&null!=o?t:"")+"]",o,n,i)}))
else if(n||"object"!==x(t))i(e,t)
else for(o in t)Ht(e+"["+o+"]",t[o],n,i)}S.param=function(e,t){var n,i=[],o=function(e,t){var n=v(t)?t():t
i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)}
if(null==e)return""
if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,(function(){o(this.name,this.value)}))
else for(n in e)Ht(n,e[n],t,o)
return i.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=S.prop(this,"elements")
return e?S.makeArray(e):this})).filter((function(){var e=this.type
return this.name&&!S(this).is(":disabled")&&It.test(this.nodeName)&&!jt.test(e)&&(this.checked||!Se.test(e))})).map((function(e,t){var n=S(this).val()
return null==n?null:Array.isArray(n)?S.map(n,(function(e){return{name:t.name,value:e.replace(Nt,"\r\n")}})):{name:t.name,value:n.replace(Nt,"\r\n")}})).get()}})
var qt=/%20/g,Rt=/#.*$/,Bt=/([?&])_=[^&]*/,Ft=/^(.*?):[ \t]*([^\r\n]*)$/gm,Wt=/^(?:GET|HEAD)$/,zt=/^\/\//,Ut={},Xt={},Vt="*/".concat("*"),Yt=b.createElement("a")
function Gt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*")
var i,o=0,s=t.toLowerCase().match(V)||[]
if(v(n))for(;i=s[o++];)"+"===i[0]?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function Kt(e,t,n,i){var o={},s=e===Xt
function r(a){var l
return o[a]=!0,S.each(e[a]||[],(function(e,a){var c=a(t,n,i)
return"string"!=typeof c||s||o[c]?s?!(l=c):void 0:(t.dataTypes.unshift(c),r(c),!1)})),l}return r(t.dataTypes[0])||!o["*"]&&r("*")}function Qt(e,t){var n,i,o=S.ajaxSettings.flatOptions||{}
for(n in t)void 0!==t[n]&&((o[n]?e:i||(i={}))[n]=t[n])
return i&&S.extend(!0,e,i),e}Yt.href=Lt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Lt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Lt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Vt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Qt(Qt(e,S.ajaxSettings),t):Qt(S.ajaxSettings,e)},ajaxPrefilter:Gt(Ut),ajaxTransport:Gt(Xt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{}
var n,o,s,r,a,l,c,d,u,p,h=S.ajaxSetup({},t),f=h.context||h,g=h.context&&(f.nodeType||f.jquery)?S(f):S.event,m=S.Deferred(),v=S.Callbacks("once memory"),y=h.statusCode||{},w={},_={},x="canceled",T={readyState:0,getResponseHeader:function(e){var t
if(c){if(!r)for(r={};t=Ft.exec(s);)r[t[1].toLowerCase()+" "]=(r[t[1].toLowerCase()+" "]||[]).concat(t[2])
t=r[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return c?s:null},setRequestHeader:function(e,t){return null==c&&(e=_[e.toLowerCase()]=_[e.toLowerCase()]||e,w[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t
if(e)if(c)T.always(e[T.status])
else for(t in e)y[t]=[y[t],e[t]]
return this},abort:function(e){var t=e||x
return n&&n.abort(t),k(0,t),this}}
if(m.promise(T),h.url=((e||h.url||Lt.href)+"").replace(zt,Lt.protocol+"//"),h.type=t.method||t.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(V)||[""],null==h.crossDomain){l=b.createElement("a")
try{l.href=h.url,l.href=l.href,h.crossDomain=Yt.protocol+"//"+Yt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=S.param(h.data,h.traditional)),Kt(Ut,h,t,T),c)return T
for(u in(d=S.event&&h.global)&&0==S.active++&&S.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Wt.test(h.type),o=h.url.replace(Rt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(p=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(Ot.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Bt,"$1"),p=(Ot.test(o)?"&":"?")+"_="+$t.guid+++p),h.url=o+p),h.ifModified&&(S.lastModified[o]&&T.setRequestHeader("If-Modified-Since",S.lastModified[o]),S.etag[o]&&T.setRequestHeader("If-None-Match",S.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||t.contentType)&&T.setRequestHeader("Content-Type",h.contentType),T.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Vt+"; q=0.01":""):h.accepts["*"]),h.headers)T.setRequestHeader(u,h.headers[u])
if(h.beforeSend&&(!1===h.beforeSend.call(f,T,h)||c))return T.abort()
if(x="abort",v.add(h.complete),T.done(h.success),T.fail(h.error),n=Kt(Xt,h,t,T)){if(T.readyState=1,d&&g.trigger("ajaxSend",[T,h]),c)return T
h.async&&h.timeout>0&&(a=i.setTimeout((function(){T.abort("timeout")}),h.timeout))
try{c=!1,n.send(w,k)}catch(e){if(c)throw e
k(-1,e)}}else k(-1,"No Transport")
function k(e,t,r,l){var u,p,b,w,_,x=t
c||(c=!0,a&&i.clearTimeout(a),n=void 0,s=l||"",T.readyState=e>0?4:0,u=e>=200&&e<300||304===e,r&&(w=function(e,t,n){for(var i,o,s,r,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"))
if(i)for(o in a)if(a[o]&&a[o].test(i)){l.unshift(o)
break}if(l[0]in n)s=l[0]
else{for(o in n){if(!l[0]||e.converters[o+" "+l[0]]){s=o
break}r||(r=o)}s=s||r}if(s)return s!==l[0]&&l.unshift(s),n[s]}(h,T,r)),!u&&S.inArray("script",h.dataTypes)>-1&&S.inArray("json",h.dataTypes)<0&&(h.converters["text script"]=function(){}),w=function(e,t,n,i){var o,s,r,a,l,c={},d=e.dataTypes.slice()
if(d[1])for(r in e.converters)c[r.toLowerCase()]=e.converters[r]
for(s=d.shift();s;)if(e.responseFields[s]&&(n[e.responseFields[s]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=s,s=d.shift())if("*"===s)s=l
else if("*"!==l&&l!==s){if(!(r=c[l+" "+s]||c["* "+s]))for(o in c)if((a=o.split(" "))[1]===s&&(r=c[l+" "+a[0]]||c["* "+a[0]])){!0===r?r=c[o]:!0!==c[o]&&(s=a[0],d.unshift(a[1]))
break}if(!0!==r)if(r&&e.throws)t=r(t)
else try{t=r(t)}catch(e){return{state:"parsererror",error:r?e:"No conversion from "+l+" to "+s}}}return{state:"success",data:t}}(h,w,T,u),u?(h.ifModified&&((_=T.getResponseHeader("Last-Modified"))&&(S.lastModified[o]=_),(_=T.getResponseHeader("etag"))&&(S.etag[o]=_)),204===e||"HEAD"===h.type?x="nocontent":304===e?x="notmodified":(x=w.state,p=w.data,u=!(b=w.error))):(b=x,!e&&x||(x="error",e<0&&(e=0))),T.status=e,T.statusText=(t||x)+"",u?m.resolveWith(f,[p,x,T]):m.rejectWith(f,[T,x,b]),T.statusCode(y),y=void 0,d&&g.trigger(u?"ajaxSuccess":"ajaxError",[T,h,u?p:b]),v.fireWith(f,[T,x]),d&&(g.trigger("ajaxComplete",[T,h]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],(function(e,t){S[t]=function(e,n,i,o){return v(n)&&(o=o||i,i=n,n=void 0),S.ajax(S.extend({url:e,type:t,dataType:o,data:n,success:i},S.isPlainObject(e)&&e))}})),S.ajaxPrefilter((function(e){var t
for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t
return this[0]&&(v(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild
return e})).append(this)),this},wrapInner:function(e){return v(e)?this.each((function(t){S(this).wrapInner(e.call(this,t))})):this.each((function(){var t=S(this),n=t.contents()
n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=v(e)
return this.each((function(n){S(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){S(this).replaceWith(this.childNodes)})),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new i.XMLHttpRequest}catch(e){}}
var Jt={0:200,1223:204},Zt=S.ajaxSettings.xhr()
m.cors=!!Zt&&"withCredentials"in Zt,m.ajax=Zt=!!Zt,S.ajaxTransport((function(e){var t,n
if(m.cors||Zt&&!e.crossDomain)return{send:function(o,s){var r,a=e.xhr()
if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(r in e.xhrFields)a[r]=e.xhrFields[r]
for(r in e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||o["X-Requested-With"]||(o["X-Requested-With"]="XMLHttpRequest"),o)a.setRequestHeader(r,o[r])
t=function(e){return function(){t&&(t=n=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?s(0,"error"):s(a.status,a.statusText):s(Jt[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=t(),n=a.onerror=a.ontimeout=t("error"),void 0!==a.onabort?a.onabort=n:a.onreadystatechange=function(){4===a.readyState&&i.setTimeout((function(){t&&n()}))},t=t("abort")
try{a.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}})),S.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),S.ajaxTransport("script",(function(e){var t,n
if(e.crossDomain||e.scriptAttrs)return{send:function(i,o){t=S("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),b.head.appendChild(t[0])},abort:function(){n&&n()}}}))
var en,tn=[],nn=/(=)\?(?=&|$)|\?\?/
S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=tn.pop()||S.expando+"_"+$t.guid++
return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",(function(e,t,n){var o,s,r,a=!1!==e.jsonp&&(nn.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&nn.test(e.data)&&"data")
if(a||"jsonp"===e.dataTypes[0])return o=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(nn,"$1"+o):!1!==e.jsonp&&(e.url+=(Ot.test(e.url)?"&":"?")+e.jsonp+"="+o),e.converters["script json"]=function(){return r||S.error(o+" was not called"),r[0]},e.dataTypes[0]="json",s=i[o],i[o]=function(){r=arguments},n.always((function(){void 0===s?S(i).removeProp(o):i[o]=s,e[o]&&(e.jsonpCallback=t.jsonpCallback,tn.push(o)),r&&v(s)&&s(r[0]),r=s=void 0})),"script"})),m.createHTMLDocument=((en=b.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===en.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(m.createHTMLDocument?((i=(t=b.implementation.createHTMLDocument("")).createElement("base")).href=b.location.href,t.head.appendChild(i)):t=b),s=!n&&[],(o=R.exec(e))?[t.createElement(o[1])]:(o=Pe([e],t,s),s&&s.length&&S(s).remove(),S.merge([],o.childNodes)))
var i,o,s},S.fn.load=function(e,t,n){var i,o,s,r=this,a=e.indexOf(" ")
return a>-1&&(i=St(e.slice(a)),e=e.slice(0,a)),v(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),r.length>0&&S.ajax({url:e,type:o||"GET",dataType:"html",data:t}).done((function(e){s=arguments,r.html(i?S("<div>").append(S.parseHTML(e)).find(i):e)})).always(n&&function(e,t){r.each((function(){n.apply(this,s||[e.responseText,t,e])}))}),this},S.expr.pseudos.animated=function(e){return S.grep(S.timers,(function(t){return e===t.elem})).length},S.offset={setOffset:function(e,t,n){var i,o,s,r,a,l,c=S.css(e,"position"),d=S(e),u={}
"static"===c&&(e.style.position="relative"),a=d.offset(),s=S.css(e,"top"),l=S.css(e,"left"),("absolute"===c||"fixed"===c)&&(s+l).indexOf("auto")>-1?(r=(i=d.position()).top,o=i.left):(r=parseFloat(s)||0,o=parseFloat(l)||0),v(t)&&(t=t.call(e,n,S.extend({},a))),null!=t.top&&(u.top=t.top-a.top+r),null!=t.left&&(u.left=t.left-a.left+o),"using"in t?t.using.call(e,u):d.css(u)}},S.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){S.offset.setOffset(this,e,t)}))
var t,n,i=this[0]
return i?i.getClientRects().length?(t=i.getBoundingClientRect(),n=i.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,i=this[0],o={top:0,left:0}
if("fixed"===S.css(i,"position"))t=i.getBoundingClientRect()
else{for(t=this.offset(),n=i.ownerDocument,e=i.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position");)e=e.parentNode
e&&e!==i&&1===e.nodeType&&((o=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),o.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-o.top-S.css(i,"marginTop",!0),left:t.left-o.left-S.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent;e&&"static"===S.css(e,"position");)e=e.offsetParent
return e||ge}))}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var n="pageYOffset"===t
S.fn[e]=function(i){return ee(this,(function(e,i,o){var s
if(y(e)?s=e:9===e.nodeType&&(s=e.defaultView),void 0===o)return s?s[t]:e[i]
s?s.scrollTo(n?s.pageXOffset:o,n?o:s.pageYOffset):e[i]=o}),e,i,arguments.length)}})),S.each(["top","left"],(function(e,t){S.cssHooks[t]=et(m.pixelPosition,(function(e,n){if(n)return n=Ze(e,t),Ye.test(n)?S(e).position()[t]+"px":n}))})),S.each({Height:"height",Width:"width"},(function(e,t){S.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,i){S.fn[i]=function(o,s){var r=arguments.length&&(n||"boolean"!=typeof o),a=n||(!0===o||!0===s?"margin":"border")
return ee(this,(function(t,n,o){var s
return y(t)?0===i.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(s=t.documentElement,Math.max(t.body["scroll"+e],s["scroll"+e],t.body["offset"+e],s["offset"+e],s["client"+e])):void 0===o?S.css(t,n,a):S.style(t,n,o,a)}),t,r?o:void 0,r)}}))})),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){S.fn[t]=function(e){return this.on(t,e)}})),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){S.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}))
var on=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g
S.proxy=function(e,t){var n,i,o
if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return i=a.call(arguments,2),o=function(){return e.apply(t||this,i.concat(a.call(arguments)))},o.guid=e.guid=e.guid||S.guid++,o},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=C,S.isFunction=v,S.isWindow=y,S.camelCase=oe,S.type=x,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e)
return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(on,"$1")},void 0===(n=function(){return S}.apply(t,[]))||(e.exports=n)
var sn=i.jQuery,rn=i.$
return S.noConflict=function(e){return i.$===S&&(i.$=rn),e&&i.jQuery===S&&(i.jQuery=sn),S},void 0===o&&(i.jQuery=i.$=S),S}))},784:()=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".gs-toc"),t=document.querySelector(".microsite-menu"),n=document.querySelector("footer"),i=e?e.querySelectorAll('a[href^="#"]'):null,o=i?Array.from(i).map((e=>document.getElementById(e.getAttribute("href").slice(1)))).filter(Boolean):null
if(!e)return void console.warn("TOC-Script: Kein Element mit .gs-toc gefunden – Script abgebrochen.")
if(!t)return void console.warn("TOC-Script: Keine .microsite-menu Navigation gefunden – Script abgebrochen.")
if(!i.length||!o.length)return void console.warn("TOC-Script: TOC-Links oder Sections fehlen oder ungültig – Script abgebrochen.")
let s,r,a,l,c,d,u=!1,p=null,h=!1
function f(){try{const n=e.getBoundingClientRect(),i=t.getBoundingClientRect()
a=function(){const e=getComputedStyle(document.documentElement).getPropertyValue("--gs-toc-my").trim()||"0px"
return parseFloat(e)}(),r=i.height,s=n.top+window.scrollY,d=n.width,l=r+a,c=s-l,document.documentElement.style.setProperty("--gs-toc-offset",`${l}px`),document.documentElement.style.setProperty("--gs-toc-width",`${d}px`)}catch(e){throw console.error("TOC-Script initValues-Fehler:",e),e}}function g(){try{const e=t.getBoundingClientRect(),i=n?n.getBoundingClientRect().top:window.innerHeight,o=Math.min(window.innerHeight,i)-e.bottom-a
document.documentElement.style.setProperty("--gs-toc-max-height",`${Math.max(o,0)}px`)}catch(e){console.error("TOC-Script updateMaxHeight-Fehler:",e)}}function m(){try{g()
const t=window.scrollY
!u&&t>c?(e.classList.add("fixed"),u=!0):u&&t<=c&&(e.classList.remove("fixed"),u=!1)}catch(e){console.error("TOC-Script onScroll-Fehler:",e)}}function v(){try{p&&p.disconnect()
const e={root:null,rootMargin:`-${l}px 0px 0px 0px`,threshold:Array.from({length:101},((e,t)=>t/100))},t=new Map
p=new IntersectionObserver((e=>{try{e.forEach((e=>{e.intersectionRatio>0?t.set(e.target,e.intersectionRatio):t.delete(e.target)}))
let n=0,o=null
t.forEach(((e,t)=>{e>n&&(n=e,o=t)})),i.forEach((e=>{const t=o&&e.getAttribute("href").slice(1)===o.id
e.classList.toggle("active",t)}))}catch(e){console.error("TOC-Script Observer-Callback-Fehler:",e)}}),e),o.forEach((e=>p.observe(e)))}catch(e){console.error("TOC-Script setupObserver-Fehler:",e)}}function y(){try{window.innerWidth>=992?h?(f(),g(),m(),v()):function(){try{f(),g(),m(),v(),window.addEventListener("scroll",m,{passive:!0}),h=!0}catch(e){console.error("TOC-Script enable-Fehler:",e)}}():h&&(window.removeEventListener("scroll",m),p&&p.disconnect(),e.classList.remove("fixed"),i.forEach((e=>e.classList.remove("active"))),h=!1)}catch(e){console.error("TOC-Script checkEnable-Fehler:",e)}}try{y(),window.addEventListener("resize",(()=>{y()}))}catch(e){console.error("TOC-Script Initialisierung fehlgeschlagen:",e)}}))},890:()=>{!function(){try{var e,t,n,i=document.querySelector(".gs-left-sidebar")
if(!i)return void console.warn("[OffcanvasSidebar] Keine .gs-left-sidebar im DOM gefunden. Skript wird nicht ausgeführt.")
function o(){var n
i.dataset.offcanvas||(i.dataset.offcanvas="1",i.id="offcanvasSidebar",i.classList.add("offcanvas","offcanvas-start","opacity-100"),i.setAttribute("data-bs-backdrop","true"),i.setAttribute("data-bs-scroll","false"),(n=document.createElement("button")).type="button",n.className=["btn-close","btn-sm","position-absolute","top-0","end-0","p-2","m-2"].join(" "),n.setAttribute("data-bs-dismiss","offcanvas"),n.setAttribute("aria-label","Close"),n.style.zIndex="15",t=n,i.insertBefore(t,i.firstChild),e=function(){var e=document.createElement("button")
return e.type="button",e.className=["btn-pink","position-fixed","bottom-0","start-0","m-3"].join(" "),e.setAttribute("data-bs-toggle","offcanvas"),e.setAttribute("data-bs-target","#offcanvasSidebar"),e.setAttribute("aria-controls","offcanvasSidebar"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-label","Sidebar ein-/ausblenden"),e.style.zIndex="1030",e.innerHTML='<i class="bi-layout-text-sidebar p-0" aria-hidden="true"></i>',e}(),document.body.appendChild(e),i.addEventListener("show.bs.offcanvas",(function(){document.body.classList.add("blurred")})),i.addEventListener("hidden.bs.offcanvas",(function(){document.body.classList.remove("blurred")})))}function s(){window.innerWidth<992?o():i.dataset.offcanvas&&(delete i.dataset.offcanvas,i.removeAttribute("id"),i.classList.remove("offcanvas","offcanvas-start","opacity-100"),i.removeAttribute("data-bs-backdrop"),i.removeAttribute("data-bs-scroll"),t&&(t.remove(),t=null),e&&(e.remove(),e=null),document.body.classList.remove("blurred"))}window.addEventListener("resize",(function(){clearTimeout(n),n=setTimeout(s,150)})),document.addEventListener("DOMContentLoaded",s)}catch(r){console.error("[OffcanvasSidebar] Ein Fehler ist aufgetreten:",r)}}()}},s={}
function r(e){var t=s[e]
if(void 0!==t)return t.exports
var n=s[e]={exports:{}}
return o[e].call(n.exports,n,n.exports,r),n.exports}r.m=o,r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return r.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(n,i){if(1&i&&(n=this(n)),8&i)return n
if("object"==typeof n&&n){if(4&i&&n.__esModule)return n
if(16&i&&"function"==typeof n.then)return n}var o=Object.create(null)
r.r(o)
var s={}
e=e||[null,t({}),t([]),t(t)]
for(var a=2&i&&n;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>s[e]=()=>n[e]))
return s.default=()=>n,r.d(o,s),o},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>e+".js",r.miniCssF=e=>{},r.g=function(){if("object"==typeof globalThis)return globalThis
try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},i="@gesis-web/gesis-web-frontend:",r.l=(e,t,o,s)=>{if(n[e])n[e].push(t)
else{var a,l
if(void 0!==o)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d]
if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==i+o){a=u
break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",i+o),a.src=e),n[e]=[t]
var p=(t,i)=>{a.onerror=a.onload=null,clearTimeout(h)
var o=n[e]
if(delete n[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(i))),t)return t(i)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4)
a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),l&&document.head.appendChild(a)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e
r.g.importScripts&&(e=r.g.location+"")
var t=r.g.document
if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script")
if(n.length)for(var i=n.length-1;i>-1&&(!e||!/^http(s?):/.test(e));)e=n[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser")
e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={571:0}
r.f.j=(t,n)=>{var i=r.o(e,t)?e[t]:void 0
if(0!==i)if(i)n.push(i[2])
else{var o=new Promise(((n,o)=>i=e[t]=[n,o]))
n.push(i[2]=o)
var s=r.p+r.u(t),a=new Error
r.l(s,(n=>{if(r.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src
a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,i[1](a)}}),"chunk-"+t,t)}}
var t=(t,n)=>{var i,o,[s,a,l]=n,c=0
if(s.some((t=>0!==e[t]))){for(i in a)r.o(a,i)&&(r.m[i]=a[i])
if(l)l(r)}for(t&&t(n);c<s.length;c++)o=s[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0},n=self.webpackChunk_gesis_web_gesis_web_frontend=self.webpackChunk_gesis_web_gesis_web_frontend||[]
n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{"use strict"
r(414)
const e=function(...e){e.forEach((e=>e.classList.add("unfaded")))
document.getElementsByTagName("main")[0].classList.add("faded")},t=function(...e){e.forEach((e=>e.classList.remove("unfaded")))
document.getElementsByTagName("main")[0].classList.remove("faded")},n=function(e){const t=Array.from(document.getElementsByTagName("meta")).filter((t=>t.getAttribute("name")===e))
return!!t.length&&t[0].getAttribute("content")},i=function(){const e=document.querySelector("body > section")
if(e){const[t]=Array.from(e.classList).filter((e=>e.includes("microsite-identifier-"))).map((e=>e.replace("microsite-identifier-","")))
return t}},o=function(){return document.getElementsByTagName("html")[0].lang||"en"},s=function(e){const t=(e,n)=>e?t(e.previousElementSibling,n||e.localName)+(e.localName==n):1,n=e=>e&&1===e.nodeType?e.id&&document.getElementById(e.id)===e?[`id("${e.id}")`]:[...n(e.parentNode),`${e.localName.toLowerCase()}[${t(e)}]`]:[""]
return n(e).join("/")},a=Object.freeze({TAB:9,RETURN:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}),l='<i class="bi bi-caret-left-fill"></i>',c='<i class="bi bi-caret-right-fill"></i>',d=async function(){const e=(await r.e(408).then(r.bind(r,408))).default
return e.paginate.previous=l,e.paginate.next=c,e.aria.paginate={...e.aria.paginate,first:"first page",previous:"previous page",next:"next page",last:"last page",page:"page",tablepagination:"table pagination"},e},u=async function(){const e=(await r.e(66).then(r.bind(r,66))).default
return e.paginate.previous=l,e.paginate.next=c,e.aria.paginate={...e.aria.paginate,first:"erste Seite",previous:"vorherige Seite",next:"nächste Seite",last:"letzte Seite",page:"Seite",tablepagination:"Tabellen-Paginierung"},e},p=function(){const e=document.getElementsByClassName("skip-links")
for(const t of e)t.addEventListener("focusin",h),t.addEventListener("focusout",h)
const t=document.getElementById("skip-link-megamenu")
if(t){const e=t.getAttribute("aria-controls")
if(e){const n=window?.GesisWeb?.menubuttons
if(n){const i=n.find((t=>t.domNode.id===e))
i&&!i.getDisabled()&&t.addEventListener("click",(function(e){e.stopPropagation(),e.preventDefault(),i.popupMenu.open(),i.popupMenu.setFocusToFirstItem()}))}}}}
function h(e){const t=this,n=e.type
if("focusin"===n){const n=e.relatedTarget
t.contains(n)||t.setAttribute("aria-expanded","true")}else if("focusout"===n){const n=e.relatedTarget
t.contains(n)||t.setAttribute("aria-expanded","false")}}const f=9,g=13,m=27,v=38,y=40
r(784),r(473),r(890)
class b{constructor(e,t,n,i){this.domNode=e,this.controllerNode=t,this.onOpen=n||function(){},this.onClose=i||function(){},this.init()}init(){var e
this.domNode.setAttribute("aria-haspopup","listbox"),this.controllerNode.tabIndex=0,this.controllerNode.addEventListener("keydown",this.handleKeydown.bind(this)),this.controllerNode.addEventListener("mouseenter",this.handleMouseenter.bind(this)),this.controllerNode.addEventListener("mouseleave",this.handleMouseleave.bind(this)),this.controllerNode.addEventListener("click",this.handleClick.bind(this)),this.controllerNode.addEventListener("focusout",this.handleFocusChange.bind(this)),(e=this.domNode,Array.from(e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))).forEach((function(e,t){e.tabIndex=-1,e.setAttribute("role","option")}))}handleMouseenter(e){this.openPopup()}handleMouseleave(e){this.closePopup()}handleClick(e){this.isPopupOpen()?this.closePopup():this.openPopup()}handleFocusChange(e){var t=e.type,n=e.relatedTarget
"focusout"===t&&(this.controllerNode.contains(n)||this.closePopup())}isPopupOpen(){return"true"===this.controllerNode.getAttribute("aria-expanded")}openPopup(){this.controllerNode.setAttribute("aria-expanded","true"),this.onOpen()}closePopup(){this.controllerNode.setAttribute("aria-expanded","false"),this.onClose()}selectNextElement(){var e=Array.from(this.domNode.querySelectorAll('[role="option"]')),t=this.getCurrentlySelectedElement(),n=e.indexOf(t)
n<=-1?this.selectElement(e[0]):n===e.length-1?(this.unselectElement(t),this.selectElement(e[0])):(this.unselectElement(t),this.selectElement(e[n+1]))}selectPreviousElement(){var e=Array.from(this.domNode.querySelectorAll('[role="option"]')),t=this.getCurrentlySelectedElement(),n=e.indexOf(t)
n<=-1?this.selectElement(e[e.length-1]):0===n?(this.unselectElement(t),this.selectElement(e[e.length-1])):(this.unselectElement(t),this.selectElement(e[n-1]))}getCurrentlySelectedElement(){return this.domNode.querySelector('[aria-selected="true"]')}selectElement(e){e.setAttribute("aria-selected","true"),e.focus()}unselectElement(e){e.setAttribute("aria-selected","false")}selectFirstElement(){var e=this.getCurrentlySelectedElement()
this.unselectElement(e)
var t=this.domNode.querySelector('[role="option"]')
this.selectElement(t)}selectLastElement(){var e=this.getCurrentlySelectedElement()
this.unselectElement(e)
var t=this.domNode.querySelectorAll('[role="option"]'),n=t[t.length-1]
this.selectElement(n)}handleKeydown(e){switch(e.keyCode){case a.SPACE:case a.DOWN:e.stopPropagation(),e.preventDefault(),this.openPopup(),this.selectNextElement()
break
case a.UP:e.stopPropagation(),e.preventDefault(),this.openPopup(),this.selectPreviousElement()
break
case a.ESC:case a.LEFT:case a.RIGHT:e.stopPropagation(),e.preventDefault(),this.closePopup(),this.controllerNode.focus()
break
case a.RETURN:e.stopPropagation(),e.preventDefault(),this.openPopup()
var t=this.getCurrentlySelectedElement()
t?t.click():this.selectNextElement()
break
case a.HOME:e.stopPropagation(),e.preventDefault(),this.openPopup(),this.selectFirstElement()
break
case a.END:e.stopPropagation(),e.preventDefault(),this.openPopup(),this.selectLastElement()}}}const w=function(n){const i=[]
for(const o of n){const n=o.querySelector(".gs_dropdown_content")
if(n){const s=new b(n,o,(function(){e(this.controllerNode,this.domNode)}),(function(){t(this.controllerNode,this.domNode)}))
i.push(s)}}return i}
class _{constructor(e,t=!0){this.domElement=e,this.automaticTabActivation=t,this.supportsHiddenUntilFound="onbeforematch"in document.body,this.tablist=this.domElement.querySelector('[role="tablist"]'),this.tabpanels=[],this.tabheaders2TabpanelsMap=new Map,this.tabpanels2TabheadersMap=new Map,this.tabheaders=Array.from(this.tablist.querySelectorAll('[role="tab"]'))
for(const e of this.tabheaders){e.addEventListener("click",this.clickEventListener),e.addEventListener("keydown",this.keydownEventListener)
const t=e.getAttribute("aria-controls")
if(t){const n=document.getElementById(t)
n&&(n.classList.contains("d-none")&&(n.classList.remove("d-none"),n.hidden="until-found"),this.tabpanels.push(n),this.tabheaders2TabpanelsMap.set(e,n),this.tabpanels2TabheadersMap.set(n,e))}if(this.supportsHiddenUntilFound)for(const e of this.tabpanels)e.addEventListener("beforematch",this.handleBeforeMatch)}}clickEventListener=e=>{const t=e.target
this.updateTabsStates(t,!0)}
keydownEventListener=e=>{switch(e.code){case"End":e.preventDefault()
const t=this.tabheaders[this.tabheaders.length-1]
this.updateTabsStates(t,this.automaticTabActivation)
break
case"Home":e.preventDefault()
const n=this.tabheaders[0]
this.updateTabsStates(n,this.automaticTabActivation)
break
case"Enter":case"NumpadEnter":case"Space":const i=e.target
this.updateTabsStates(i,!0)
break
case"ArrowLeft":case"ArrowRight":e.preventDefault(),this.switchTabheaderOnArrowPress(e)}}
handleBeforeMatch=e=>{const t=e.target,n=this.tabpanels2TabheadersMap.get(t)
n&&this.updateTabsStates(n,!0)}
switchTabheaderOnArrowPress(e){const t=e.code,n=e.target,i=this.tabheaders.indexOf(n)
let o
"ArrowLeft"===t?o=0===i?this.tabheaders[this.tabheaders.length-1]:this.tabheaders[i-1]:"ArrowRight"===t&&(o=i===this.tabheaders.length-1?this.tabheaders[0]:this.tabheaders[i+1]),o&&this.updateTabsStates(o,this.automaticTabActivation)}updateTabsStates(e,t){for(const e of this.tabheaders)e.setAttribute("tabindex","-1"),t&&e.setAttribute("aria-selected","false")
if(e.removeAttribute("tabindex"),e.focus(),t){for(const e of this.tabpanels)e.hidden="until-found",e.removeAttribute("tabindex")
e.setAttribute("aria-selected","true")
const t=this.tabheaders2TabpanelsMap.get(e)
t.hidden=!1,t.tabIndex=0}}}const x=function(e){const t=[]
for(const n of e){const e=new _(n)
t.push(e)}return t}
r(354)
const T=function(){"undefined"!=typeof _etracker&&"undefined"!=typeof et_pagename&&(!function(){const e=document.querySelectorAll('[role="tablist"]:not(.tns-nav) > button[role="tab"]')
for(const t of e){const e=t.textContent.trim(),n=decodeURIComponent(et_pagename)
t.addEventListener("click",(function(t){const i="findD|"+e
_etracker.sendEvent(new et_ClickEvent(n,i))}))
const i=t.getAttribute("aria-controls"),o=document.getElementById(i).querySelectorAll("a")
for(const t of o){const i=t.href;["click","auxclick"].forEach((function(o){t.addEventListener(o,(function(t){const o="findD|"+e+"|"+i
_etracker.sendEvent(new et_LinkEvent(n,o))}))}))}}}(),[...document.getElementsByClassName("track-download")].forEach((e=>{["click","auxclick"].forEach((function(t){e.addEventListener(t,(()=>{const t=new URL(e.href).pathname
_etracker.sendEvent(new et_DownloadEvent(t,"WEB Download"))}))}))})),Array.from(document.getElementsByTagName("a")).forEach((e=>{const t=s(e),n=e.href;["click","auxclick"].forEach((function(i){e.addEventListener(i,(()=>{const e=new et_LinkEvent(t+"|"+n,"typo3-xpath")
_etracker.sendEvent(e)}))}))})),document.querySelectorAll(".gs_mouseover_box > a").forEach((e=>{const t=e.textContent;["click","auxclick"].forEach((function(n){e.addEventListener(n,(()=>{const e=new et_LinkEvent(t,"typo3-mouseoverbox")
_etracker.sendEvent(e)}))}))})))}
class k{constructor(e,t,n){this.domElement=e,this.onOpenPopup=t,this.onClosePopup=n,this.domElement.addEventListener("touchstart",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("focusin",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("focus",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("focusout",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("blur",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("mouseenter",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("mousedown",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("mouseup",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("mouseleave",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("click",this.onContainedEventChange.bind(this)),this.domElement.addEventListener("keydown",this.onContainedEventChange.bind(this)),this.domElement.setAttribute("aria-expanded","false")}togglePopup(){"false"===this.domElement.getAttribute("aria-expanded")?this.openPopup():this.closePopup()}openPopup(){this.domElement.setAttribute("aria-expanded","true"),this.onOpenPopup&&this.onOpenPopup()}closePopup(){this.domElement.setAttribute("aria-expanded","false"),this.onClosePopup&&this.onClosePopup()}onContainedEventChange(e){const t=e.type
if("mouseenter"===t){const t=e.relatedTarget
this.domElement.contains(t)||this.openPopup()}else if("focusout"===t||"mouseleave"===t){const t=e.relatedTarget
this.domElement.contains(t)||this.closePopup()}else if("click"===t)e.target===this.domElement&&(e.preventDefault(),this.togglePopup())
else if("touchstart"===t)e.target===this.domElement&&(e.preventDefault(),"false"===this.domElement.getAttribute("aria-expanded")?(this.openPopup(),this.domElement.focus()):this.closePopup())
else if("keydown"===t)switch(e.code){case"Enter":case"NumpadEnter":case"Space":e.target===this.domElement&&(e.preventDefault(),this.togglePopup())
break
case"Escape":e.preventDefault(),this.closePopup()}}}const S=function(e,t,n){const i=[]
for(const o of e){const e=new k(o,t,n)
i.push(e)}return i},E=async function(){let e=null
const t=document.querySelectorAll(".sortable-true.gris-service-projects-table")
if(t&&"length"in t&&t.length>=1){const n=await async function(){let e
return window.jQuery?e=window.jQuery:(e=(await Promise.resolve().then(r.t.bind(r,692,23))).default,window.$=e,window.jQuery=e),e}()
await async function(){let e
return window.tablesorter?e=window.tablesorter:(e=(await r.e(597).then(r.t.bind(r,597,23))).default,window.tablesorter=e),e}(),e=[]
for(const i of t){const t=n(i).tablesorter({dateFormat:"ddmmyyyy"})
e.push(t)}}return e},C=function(){const e=document.querySelectorAll(".tx-powermail *[placeholder]")
for(const t of e){let e=document.createElement("div")
e.textContent=("de"===language?"Anmerkung: ":"Remark: ")+t.getAttribute("placeholder"),e.classList.add("powermail-placeholder"),e.id=t.id+"placeholder",t.parentNode.insertBefore(e,t.nextSibling)}const t=document.querySelectorAll("[data-parsley-trigger]")
for(const e of t)e.setAttribute("data-parsley-trigger","keyup")
window.Parsley&&window.Parsley.on&&(window.Parsley.on("field:error",(function(){this.$element.attr("aria-invalid","true")})),window.Parsley.on("field:success",(function(){this.$element.attr("aria-invalid","false")})))},A=async function(){let e=null
if(!!document.querySelector("pre > code")){const t=await async function(){let e
if(window.hljs)e=window.hljs
else{e=(await r.e(11).then(r.bind(r,11))).default
const t=(await r.e(603).then(r.bind(r,603))).default
e.registerLanguage("javascript",t)
const n=(await r.e(359).then(r.bind(r,359))).default
e.registerLanguage("xml",n)
const i=(await r.e(753).then(r.bind(r,753))).default
e.registerLanguage("css",i)
const o=(await r.e(68).then(r.bind(r,68))).default
e.registerLanguage("scss",o)
const s=(await r.e(262).then(r.bind(r,262))).default
e.registerLanguage("python",s)
const a=(await r.e(510).then(r.bind(r,510))).default
e.registerLanguage("bash",a)
const l=(await r.e(130).then(r.bind(r,130))).default
e.registerLanguage("php",l)
const c=(await r.e(736).then(r.bind(r,736))).default
e.registerLanguage("java",c),window.hljs=e}return e}()
t.highlightAll(),e=t}return e},L=async function(){let e=null
if(!!document.querySelector("[data-fancybox]")){const t=await async function(){let e
return window.Fancybox?e=window.Fancybox:(e=(await r.e(997).then(r.bind(r,997))).Fancybox,window.Fancybox=e),e}()
t.defaults.hideScrollbar="false",e=t}return e},$=function(e){e.addEventListener("click",(function(t){const n=t.target
if(e===n){const n=e.getBoundingClientRect();(n.top>t.clientY||t.clientY>n.top+n.height||n.left>t.clientX||t.clientX>n.left+n.width)&&e.close()}}))
if(!e.querySelector('form[method="dialog"]')){e.querySelectorAll("button[data-action-close], button[data-action-cancel]").forEach((t=>{t.addEventListener("click",(()=>e.close()))}))}return e}
r(467)
var O={}
!function e(t,n,i,o){var s=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),r="function"==typeof Path2D&&"function"==typeof DOMMatrix,a=function(){if(!t.OffscreenCanvas)return!1
var e=new OffscreenCanvas(1,1),n=e.getContext("2d")
n.fillRect(0,0,1,1)
var i=e.transferToImageBitmap()
try{n.createPattern(i,"no-repeat")}catch(e){return!1}return!0}()
function l(){}function c(e){var i=n.exports.Promise,o=void 0!==i?i:t.Promise
return"function"==typeof o?new o(e):(e(l,l),null)}var d,u,p,h,f,g,m,v,y,b,w,_=(d=a,u=new Map,{transform:function(e){if(d)return e
if(u.has(e))return u.get(e)
var t=new OffscreenCanvas(e.width,e.height)
return t.getContext("2d").drawImage(e,0,0),u.set(e,t),t},clear:function(){u.clear()}}),x=(f=Math.floor(1e3/60),g={},m=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(p=function(e){var t=Math.random()
return g[t]=requestAnimationFrame((function n(i){m===i||m+f-1<i?(m=i,delete g[t],e()):g[t]=requestAnimationFrame(n)})),t},h=function(e){g[e]&&cancelAnimationFrame(g[e])}):(p=function(e){return setTimeout(e,f)},h=function(e){return clearTimeout(e)}),{frame:p,cancel:h}),T=(b={},function(){if(v)return v
if(!i&&s){var t=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n")
try{v=new Worker(URL.createObjectURL(new Blob([t])))}catch(e){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",e),null}!function(e){function t(t,n){e.postMessage({options:t||{},callback:n})}e.init=function(t){var n=t.transferControlToOffscreen()
e.postMessage({canvas:n},[n])},e.fire=function(n,i,o){if(y)return t(n,null),y
var s=Math.random().toString(36).slice(2)
return y=c((function(i){function r(t){t.data.callback===s&&(delete b[s],e.removeEventListener("message",r),y=null,_.clear(),o(),i())}e.addEventListener("message",r),t(n,s),b[s]=r.bind(null,{data:{callback:s}})}))},e.reset=function(){for(var t in e.postMessage({reset:!0}),b)b[t](),delete b[t]}}(v)}return v}),k={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1}
function S(e,t,n){return function(e,t){return t?t(e):e}(e&&null!=e[t]?e[t]:k[t],n)}function E(e){return e<0?0:Math.floor(e)}function C(e){return parseInt(e,16)}function A(e){return e.map(L)}function L(e){var t=String(e).replace(/[^0-9a-f]/gi,"")
return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:C(t.substring(0,2)),g:C(t.substring(2,4)),b:C(t.substring(4,6))}}function $(e){e.width=document.documentElement.clientWidth,e.height=document.documentElement.clientHeight}function O(e){var t=e.getBoundingClientRect()
e.width=t.width,e.height=t.height}function P(e,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2)
var n=t.tick++/t.totalTicks,i=t.x+t.random*t.tiltCos,o=t.y+t.random*t.tiltSin,s=t.wobbleX+t.random*t.tiltCos,a=t.wobbleY+t.random*t.tiltSin
if(e.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-n)+")",e.beginPath(),r&&"path"===t.shape.type&&"string"==typeof t.shape.path&&Array.isArray(t.shape.matrix))e.fill(function(e,t,n,i,o,s,r){var a=new Path2D(e),l=new Path2D
l.addPath(a,new DOMMatrix(t))
var c=new Path2D
return c.addPath(l,new DOMMatrix([Math.cos(r)*o,Math.sin(r)*o,-Math.sin(r)*s,Math.cos(r)*s,n,i])),c}(t.shape.path,t.shape.matrix,t.x,t.y,.1*Math.abs(s-i),.1*Math.abs(a-o),Math.PI/10*t.wobble))
else if("bitmap"===t.shape.type){var l=Math.PI/10*t.wobble,c=.1*Math.abs(s-i),d=.1*Math.abs(a-o),u=t.shape.bitmap.width*t.scalar,p=t.shape.bitmap.height*t.scalar,h=new DOMMatrix([Math.cos(l)*c,Math.sin(l)*c,-Math.sin(l)*d,Math.cos(l)*d,t.x,t.y])
h.multiplySelf(new DOMMatrix(t.shape.matrix))
var f=e.createPattern(_.transform(t.shape.bitmap),"no-repeat")
f.setTransform(h),e.globalAlpha=1-n,e.fillStyle=f,e.fillRect(t.x-u/2,t.y-p/2,u,p),e.globalAlpha=1}else if("circle"===t.shape)e.ellipse?e.ellipse(t.x,t.y,Math.abs(s-i)*t.ovalScalar,Math.abs(a-o)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):function(e,t,n,i,o,s,r,a,l){e.save(),e.translate(t,n),e.rotate(s),e.scale(i,o),e.arc(0,0,1,r,a,l),e.restore()}(e,t.x,t.y,Math.abs(s-i)*t.ovalScalar,Math.abs(a-o)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI)
else if("star"===t.shape)for(var g=Math.PI/2*3,m=4*t.scalar,v=8*t.scalar,y=t.x,b=t.y,w=5,x=Math.PI/w;w--;)y=t.x+Math.cos(g)*v,b=t.y+Math.sin(g)*v,e.lineTo(y,b),g+=x,y=t.x+Math.cos(g)*m,b=t.y+Math.sin(g)*m,e.lineTo(y,b),g+=x
else e.moveTo(Math.floor(t.x),Math.floor(t.y)),e.lineTo(Math.floor(t.wobbleX),Math.floor(o)),e.lineTo(Math.floor(s),Math.floor(a)),e.lineTo(Math.floor(i),Math.floor(t.wobbleY))
return e.closePath(),e.fill(),t.tick<t.totalTicks}function D(e,n){var r,a=!e,l=!!S(n||{},"resize"),d=!1,u=S(n,"disableForReducedMotion",Boolean),p=s&&!!S(n||{},"useWorker")?T():null,h=a?$:O,f=!(!e||!p)&&!!e.__confetti_initialized,g="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches
function m(t,n,s){for(var a,l,d,u,p,f=S(t,"particleCount",E),g=S(t,"angle",Number),m=S(t,"spread",Number),v=S(t,"startVelocity",Number),y=S(t,"decay",Number),b=S(t,"gravity",Number),w=S(t,"drift",Number),T=S(t,"colors",A),k=S(t,"ticks",Number),C=S(t,"shapes"),L=S(t,"scalar"),$=!!S(t,"flat"),O=function(e){var t=S(e,"origin",Object)
return t.x=S(t,"x",Number),t.y=S(t,"y",Number),t}(t),D=f,M=[],N=e.width*O.x,j=e.height*O.y;D--;)M.push((a={x:N,y:j,angle:g,spread:m,startVelocity:v,color:T[D%T.length],shape:C[(u=0,p=C.length,Math.floor(Math.random()*(p-u))+u)],ticks:k,decay:y,gravity:b,drift:w,scalar:L,flat:$},l=void 0,d=void 0,l=a.angle*(Math.PI/180),d=a.spread*(Math.PI/180),{x:a.x,y:a.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*a.startVelocity+Math.random()*a.startVelocity,angle2D:-l+(.5*d-Math.random()*d),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:a.color,shape:a.shape,tick:0,totalTicks:a.ticks,decay:a.decay,drift:a.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*a.gravity,ovalScalar:.6,scalar:a.scalar,flat:a.flat}))
return r?r.addFettis(M):(r=function(e,t,n,s,r){var a,l,d=t.slice(),u=e.getContext("2d"),p=c((function(t){function c(){a=l=null,u.clearRect(0,0,s.width,s.height),_.clear(),r(),t()}a=x.frame((function t(){!i||s.width===o.width&&s.height===o.height||(s.width=e.width=o.width,s.height=e.height=o.height),s.width||s.height||(n(e),s.width=e.width,s.height=e.height),u.clearRect(0,0,s.width,s.height),(d=d.filter((function(e){return P(u,e)}))).length?a=x.frame(t):c()})),l=c}))
return{addFettis:function(e){return d=d.concat(e),p},canvas:e,promise:p,reset:function(){a&&x.cancel(a),l&&l()}}}(e,M,h,n,s),r.promise)}function v(n){var i=u||S(n,"disableForReducedMotion",Boolean),o=S(n,"zIndex",Number)
if(i&&g)return c((function(e){e()}))
a&&r?e=r.canvas:a&&!e&&(e=function(e){var t=document.createElement("canvas")
return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=e,t}(o),document.body.appendChild(e)),l&&!f&&h(e)
var s={width:e.width,height:e.height}
function v(){if(p){var t={getBoundingClientRect:function(){if(!a)return e.getBoundingClientRect()}}
return h(t),void p.postMessage({resize:{width:t.width,height:t.height}})}s.width=s.height=null}function y(){r=null,l&&(d=!1,t.removeEventListener("resize",v)),a&&e&&(document.body.contains(e)&&document.body.removeChild(e),e=null,f=!1)}return p&&!f&&p.init(e),f=!0,p&&(e.__confetti_initialized=!0),l&&!d&&(d=!0,t.addEventListener("resize",v,!1)),p?p.fire(n,s,y):m(n,s,y)}return v.reset=function(){p&&p.reset(),r&&r.reset()},v}function M(){return w||(w=D(null,{useWorker:!0,resize:!0})),w}n.exports=function(){return M().apply(this,arguments)},n.exports.reset=function(){M().reset()},n.exports.create=D,n.exports.shapeFromPath=function(e){if(!r)throw new Error("path confetti are not supported in this browser")
var t,n
"string"==typeof e?t=e:(t=e.path,n=e.matrix)
var i=new Path2D(t),o=document.createElement("canvas").getContext("2d")
if(!n){for(var s,a,l=1e3,c=l,d=l,u=0,p=0,h=0;h<l;h+=2)for(var f=0;f<l;f+=2)o.isPointInPath(i,h,f,"nonzero")&&(c=Math.min(c,h),d=Math.min(d,f),u=Math.max(u,h),p=Math.max(p,f))
s=u-c,a=p-d
var g=Math.min(10/s,10/a)
n=[g,0,0,g,-Math.round(s/2+c)*g,-Math.round(a/2+d)*g]}return{type:"path",path:t,matrix:n}},n.exports.shapeFromText=function(e){var t,n=1,i="#000000",o='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif'
"string"==typeof e?t=e:(t=e.text,n="scalar"in e?e.scalar:n,o="fontFamily"in e?e.fontFamily:o,i="color"in e?e.color:i)
var s=10*n,r=s+"px "+o,a=new OffscreenCanvas(s,s),l=a.getContext("2d")
l.font=r
var c=l.measureText(t),d=Math.ceil(c.actualBoundingBoxRight+c.actualBoundingBoxLeft),u=Math.ceil(c.actualBoundingBoxAscent+c.actualBoundingBoxDescent),p=c.actualBoundingBoxLeft+2,h=c.actualBoundingBoxAscent+2
d+=4,u+=4,(l=(a=new OffscreenCanvas(d,u)).getContext("2d")).font=r,l.fillStyle=i,l.fillText(t,p,h)
var f=1/n
return{type:"bitmap",bitmap:a.transferToImageBitmap(),matrix:[f,0,0,f,-d*f/2,-u*f/2]}}}(function(){return"undefined"!=typeof window?window:"undefined"!=typeof self?self:this||{}}(),O,!1)
const P=O.exports
O.exports.create
var D=r(215),M=/*#__PURE__*/r.n(D)
const N=async function(){let e=null
const t=document.querySelectorAll(".gesis-datatable table")
if(t&&"length"in t&&t.length>=1){const n=await async function(){return(await Promise.all([r.e(846),r.e(491)]).then(r.bind(r,491))).GesisDataTable}()
e=[]
for(const i of t)if(!n.isDataTable(i)){const t=i.parentElement
t.classList.contains("table-responsive")&&(t.insertAdjacentElement("beforebegin",i),t.remove())
const s=new n(i,{language:"de"===o()?await u():await d(),retrieve:!0})
e.push(s)}}return e}
r(599)
var j=r(692),I=/*#__PURE__*/r.n(j)
window.location
window.MathJax={loader:{load:["input/tex","output/chtml"]},chtml:{fontURL:"/typo3conf/ext/gesis_web_ext/Resources/Public/webpack/dist/font/MathJax/fonts/woff-v2"},startup:{ready:()=>{MathJax.startup.defaultReady(),MathJax.typesetPromise().then((()=>{}))}}},r.e(977).then(r.t.bind(r,977,23)),"function"!==(window.$,!1)||"object"!==(window.$.fn,!1)||window.$.fn.jquery||(window.$=I(),window.jQuery=I()),window.GesisWeb={},window.GesisWeb.version="1.1.0-20250908T063639Z",window.GesisWeb.state="evaluating",window.importModule=async function(e,t=null){let n
const i=t??e
return Object.hasOwn(window,i)?n=window.moduleName:(n=await import(e),Object.assign(window,{[i]:n})),n},window.getBeautify=async function(){let e
return window.beautify?e=window.beautify:(e=(await r.e(418).then(r.t.bind(r,418,23))).default,window.beautify=e),e},window.fadeMainContent=e,window.unfadeMainContent=t,window.getMeta=n,window.getMicrosite=i,window.getLanguage=o,window.appendDebug=function(e){let t=document.getElementById("debug-output")
t||(document.body.insertAdjacentHTML("beforeend",'<div id="debug-output"></div>'),t=document.getElementById("debug-output"))
const n=document.createElement("p"),i=document.createElement("code")
i.textContent=e,n.appendChild(i),t.appendChild(n)},window.replaceTag=function(e,t){const n=document.createElement(t)
n.append(...e.childNodes)
for(const t of e.attributes)n.setAttribute(t.name,t.value)
return e.replaceWith(n),n},window.showConfetti=function(){var e={origin:{y:.7}}
function t(t,n){confetti(Object.assign({},e,n,{particleCount:Math.floor(400*t)}))}t(.25,{spread:26,startVelocity:55}),t(.2,{spread:60}),t(.35,{spread:100,decay:.91,scalar:.8}),t(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),t(.1,{spread:120,startVelocity:45})},window.getXPathForElement=s,window.getElementByXPath=function(e){return(new XPathEvaluator).evaluate(e,document.documentElement,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue},window.setupSkipLinks=p,window.lazySetupGrisServiceProjectsTablesorters=E,window.setupPowermail=C,window.lazyHighlightAll=A,window.lazySetupFancybox=L,window.lazySetupGesisDataTables=N,window.confetti=P,window.Cookies=M(),window.search=new class{constructor(e){if(this.combobox=document.getElementById("gs_gws_combobox"),this.input=document.getElementById("gs_searchterm"),this.listbox=document.getElementById("gs_hitlist"),this.inputClearButton=document.getElementById("clear-input-button"),this.micrositeSelect=document.getElementsByClassName("gs_search_facet")[0].firstElementChild,this.hasResponse=!1,this.httpRequest=new XMLHttpRequest,this.resultsCount=0,this.resultsItems=[],this.automaticallyShowListbox=!0,this.shown=!1,this.previousInput="",this.microsite=e,this.host="",this.listbox.tabIndex=-1,this.listbox.setAttribute("aria-hidden","true"),this.activeIndex=-1,this.input.addEventListener("keyup",this.checkKey.bind(this)),this.inputClearButton.addEventListener("click",this.resetSearchterm.bind(this)),this.combobox.addEventListener("focusout",this.checkHide.bind(this)),this.input.addEventListener("focus",this.checkShow.bind(this)),this.input.addEventListener("keydown",this.setActiveItem.bind(this)),this.micrositeSelect.addEventListener("change",this.setMicrosite.bind(this)),"missy"==this.microsite){const e=document.createElement("option")
e.text="MISSY",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}else if("cews"==this.microsite){const e=document.createElement("option")
e.text="CEWS",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}else if("gles"==this.microsite){const e=document.createElement("option")
e.text="GLES",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}else if("issp"==this.microsite){const e=document.createElement("option")
e.text="ISSP",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}else if("gesis-panel"==this.microsite){const e=document.createElement("option")
e.text="GESIS Panel",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}else if("gesis-guides"==this.microsite){const e=document.createElement("option")
e.text="GESIS Guides",this.micrositeSelect.add(e,this.micrositeSelect[0]),this.micrositeSelect.selectedIndex="0"}}setMicrosite(e){"Alles"==e.target.value||"All"==e.target.value?this.microsite=null:this.microsite=e.target.value.toLowerCase(),this.updateResults()}getItemAt(e){return this.resultsItems[e]}setActiveItem(e){this.previousInput=this.input.value
var t=e.which||e.keyCode,n=this.activeIndex
if(t===m)return this.httpRequest.abort(),this.hideListbox(),void this.clearInput()
var i,o=this.getItemAt(n)
switch(t){case v:n<=0?n=this.resultsCount-1:n--
break
case y:-1===n||n>=this.resultsCount-1?n=0:n++
break
case g:return void((i=this.getItemAt(n))?this.selectItem(i):this.updateResults())
case f:return void this.hideListbox()
default:return}e.preventDefault(),i=this.getItemAt(n),this.activeIndex=n,o&&(o.classList.remove("focused"),o.setAttribute("aria-selected","false")),i?(this.input.setAttribute("aria-activedescendant","result-item-"+n),i.classList.add("focused"),i.setAttribute("aria-selected","true")):this.input.removeAttribute("aria-activedescendant")}selectItem(e){e&&e.click()}resetSearchterm(){this.clearInput(),this.clearListbox()}checkHide(e){var t=e.type,n=e.relatedTarget
e.target
"focusout"===t&&(this.input.contains(n)||this.combobox.contains(n)||this.listbox.contains(n)||this.hideListbox())}hideListbox(){this.combobox.setAttribute("aria-expanded","false"),this.listbox.setAttribute("aria-hidden","true"),this.shown=!1,this.removeMainBackdrop()}checkKey(e){switch(e.which||e.keyCode){case v:case y:case m:case g:return void e.preventDefault()
default:return void(this.input.value.length<=2?(this.httpRequest.abort(),this.clearListbox()):this.previousInput===this.input.value||this.updateResults())}}updateResults(){this.httpRequest.abort()
const e=o(),t=this.microsite,n={term:this.input.value,lang:e,...t&&{microsite:t}},i=new URLSearchParams(n).toString(),s=this.host+"/fileadmin/admin/gs_search_connector.php?"+i
this.httpRequest=new XMLHttpRequest,this.httpRequest.addEventListener("load",this.processResults.bind(this)),this.httpRequest.open("GET",s),this.httpRequest.send()}clearInput(){this.input.value="",this.removeMainBackdrop()}processResults(){this.clearListbox(),this.hasResponse=!0
var e=document.createElement("div")
e.innerHTML=this.httpRequest.responseText
var t=e.firstElementChild
this.listbox.appendChild(t)
var n=Array.from(t.querySelectorAll("a")).filter((function(e){return!0}))
n.forEach((function(e,t){e.tabIndex=-1,e.classList.add("result"),e.setAttribute("role","option"),!e.id&&(e.id="result-item-"+t)})),this.resultsCount=n.length,this.resultsItems=n,this.checkShow()}clearListbox(){this.listbox.innerHTML="",this.listbox.setAttribute("aria-hidden","true"),this.resultsCount=0,this.resultsItems=[],this.hasResponse=!1,this.input.removeAttribute("aria-activedescendant")}checkShow(){this.hasResponse&&this.automaticallyShowListbox&&(this.showListbox(),this.addMainBackdrop())}showListbox(){this.combobox.setAttribute("aria-expanded","true"),this.listbox.setAttribute("aria-hidden","false"),this.shown=!0}addMainBackdrop(){document.getElementsByTagName("main")[0].classList.add("has-backdrop")}removeMainBackdrop(){document.getElementsByTagName("main")[0].classList.remove("has-backdrop")}}(i()),window.form=new class{constructor(){this.addPersonButton=document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-add"]')[0],this.deletePersonButton=document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-delete"]')[0],this.startDateInput=document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-start_date"]')[0],this.endDateInput=document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-end_date"]')[0],this.startDateInput&&this.startDateInput.addEventListener("change",this.startDateEventListener.bind(this)),this.addPersonButton&&this.addPersonButton.addEventListener("click",this.addPersonEventListener.bind(this)),this.deletePersonButton&&this.deletePersonButton.addEventListener("click",this.deletePersonEventListener.bind(this)),this.originalFieldset=document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-person-1"]')[0],document.querySelectorAll('[id^="crm-datenvertrieb"][id*="-person-"]').forEach((e=>{const t=e.querySelectorAll("input, select, textarea")
Array.from(t).some((e=>""!==e.value.trim()))||e.remove()})),this.maxPerson=4,this.countPerson=0}startDateEventListener(e){var t=e.target.value
if(t){var n=new Date(t)
n.setFullYear(n.getFullYear()+2),n.getMonth()!==new Date(t).getMonth()&&n.setDate(0),this.endDateInput.value=n.toISOString().split("T")[0]}}addPersonEventListener(e){e.preventDefault()
const t=document.querySelectorAll('fieldset[id*="-person-"]').length+1
if(t<=this.maxPerson){const e=this.originalFieldset.cloneNode(!0)
e.querySelectorAll("input").forEach((e=>{e.value&&e.setAttribute("value","")})),this.changeIds(e,t),document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-personen"]')[0].insertBefore(e,this.addPersonButton)}t==this.maxPerson&&(e.target.style.display="none")}deletePersonEventListener(e){e.preventDefault(),e.target.parentElement.remove()
document.querySelectorAll('fieldset[id*="-person-"]').length+1<=this.maxPerson&&(this.addPersonButton.style="block"),this.renewIds()}changeIds(e,t){e instanceof HTMLFieldSetElement&&(e.id=e.id.replace(/(person).*\d?/,"$1-"+t),e.classList.add("active")),e instanceof HTMLLabelElement&&e.htmlFor.includes("vmgmt")&&(e.htmlFor=e.htmlFor.replace(/(vmgmt.*)(\d)/,"$1"+t)),e instanceof HTMLInputElement&&(e.name.includes("vmgmt")&&(e.name=e.name.replace(/(vmgmt.*)(\d)/,"$1"+t)),e.id.includes("vmgmt")&&(e.id=e.id.replace(/(vmgmt.*)(\d)/,"$1"+t))),e instanceof HTMLButtonElement&&e.addEventListener("click",this.deletePersonEventListener.bind(this)),e instanceof HTMLLegendElement&&(e.innerHTML=e.innerHTML.replace(/\d+/g,t))
for(let n of e.children)this.changeIds(n,t)}renewIds(){document.querySelectorAll('fieldset[id*="-person-"]').forEach(((e,t)=>{this.changeIds(e,t+1)}))}},window.megamenu=new class{constructor(){this.mainElements=document.querySelectorAll("main"),this.megamenus=document.querySelectorAll("nav.gs_megamenu_nav"),this.toggleButton=document.querySelectorAll("#gs_mm_toggle_button-"),this.remove=this.handleRemove.bind(this),this.isToggleButtonHandlerAttched=!1}init(){const e=(e,t)=>{t?e.forEach((e=>{e.classList.add("has-backdrop")})):e.forEach((e=>{e.classList.remove("has-backdrop")}))}
this.megamenus&&this.megamenus.forEach((t=>{const n=t.getElementsByClassName("menu-trigger")
for(const e of n)e.addEventListener("click",(t=>{t.preventDefault()
e.parentNode.querySelector("ul").classList.toggle("active"),e.classList.toggle("active")}))
const i=t.querySelectorAll("ul.gs_megamenu > li > a"),o=t.querySelectorAll("button.close-button"),s=()=>{const n=t.querySelector("a[aria-expanded=true]")
n&&(n.setAttribute("aria-expanded","false"),e(this.mainElements,!1))}
i.forEach((t=>{t.addEventListener("click",(n=>{t.classList.contains("haschildren")&&(n.preventDefault(),s(),t.setAttribute("aria-expanded","true"),e(this.mainElements,!0))}))})),o.forEach((e=>{e.addEventListener("click",(()=>{s()}))}))})),this.toggleButton.forEach((e=>{this.isToggleButtonHandlerAttched||(e.addEventListener("click",(function(e){this.parentNode.querySelectorAll("nav.gs_megamenu_nav")[0].classList.toggle("active"),this.classList.toggle("active")})),this.isToggleButtonHandlerAttched=!0)}))}handleRemove(){this.toggleButton.removeEventListener("click",this.handleToggleMenuButton)}},megamenu.init(),window.megamenuVertical=new class{constructor(){this.megamenuNavVert=document.querySelector("nav.gs_megamenu_nav_vert")}init(){if(this.megamenuNavVert){try{const e=this.megamenuNavVert.parentNode.getElementsByClassName("gs_mm_toggle_button"),t=this.megamenuNavVert.querySelector("section.mobile-only")
e[0].remove(),t.remove()}catch{}for(const e of this.megamenuNavVert.querySelector("ul").children)if(e.querySelector("ul")){e.appendChild(document.createElement("span")).classList.add("menu-trigger")
for(const t of e.querySelector("ul").children)if(t.querySelector("ul")){t.appendChild(document.createElement("span")).classList.add("menu-trigger")}}const e=this.megamenuNavVert.getElementsByClassName("menu-trigger")
for(const t of e)t.addEventListener("click",(e=>{e.preventDefault()
t.parentNode.querySelector("ul").classList.toggle("active"),t.classList.toggle("active")}))}}},megamenuVertical.init(),window.Popup=b,window.initializePopups=w,window.VCard=k,window.initializeVCards=S,window.TabContainer=_,window.initializeTabContainers=x,window.initializeDialog=$,window.ParsleyConfig={errorsWrapper:'<ul class="parsley-errors-list" aria-live="assertive"></ul>',trigger:"keyup",validationThreshold:0}
document.addEventListener("DOMContentLoaded",(function(){window.GesisWeb.state="initializing",(()=>{const e=document.querySelectorAll(".font-viewer .box")
e&&e.forEach((e=>{const t=e.querySelector("span.copy-name"),n=e.querySelector("span.copy-code"),i=e.getAttribute("data-icon-name"),o=`<i class="${i}"></i>`
t.addEventListener("click",(e=>{navigator.clipboard.writeText(i),t.querySelector("span").textContent="Copied name"})),n.addEventListener("click",(e=>{navigator.clipboard.writeText(o),n.querySelector("span").textContent="Copied code"}))}))})(),window.language=o(),function(){if("true"===n("gesis-page-not-found")){let e,t,n
"de"===o()?(e="Seite nicht gefunden (404)",t="Nachricht schließen",n="Die von Ihnen aufgerufene Seite existiert nicht oder nicht mehr.<br/> Stattdessen zeigen wir Ihnen eine übergeordnete Seite."):(e="Page not found (404)",t="Close message",n="The page you requested does not exist or does not exist anymore.<br/> Instead, we present you a superordinate page.")
const i=`\n  \x3c!-- BEGIN conditional dialog modal on 404 resolving strategy\n    if HTML document contains marker meta element <meta name="gesis-page-not-found" content="true"> --\x3e\n  <dialog id="dialog-page-not-found">\n    <header>\n      <strong>${e}</strong>\n      <button aria-labelledby="dialog-page-not-found-close" data-action-close="true"></button>\n    </header>\n    <div class="dialog-content">\n      <p>${n}</p>\n    </div>\n    <footer>\n      <button id="dialog-page-not-found-close" data-action-close="true">${t}</button>\n    </footer>\n  </dialog>\n  \x3c!-- END conditional dialog modal on 404 resolving strategy --\x3e\n`
document.body.insertAdjacentHTML("afterbegin",i)
const s=document.getElementById("dialog-page-not-found")
$(s),s.showModal()}}()
const i=document.getElementsByClassName("gs_vcard_toggle"),s=S(i,e,t)
window.GesisWeb.vCards=s,window.GesisWeb.Search=search,p()
const r=document.getElementsByClassName("gs_dropdown_toggle"),a=w(r)
window.GesisWeb.popups=a
const l=document.getElementsByClassName("tabs"),c=x(l)
window.GesisWeb.tabContainers=c
const d=E()
d.then((e=>{e&&(window.GesisWeb.grisServiceProjectsTablesorters=e)})),window.GesisWeb.lazyGrisServiceProjectsTablesortersPromise=d,C()
const u=A()
window.GesisWeb.lazyHighlightAllPromise=u
const h=L()
window.GesisWeb.lazySetupFancyboxPromise=h,function(){const e=Array.from(document.getElementsByClassName("gesis-css-custom-properties"))
if(e.length>=1){const t=Array.from(document.styleSheets).filter((e=>null===e.href||e.href.startsWith(window.location.origin))).reduce(((e,t)=>[...e,...Array.from(t.cssRules).reduce(((e,t)=>":root"===t.selectorText?[...e,...Array.from(t.style).filter((e=>e.match(new RegExp("--gs--(color|gradient)"))))]:e),[])]),[]).reduce(((e,t)=>({...e,[t]:getComputedStyle(document.documentElement).getPropertyValue(t).trim()})),{})
let n="\n    <table><tbody>\n    ".trim()
for(const[e,i]of Object.entries(t))n+=`<tr><td><code>${e}</code></td><td><code>${i}</code></td><td style="background: ${i}"></td></tr>`
n+="\n    </tbody></table>\n    ".trim(),e[0].innerHTML=n}}(),T()
const f=N()
window.GesisWeb.lazyGesisDataTablesPromise=f,window.GesisWeb.state="initialized"
const g=new Event("gesisweb.initialized")
document.dispatchEvent(g),I()(".carousel").slick({slidesToShow:3,slidesToScroll:3,autoplay:!1,prevArrow:'<button type="button" role="button" class="slick-prev slick-arrow"></button>',nextArrow:'<button type="button" role="button" class="slick-next slick-arrow"></button>',responsive:[{breakpoint:1300,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:800,settings:{slidesToShow:1,slidesToScroll:1}}]}),I()(".slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!0,arrows:!1,dots:!0,autoplaySpeed:8e3})
var m="de"
const v=window.location.pathname
v.startsWith("/en/")&&(m="en")
var y,b={de:{Phase1:"#c125569",Phase2:"#c125553",Phase3:"#c125557",Phase4:"#c125561"},en:{Phase1:"#c125569",Phase2:"#c125553",Phase3:"#c125557",Phase4:"#c125561"}},_={de:{Phase1:"#c124037",Phase2:"#c124040",Phase3:"#c124046",Phase4:"#c124053",Phase5:"#c124061"},en:{Phase1:"#c124037",Phase2:"#c124040",Phase3:"#c124046",Phase4:"#c124053",Phase5:"#c124061"}}
if(v.startsWith("/angebot")||v.startsWith("/en/service"))var k=document.getElementById("71-svg")
else if(v.startsWith("/forschung")||v.startsWith("/en/research"))k=document.getElementById("72-svg")
if(k){function O(e,t){if(v.startsWith("/angebot")||v.startsWith("/en/service"))var n=e.querySelector("[id='"+t+"_hv']"),i=e.querySelector("[id='"+t+"_bl']"),o=e.querySelector("[id='"+t+"_mg']")
else if(v.startsWith("/forschung")||v.startsWith("/en/research"))n=e.querySelector("[id='"+t+"_hv']"),i=e.querySelector("[id='"+t+"_bl']"),o=e.querySelector("[id='"+t+"_mg']")
n.addEventListener("mouseover",(function(){i.style.display="none",o.style.display="block"}),!1),n.addEventListener("mouseout",(function(){i.style.display="block",o.style.display="none"}),!1),n.addEventListener("click",(function(){v.startsWith("/angebot")||v.startsWith("/en/service")?location.href=b[m][t]:(v.startsWith("/forschung")||v.startsWith("/en/research"))&&(location.href=_[m][t])}),!1)}k.addEventListener("load",(function(){if(y=k.contentDocument,v.startsWith("/angebot")||v.startsWith("/en/service")){var e=y.querySelectorAll("#pt-1, #pt-2, #pt-3, #pt-4"),t=y.querySelectorAll("#pt-1e, #pt-2e, #pt-3e, #pt-4e")
if("en"==m)for(var n=0;n<e.length;n++)e[n].style.display="none",t[n].style.display="block"
else for(n=0;n<t.length;n++)t[n].style.display="none",e[n].style.display="block"
for(n=1;n<=4;n++){O(y,"Phase"+n)}}else if(v.startsWith("/forschung")||v.startsWith("/en/research"))for(n=1;n<=5;n++){O(y,"Phase"+n)}}),!1)}}))})()})()

//# sourceMappingURL=gesis-web.js.map