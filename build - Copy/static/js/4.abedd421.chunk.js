webpackJsonp([4,18],{145:function(e,t,n){"use strict";e.exports=n(146)},146:function(e,t,n){"use strict";function r(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);throw t=Error(n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."),t.name="Invariant Violation",t.framesToPop=1,t}function a(e,t){return(e&t)===t}function o(e,t){if(O.hasOwnProperty(e)||2<e.length&&("o"===e[0]||"O"===e[0])&&("n"===e[1]||"N"===e[1]))return!1;if(null===t)return!0;switch(typeof t){case"boolean":return l(e);case"undefined":case"number":case"string":case"object":return!0;default:return!1}}function i(e){return A.hasOwnProperty(e)?A[e]:null}function l(e){if(O.hasOwnProperty(e))return!0;var t=i(e);return t?t.hasBooleanValue||t.hasStringBooleanValue||t.hasOverloadedBooleanValue:"data-"===(e=e.toLowerCase().slice(0,5))||"aria-"===e}function u(e){return e[1].toUpperCase()}function s(e){if("boolean"===typeof e||"number"===typeof e)return""+e;e=""+e;var t=H.exec(e);if(t){var n,r="",a=0;for(n=t.index;n<e.length;n++){switch(e.charCodeAt(n)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#x27;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}a!==n&&(r+=e.substring(a,n)),a=n+1,r+=t}e=a!==n?r+e.substring(a,n):r}return e}function c(e){return!!q.hasOwnProperty(e)||!B.hasOwnProperty(e)&&(j.test(e)?q[e]=!0:(B[e]=!0,!1))}function p(e,t){var n=i(e);if(n){if(null==t||n.hasBooleanValue&&!t||n.hasNumericValue&&isNaN(t)||n.hasPositiveNumericValue&&1>t||n.hasOverloadedBooleanValue&&!1===t)return"";var r=n.attributeName;if(n.hasBooleanValue||n.hasOverloadedBooleanValue&&!0===t)return r+'=""';if("boolean"!==typeof t||l(e))return r+'="'+s(t)+'"'}else if(o(e,t))return null==t?"":e+'="'+s(t)+'"';return null}function h(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function f(e){return"string"===typeof e?e:"function"===typeof e?e.displayName||e.name:null}function d(e){var t="";return b.Children.forEach(e,function(e){null==e||"string"!==typeof e&&"number"!==typeof e||(t+=e)}),t}function m(e,t){if(e=e.contextTypes){var n,r={};for(n in e)r[n]=t[n];t=r}else t=w;return t}function v(e,t){void 0===e&&r("152",f(t)||"Component")}function y(e,t){for(;b.isValidElement(e);){var n=e,a=n.type;if("function"!==typeof a)break;e=m(a,t);var o=[],i=!1,l={isMounted:function(){return!1},enqueueForceUpdate:function(){if(null===o)return null},enqueueReplaceState:function(e,t){i=!0,o=[t]},enqueueSetState:function(e,t){if(null===o)return null;o.push(t)}};if(a.prototype&&a.prototype.isReactComponent)var u=new a(n.props,e,l);else if(null==(u=a(n.props,e,l))||null==u.render){e=u,v(e,a);continue}if(u.props=n.props,u.context=e,u.updater=l,l=u.state,void 0===l&&(u.state=l=null),u.componentWillMount)if(u.componentWillMount(),o.length){l=o;var s=i;if(o=null,i=!1,s&&1===l.length)u.state=l[0];else{var c=s?l[0]:u.state,p=!0;for(s=s?1:0;s<l.length;s++){var h=l[s];(h="function"===typeof h?h.call(u,c,n.props,e):h)&&(p?(p=!1,c=g({},c,h)):g(c,h))}u.state=c}}else o=null;if(e=u.render(),v(e,a),"function"===typeof u.getChildContext&&"object"===typeof(n=a.childContextTypes)){var d=u.getChildContext();for(var y in d)y in n||r("108",f(a)||"Unknown",y)}d&&(t=g({},t,d))}return{child:e,context:t}}var g=n(17),b=n(5),x=n(18),w=n(28),E=n(147),k=n(149),O={children:!0,dangerouslySetInnerHTML:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,suppressHydrationWarning:!0,style:!0},S={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(e){var t=S,n=e.Properties||{},o=e.DOMAttributeNamespaces||{},i=e.DOMAttributeNames||{};e=e.DOMMutationMethods||{};for(var l in n){A.hasOwnProperty(l)&&r("48",l);var u=l.toLowerCase(),s=n[l];u={attributeName:u,attributeNamespace:null,propertyName:l,mutationMethod:null,mustUseProperty:a(s,t.MUST_USE_PROPERTY),hasBooleanValue:a(s,t.HAS_BOOLEAN_VALUE),hasNumericValue:a(s,t.HAS_NUMERIC_VALUE),hasPositiveNumericValue:a(s,t.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:a(s,t.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:a(s,t.HAS_STRING_BOOLEAN_VALUE)},1>=u.hasBooleanValue+u.hasNumericValue+u.hasOverloadedBooleanValue||r("50",l),i.hasOwnProperty(l)&&(u.attributeName=i[l]),o.hasOwnProperty(l)&&(u.attributeNamespace=o[l]),e.hasOwnProperty(l)&&(u.mutationMethod=e[l]),A[l]=u}}},A={},N=S,_=N.MUST_USE_PROPERTY,C=N.HAS_BOOLEAN_VALUE,M=N.HAS_NUMERIC_VALUE,F=N.HAS_POSITIVE_NUMERIC_VALUE,V=N.HAS_OVERLOADED_BOOLEAN_VALUE,P=N.HAS_STRING_BOOLEAN_VALUE,L={Properties:{allowFullScreen:C,async:C,autoFocus:C,autoPlay:C,capture:V,checked:_|C,cols:F,contentEditable:P,controls:C,default:C,defer:C,disabled:C,download:V,draggable:P,formNoValidate:C,hidden:C,loop:C,multiple:_|C,muted:_|C,noValidate:C,open:C,playsInline:C,readOnly:C,required:C,reversed:C,rows:F,rowSpan:M,scoped:C,seamless:C,selected:_|C,size:F,start:M,span:F,spellCheck:P,style:0,tabIndex:0,itemScope:C,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:P},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(e,t){if(null==t)return e.removeAttribute("value");"number"!==e.type||!1===e.hasAttribute("value")?e.setAttribute("value",""+t):e.validity&&!e.validity.badInput&&e.ownerDocument.activeElement!==e&&e.setAttribute("value",""+t)}}},T=N.HAS_STRING_BOOLEAN_VALUE,I={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},D={Properties:{autoReverse:T,externalResourcesRequired:T,preserveAlpha:T},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:I.xlink,xlinkArcrole:I.xlink,xlinkHref:I.xlink,xlinkRole:I.xlink,xlinkShow:I.xlink,xlinkTitle:I.xlink,xlinkType:I.xlink,xmlBase:I.xml,xmlLang:I.xml,xmlSpace:I.xml}},R=/[\-\:]([a-z])/g;"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(e){var t=e.replace(R,u);D.Properties[t]=0,D.DOMAttributeNames[t]=e}),N.injectDOMPropertyConfig(L),N.injectDOMPropertyConfig(D);var U="function"===typeof Symbol&&Symbol.for?Symbol.for("react.fragment"):60107,H=/["'&<>]/,j=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,B={},q={},z={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"},W={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},G=g({menuitem:!0},W),Z={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},J=["Webkit","ms","Moz","O"];Object.keys(Z).forEach(function(e){J.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Z[t]=Z[e]})});var Y=b.Children.toArray,$=x.thatReturns(""),X={listing:!0,pre:!0,textarea:!0},K=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,Q={},ee=k(function(e){return E(e)}),te={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null,suppressHydrationWarning:null},ne=function(){function e(t,n){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");b.isValidElement(t)?t.type!==U?t=[t]:(t=t.props.children,t=b.isValidElement(t)?[t]:Y(t)):t=Y(t),this.stack=[{domNamespace:z.html,children:t,childIndex:0,context:w,footer:""}],this.exhausted=!1,this.currentSelectValue=null,this.previousWasTextNode=!1,this.makeStaticMarkup=n}return e.prototype.read=function(e){if(this.exhausted)return null;for(var t="";t.length<e;){if(0===this.stack.length){this.exhausted=!0;break}var n=this.stack[this.stack.length-1];if(n.childIndex>=n.children.length){var r=n.footer;t+=r,""!==r&&(this.previousWasTextNode=!1),this.stack.pop(),"select"===n.tag&&(this.currentSelectValue=null)}else r=n.children[n.childIndex++],t+=this.render(r,n.context,n.domNamespace)}return t},e.prototype.render=function(e,t,n){return"string"===typeof e||"number"===typeof e?""===(n=""+e)?"":this.makeStaticMarkup?s(n):this.previousWasTextNode?"\x3c!-- --\x3e"+s(n):(this.previousWasTextNode=!0,s(n)):(t=y(e,t),e=t.child,t=t.context,null===e||!1===e?"":b.isValidElement(e)?e.type===U?(e=Y(e.props.children),this.stack.push({domNamespace:n,children:e,childIndex:0,context:t,footer:""}),""):this.renderDOM(e,t,n):(e=Y(e),this.stack.push({domNamespace:n,children:e,childIndex:0,context:t,footer:""}),""))},e.prototype.renderDOM=function(e,t,n){var a=e.type.toLowerCase();n===z.html&&h(a),Q.hasOwnProperty(a)||(K.test(a)||r("65",a),Q[a]=!0);var o=e.props;if("input"===a)o=g({type:void 0},o,{defaultChecked:void 0,defaultValue:void 0,value:null!=o.value?o.value:o.defaultValue,checked:null!=o.checked?o.checked:o.defaultChecked});else if("textarea"===a){var i=o.value;if(null==i){i=o.defaultValue;var l=o.children;null!=l&&(null!=i&&r("92"),Array.isArray(l)&&(1>=l.length||r("93"),l=l[0]),i=""+l),null==i&&(i="")}o=g({},o,{value:void 0,children:""+i})}else if("select"===a)this.currentSelectValue=null!=o.value?o.value:o.defaultValue,o=g({},o,{value:void 0});else if("option"===a){l=this.currentSelectValue;var u=d(o.children);if(null!=l){var f=null!=o.value?o.value+"":u;if(i=!1,Array.isArray(l)){for(var m=0;m<l.length;m++)if(""+l[m]===f){i=!0;break}}else i=""+l===f;o=g({selected:void 0,children:void 0},o,{selected:i,children:u})}}(i=o)&&(G[a]&&(null!=i.children||null!=i.dangerouslySetInnerHTML)&&r("137",a,$()),null!=i.dangerouslySetInnerHTML&&(null!=i.children&&r("60"),"object"===typeof i.dangerouslySetInnerHTML&&"__html"in i.dangerouslySetInnerHTML||r("61")),null!=i.style&&"object"!==typeof i.style&&r("62",$())),i=o,l=this.makeStaticMarkup,u=1===this.stack.length,f="<"+e.type;for(E in i)if(i.hasOwnProperty(E)){var v=i[E];if(null!=v){if("style"===E){m=void 0;var y="",b="";for(m in v)if(v.hasOwnProperty(m)){var x=0===m.indexOf("--"),w=v[m];null!=w&&(y+=b+ee(m)+":",b=m,x=null==w||"boolean"===typeof w||""===w?"":x||"number"!==typeof w||0===w||Z.hasOwnProperty(b)&&Z[b]?(""+w).trim():w+"px",y+=x,b=";")}v=y||null}m=null;e:if(x=a,w=i,-1===x.indexOf("-"))x="string"===typeof w.is;else switch(x){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":x=!1;break e;default:x=!0}x?te.hasOwnProperty(E)||(m=E,m=c(m)&&null!=v?m+'="'+s(v)+'"':""):m=p(E,v),m&&(f+=" "+m)}}l||u&&(f+=' data-reactroot=""');var E=f;i="",W.hasOwnProperty(a)?E+="/>":(E+=">",i="</"+e.type+">");e:{if(null!=(l=o.dangerouslySetInnerHTML)){if(null!=l.__html){l=l.__html;break e}}else if("string"===typeof(l=o.children)||"number"===typeof l){l=s(l);break e}l=null}return null!=l?(o=[],X[a]&&"\n"===l.charAt(0)&&(E+="\n"),E+=l):o=Y(o.children),e=e.type,n=null==n||"http://www.w3.org/1999/xhtml"===n?h(e):"http://www.w3.org/2000/svg"===n&&"foreignObject"===e?"http://www.w3.org/1999/xhtml":n,this.stack.push({domNamespace:n,tag:a,children:o,childIndex:0,context:t,footer:i}),this.previousWasTextNode=!1,E},e}(),re={renderToString:function(e){return new ne(e,!1).read(1/0)},renderToStaticMarkup:function(e){return new ne(e,!0).read(1/0)},renderToNodeStream:function(){r("207")},renderToStaticNodeStream:function(){r("208")},version:"16.2.0"},ae=Object.freeze({default:re}),oe=ae&&re||ae;e.exports=oe.default?oe.default:oe},147:function(e,t,n){"use strict";function r(e){return a(e).replace(o,"-ms-")}var a=n(148),o=/^ms-/;e.exports=r},148:function(e,t,n){"use strict";function r(e){return e.replace(a,"-$1").toLowerCase()}var a=/([A-Z])/g;e.exports=r},149:function(e,t,n){"use strict";function r(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}e.exports=r},64:function(e,t,n){"use strict";function r(e){var t=e.toString(),n=t.length,r=Number(e);return 1===n&&0!==r?-1:(2!==n||/^(0)(8|7|9)/.test(e))&&(3!==n||/^0(8|(7|9)(?!1))(0|1)/.test(e))&&(4!==n||/^0(8|(7|9)(?!1))(0(?!0)|1)[0-9]/.test(e))?n>4&&n<=11&&!/^0(8|(7|9)(?!1))(0(?!0)|1)[0-9]/.test(e)?-1:n>11?e.slice(0,11):e:-1}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},78:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),l=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(l).then(function(e){r("next",e)},function(e){r("throw",e)});e(l)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=n(29),u=n.n(l),s=n(5),c=n.n(s),p=n(64),h=n(145),f=(n.n(h),n(16)),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.rows=n.rows.bind(n),n.info=n.info.bind(n),n.done=n.done.bind(n),n.form=n.form.bind(n),n.onChange=n.onChange.bind(n),n.submitForm=n.submitForm.bind(n),n.submitMail=n.submitMail.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.state={button:!1,customer:n.props.customer,submit:!1,invoiceNumber:0},n}return i(t,e),d(t,[{key:"componentWillMount",value:function(){var e=this;fetch("http://sisiadire.io:8080/req",{method:"POST",body:JSON.stringify({type:"getInvoiceNumber",params:""})}).then(function(e){return e.json()}).then(function(t){return e.setState({invoiceNumber:t})}).catch(function(e){return console.log(e)})}},{key:"handleSubmit",value:function(){function e(e){return t.apply(this,arguments)}var t=r(u.a.mark(function e(t){var n,r,a=this;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),t.persist(),this.setState({submit:!0}),n=!1,r=!1;case 4:return e.next=6,this.submitMail();case 6:return r=e.sent,e.next=9,this.submitForm();case 9:n=e.sent,console.log(r,n);case 11:if(!n){e.next=4;break}case 12:n&&setTimeout(function(){a.setState({submit:!0}),a.props.empty(!1),a.props.upload({_name:"",email:"",phone:""})},3e4);case 13:case"end":return e.stop()}},e,this)}));return e}()},{key:"submitMail",value:function(){function e(){return t.apply(this,arguments)}var t=r(u.a.mark(function e(){var t,n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.done(),n=void 0,t=Object(h.renderToString)(t).replace(/<!-- -->/g,""),e.next=4,fetch("http://sisiadire.io:8080/mail",{method:"POST",body:JSON.stringify({record:t})}).then(function(e){return e.json()});case 4:return n=e.sent,console.log(n),e.abrupt("return",n);case 7:case"end":return e.stop()}},e,this)}));return e}()},{key:"submitForm",value:function(){function e(){return t.apply(this,arguments)}var t=r(u.a.mark(function e(){var t,n,r,a,o;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=0,n="",r=this.state.invoiceNumber,this.props.cart.map(function(e,r,a){return t+=e.cost,n+=e.title+"("+e.quantity+"pc"+(e.quantity>1?"s":"")+"), ",null}),n=n.slice(0,n.length-2),a=Object.assign({invoice:r,products:n,cost:t},this.state.customer),a.name=a._name,delete a._name,e.next=8,fetch("http://sisiadire.io:8080/req",{method:"POST",body:JSON.stringify({type:"addInvoice",params:a})}).then(function(e){return e.json()});case 8:return o=e.sent,console.log(o),e.abrupt("return",o[0].invoice===r);case 11:case"end":return e.stop()}},e,this)}));return e}()},{key:"onChange",value:function(e){switch(e.persist(),e.target.type){case"text":this.setState(function(t){var n=t.customer;return n._name=e.target.value,{customer:n}});break;case"email":this.setState(function(t){var n=t.customer;return n.email=e.target.value,{customer:n}});break;default:this.setState(function(t){var n=Object.assign({},t.customer);n.phone=Object(p.default)(e.target.value);var r=11===n.phone.length;return n.phone<0?Object.assign({},t,{button:!1}):{customer:n,button:r}})}}},{key:"rows",value:function(){var e=0;return c.a.createElement("div",null,this.props.cart.map(function(t,n,r){return e+=t.cost,c.a.createElement(s.Fragment,{key:n},c.a.createElement("h5",null,t.title),c.a.createElement("div",null,c.a.createElement("span",null,"#",t.invoiceNumber),c.a.createElement("span",null,t.quantity," ",t.quantity>1?"pcs":"pc"),c.a.createElement("span",null,"\u20a6",t.cost)))}),c.a.createElement("div",{key:"x"},c.a.createElement("span",null,c.a.createElement("h5",null,"TOTAL")),c.a.createElement("span",null,c.a.createElement("h5",null,"\u20a6",e))))}},{key:"info",value:function(){var e=this.state.customer,t=e._name,n=e.phone,r=e.email;return c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("span",null,"Name:"),c.a.createElement("span",null,c.a.createElement("h5",null,t))),c.a.createElement("div",null,c.a.createElement("span",null,"Email:"),c.a.createElement("span",null,c.a.createElement("h5",null,r))),c.a.createElement("div",null,c.a.createElement("span",null,"Phone:"),c.a.createElement("span",null,c.a.createElement("h5",null,n))))}},{key:"done",value:function(){return c.a.createElement("main",{className:"order-received-tab"},c.a.createElement("h3",null,"ORDER RECEIVED"),c.a.createElement("h4",null,"#",this.state.invoiceNumber),this.rows(),c.a.createElement("h5",null,"Customer Details"),this.info(),c.a.createElement("a",{href:"/"},"CONTINUE SHOPPING"))}},{key:"form",value:function(){var e=this.state,t=e.customer,n=t._name,r=void 0===n?"":n,a=t.email,o=void 0===a?"":a,i=t.phone,l=void 0===i?"":i,u=e.button;return c.a.createElement("form",{onSubmit:this.handleSubmit,className:"info-form"},c.a.createElement("h3",null,"CONTACT DETAILS"),c.a.createElement("input",{type:"text",placeholder:"First name - Last name",value:r,spellCheck:"false",onChange:this.onChange,required:!0}),c.a.createElement("input",{type:"email",placeholder:"Email",value:o,spellCheck:"false",onChange:this.onChange,autoComplete:"email",required:!0}),c.a.createElement("input",{type:"number",placeholder:"Phone Number",value:l,onChange:this.onChange,autoComplete:"tel",required:!0}),this.state.submit?c.a.createElement(f.default,{name:"LoadingBar"}):c.a.createElement("button",{className:u?"ready":"freezed",type:u?"submit":"reset"},"Complete Order"))}},{key:"render",value:function(){return this.state.submit?this.done():this.form()}}]),t}(s.Component);t.default=m}});
//# sourceMappingURL=4.abedd421.chunk.js.map