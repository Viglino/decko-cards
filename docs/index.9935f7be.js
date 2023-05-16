!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function t(e){return e&&e.__esModule?e.default:e}class a{constructor(e){this.defaultLanguage=e||"en",this.setLanguage(this.defaultLanguage)}}a.prototype.setLanguage=function(e){e&&(this.language=e,this[e]||(this[e]={}))},a.prototype.set=function(e,t){this[e]||(this[e]={});for(let a in t)this[e][a]=t[a]},a.prototype.template=function(e){e&&e.getAttribute&&(e.dataset.i18n?e.innerHTML=n(e.dataset.i18n):Array.prototype.forEach.call(e.querySelectorAll("[data-i18n]"),(e=>{e.innerHTML=n(e.dataset.i18n)})))};const o=new a;function n(e,t){return o[o.language][e]||o[o.defaultLanguage][e]||(t?"":e)}var r=n;o.set("en",{title:"Title",name:"name",color:"color",borderColor:"color",rotate:"rotate",scale:"scale",img_top:"position V",img_left:"position H",img_width:"size",img_height:"size",backgroundColor:"back color",backgroundSize:"size",backgroundPositionX:"position H",backgroundPositionY:"position V",front:"front",back:"back",duplicate:"duplicate",delete:"delete",ok:"OK",cancel:"Cancel"}),o.set("fr",{title:"Titre",name:"nom",color:"couleur",borderColor:"couleur",rotate:"tourner",scale:"taille",img_top:"position V",img_left:"position H",img_width:"taille",img_height:"taille",backgroundColor:"couleur de fond",backgroundSize:"taille",backgroundPositionX:"position H",backgroundPositionY:"position V",front:"face",back:"dos",duplicate:"dupliquer",delete:"supprimer",ok:"OK",cancel:"Annuler"}),o.setLanguage(navigator.language.split("-")[0]||"en");var s,l={};s=function(){"use strict";function t(e,t,a){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){s(o.response,t,a)},o.onerror=function(){console.error("could not download file")},o.send()}function a(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function o(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var n="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof e&&e.global===e?e:void 0,r=n.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=n.saveAs||("object"!=typeof window||window!==n?function(){}:"download"in HTMLAnchorElement.prototype&&!r?function(e,r,s){var l=n.URL||n.webkitURL,i=document.createElement("a");r=r||e.name||"download",i.download=r,i.rel="noopener","string"==typeof e?(i.href=e,i.origin===location.origin?o(i):a(i.href)?t(e,r,s):o(i,i.target="_blank")):(i.href=l.createObjectURL(e),setTimeout((function(){l.revokeObjectURL(i.href)}),4e4),setTimeout((function(){o(i)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,r){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,r),n);else if(a(e))t(e,n,r);else{var s=document.createElement("a");s.href=e,s.target="_blank",setTimeout((function(){o(s)}))}}:function(e,a,o,s){if((s=s||open("","_blank"))&&(s.document.title=s.document.body.innerText="downloading..."),"string"==typeof e)return t(e,a,o);var l="application/octet-stream"===e.type,i=/constructor/i.test(n.HTMLElement)||n.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||l&&i||r)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),s?s.location.href=e:location=e,s=null},d.readAsDataURL(e)}else{var p=n.URL||n.webkitURL,f=p.createObjectURL(e);s?s.location=f:location.href=f,s=null,setTimeout((function(){p.revokeObjectURL(f)}),4e4)}});n.saveAs=s.saveAs=s,l=s},"function"==typeof define&&define.amd?define([],s):s();const i={create:function(e,t){var a;if(t=t||{},"TEXT"===e)a=document.createTextNode(t.html||""),t.parent&&t.parent.appendChild(a);else for(var o in a=document.createElement(e),/button/i.test(e)&&a.setAttribute("type","button"),t)switch(o){case"className":t.className&&t.className.trim&&a.setAttribute("class",t.className.trim());break;case"text":a.innerText=t.text;break;case"html":t.html instanceof Element?a.appendChild(t.html):void 0!==t.html&&(a.innerHTML=t.html);break;case"parent":t.parent&&t.parent.appendChild(a);break;case"options":if(/select/i.test(e))for(var n in t.options)i.create("OPTION",{html:n,value:t.options[n],parent:a});break;case"style":i.setStyle(a,t.style);break;case"change":case"click":i.addListener(a,o,t[o]);break;case"on":for(var r in t.on)i.addListener(a,r,t.on[r]);break;case"checked":a.checked=!!t.checked;break;default:a.setAttribute(o,t[o])}return a},setHTML:function(e,t){t instanceof Element?e.appendChild(t):void 0!==t&&(e.innerHTML=t)},appendText:function(e,t){e.appendChild(document.createTextNode(t||""))},addListener:function(e,t,a,o){"string"==typeof t&&(t=t.split(" ")),t.forEach((function(t){e.addEventListener(t,a,o)}))},removeListener:function(e,t,a){"string"==typeof t&&(t=t.split(" ")),t.forEach((function(t){e.removeEventListener(t,a)}))},show:function(e){e.style.display=""},hide:function(e){e.style.display="none"},hidden:function(e){return"none"===e.getStyle(e,"display")},toggle:function(e){e.style.display="none"===e.style.display?"":"none"},setStyle:function(e,t){for(var a in t)switch(a){case"top":case"left":case"bottom":case"right":case"minWidth":case"maxWidth":case"width":case"height":"number"==typeof t[a]?e.style[a]=t[a]+"px":e.style[a]=t[a];break;default:e.style[a]=t[a]}},getStyle:function(e,t){var a,o=(e.ownerDocument||document).defaultView;if(o&&o.getComputedStyle)t=t.replace(/([A-Z])/g,"-$1").toLowerCase(),a=o.getComputedStyle(e,null).getPropertyValue(t);else if(e.currentStyle&&(t=t.replace(/-(\w)/g,(function(e,t){return t.toUpperCase()})),a=e.currentStyle[t],/^\d+(em|pt|%|ex)?$/i.test(a)))return function(t){var a=e.style.left,o=e.runtimeStyle.left;return e.runtimeStyle.left=e.currentStyle.left,e.style.left=t||0,t=e.style.pixelLeft+"px",e.style.left=a,e.runtimeStyle.left=o,t}(a);return/px$/.test(a)?parseInt(a):a},outerHeight:function(e){return e.offsetHeight+i.getStyle(e,"marginBottom")},outerWidth:function(e){return e.offsetWidth+i.getStyle(e,"marginLeft")},offsetRect:function(e){var t=e.getBoundingClientRect();return{top:t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:t.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0),height:t.height||t.bottom-t.top,width:t.width||t.right-t.left}},getFixedOffset:function(e){var t={left:0,top:0},a=function(e){if(!e)return t;if("absolute"===i.getStyle(e,"position")&&"none"!==i.getStyle(e,"transform")){var o=e.getBoundingClientRect();return t.left+=o.left,t.top+=o.top,t}return a(e.offsetParent)};return a(e.offsetParent)},positionRect:function(e,t){var a=0,o=0,n=function(r){if(r)return a+=r.offsetLeft,o+=r.offsetTop,n(r.offsetParent);var s={top:e.offsetTop+o,left:e.offsetLeft+a};return t&&(s.top-=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,s.left-=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0),s.bottom=s.top+e.offsetHeight,s.right=s.top+e.offsetWidth,s};return n(e.offsetParent)},scrollDiv:function(e,t){var a,o,n,r,s,l=!1,c=0,d=0,p="function"==typeof(t=t||{}).onmove?t.onmove:function(){},f=t.vertical?"screenY":"screenX",u=t.vertical?"scrollTop":"scrollLeft",m=!1,h=0,y=function(){s&&(h++,setTimeout(g))},g=function(){if(s){if(--h)return;var t=e.clientHeight,a=e.scrollHeight;o=t/a,s.style.height=100*o+"%",s.style.top=e.scrollTop/a*100+"%",r.style.height=t+"px",t>a-.5?r.classList.add("ol-100pc"):r.classList.remove("ol-100pc")}},v=function(t){t.target.classList.contains("ol-noscroll")||(m=!1,l=t[f],d=new Date,e.classList.add("ol-move"),t.preventDefault(),window.addEventListener("pointermove",b),i.addListener(window,["pointerup","pointercancel"],L))},b=function(t){if(!1!==l){var r=(n?-1/o:1)*(l-t[f]);m=m||Math.round(r),e[u]+=r,(a=new Date)-d&&(c=(c+r/(a-d))/2),l=t[f],d=a,r&&p(!0)}else m=!0},k=function(t){var a=t>0?Math.min(100,t/2):Math.max(-100,t/2);t-=a,e[u]+=a,-1<t&&t<1?(m?setTimeout((function(){e.classList.remove("ol-move")})):e.classList.remove("ol-move"),m=!1,p(!1)):setTimeout((function(){k(t)}),40)};if(t.vertical&&t.minibar){var w=function(a){e.removeEventListener("pointermove",w),e.parentNode.classList.add("ol-miniscroll"),s=i.create("DIV"),r=i.create("DIV",{className:"ol-scroll",html:s}),e.parentNode.insertBefore(r,e),s.addEventListener("pointerdown",(function(e){n=!0,v(e)})),t.mousewheel&&(i.addListener(r,["mousewheel","DOMMouseScroll","onmousewheel"],(function(e){E(e)})),i.addListener(s,["mousewheel","DOMMouseScroll","onmousewheel"],(function(e){E(e)}))),e.parentNode.addEventListener("pointerenter",y),window.addEventListener("resize",y),!1!==a&&y()};e.parentNode?w(!1):e.addEventListener("pointermove",w),e.addEventListener("scroll",(function(){y()}))}e.style["touch-action"]="none",e.style.overflow="hidden",e.classList.add("ol-scrolldiv"),i.addListener(e,["pointerdown"],(function(e){n=!1,v(e)})),e.addEventListener("click",(function(t){e.classList.contains("ol-move")&&(t.preventDefault(),t.stopPropagation())}),!0);var L=function(a){(d=new Date-d)>100||n?c=0:d>0&&(c=((c||0)+(l-a[f])/d)/2),k(!1===t.animate?0:200*c),l=!1,c=0,d=0,e.classList.contains("ol-move")?e.classList.remove("ol-hasClick"):(e.classList.add("ol-hasClick"),setTimeout((function(){e.classList.remove("ol-hasClick")}),500)),n=!1,window.removeEventListener("pointermove",b),i.removeListener(window,["pointerup","pointercancel"],L)},E=function(t){var a=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));return e.classList.add("ol-move"),e[u]-=30*a,e.classList.remove("ol-move"),!1};return t.mousewheel&&i.addListener(e,["mousewheel","DOMMouseScroll","onmousewheel"],E),{refresh:y}},dispatchEvent:function(e,t){var a;try{a=new CustomEvent(e)}catch(t){(a=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,{})}t.dispatchEvent(a)}};var c=i;const d=new class{constructor(e){this.element={},this.element.back=c.create("DIV",{"data-role":"dialog",parent:document.body}),this.element.form=c.create("FORM",{on:{submit:e=>{e.preventDefault()}},parent:this.element.back}),this.element.title=c.create("H2",{html:"title",parent:this.element.form}),c.create("DIV",{className:"closebox",html:"&times;",click:()=>{this.close()},parent:this.element.form}),this.element.content=c.create("DIV",{className:"content",parent:this.element.form}),this.element.buttons=c.create("DIV",{className:"buttons",parent:this.element.form}),this.close(),document.body.addEventListener("keydown",(e=>{"Escape"===e.key&&this.close()}))}close(){this.element.back.dataset.hidden=""}show(e){this.element.title.innerHTML=e.title,this.element.back.className=e.className||"",this.element.content.innerHTML="",this.element.content.appendChild(e.html),this.element.buttons.innerHTML="",Object.keys(e.buttons).forEach((t=>{c.create("BUTTON",{html:e.buttons[t],click:()=>{e.callback&&e.callback(t),this.close()},parent:this.element.buttons})})),delete this.element.back.dataset.hidden}};var p=d,f=[{file:"star.svg",author:"Viglino",keywords:["star","emoji","symbol"],url:"https://github.com/Viglino/decko-cards",copy:"CC-by-SA",id:"star",path:"./img/symbol/"},{file:"earth-eye.svg",author:"Viglino",keywords:["earth","eye","symbol"],url:"https://github.com/Viglino/decko-cards",copy:"CC-by-SA",id:"earth-eye",path:"./img/symbol/"},{file:"joker.svg",author:"Viglino",keywords:["joker","people"],url:"https://github.com/Viglino/decko-cards",copy:"CC-by-SA",id:"joker",path:"./img/people/"},{file:"joker-2.svg",author:"Viglino",keywords:["joker","people"],url:"https://github.com/Viglino/decko-cards",copy:"CC-by-SA",id:"joker-2",path:"./img/people/"}];var u=function(e){const t=c.create("DIV");f.forEach((a=>{c.create("IMG",{src:a.path+a.file,click:()=>{e(a.path+a.file),p.close()},parent:t})})),p.show({title:r("images"),html:t,className:"img",buttons:{cancel:r("cancel")}})};const m={role:{html:t('<front> <div data-prop="title"></div> <div data-prop="line"></div> <div data-prop="icon" class="centerX centerY"></div> <div data-prop="background"></div> <div data-prop="image"></div> <div data-prop="foreground"></div> <div data-prop="name"></div> <div data-prop="info"></div> </front><back> <div data-prop="logo" class="centerX centerY"></div> <div data-prop="deck" class="centerX"></div> </back>'),properties:{name:"roleTemplate",description:"roleDesc",properties:{title:{type:"text",default:"",style:{color:"#000000",backgroundColor:"#ffffff"}},line:{type:"lineh",collapse:!0,style:{color:"transparent"}},icon:{type:"image",default:"./img/none.svg",alt:["circle","box","image","hidden"],style:{img_width:90,borderColor:"transparent"}},image:{type:"image",default:"./img/none.svg",style:{img_width:50,img_top:50}},background:{type:"image",collapse:!0,style:{img_width:30,img_top:50,img_left:80}},foreground:{type:"image",collapse:!0,style:{img_width:30,img_top:50,img_left:20}},name:{type:"text",default:"name",style:{color:"#000000",backgroundColor:"#ffffff",transform:{init:"translateX(-50%)",scale:1,rotate:0}}},info:{type:"textarea",fontSize:4,default:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam vel lorem suscipit sagittis non ac justo. Aenean volutpat purus vitae metus aliquam ultrices. Suspendisse rhoncus odio sit amet ex malesuada tincidunt."}},back:{logo:{type:"image",default:"./img/none.svg",alt:["box","circle","hidden"],style:{img_width:60}},deck:{type:"text",default:"name",style:{color:"#000000",backgroundColor:"transparent",transform:{init:"translateX(-50%)",scale:1,rotate:0}}}}}}};for(let e in m)m[e].properties.html=m[e].html,m[e]=m[e].properties;var h=m;function y(e){return e.replace(/\n/g,"<br/>")}function g(e,t){const a=[];Object.keys(t).forEach((e=>{switch(e){case"init":a.push(t[e]);break;case"rotate":case"skewX":case"skewY":a.push(e+"("+t[e]+"deg)");break;case"scale":a.push(e+"("+t[e]+")")}})),e.style.transform=a.join(" ")}class v{constructor(e){const t=h[(e=e||{}).templates]?e.templates:"role",a=h[t];this.element=c.create("CARD",{html:a.html,parent:e.parent}),this.element.dataset.template=t,this.borderElt=c.create("DIV",{className:"border",parent:this.element.querySelector("front")}),this.backElt=c.create("DIV",{className:"border",parent:this.element.querySelector("back")}),this.properties=JSON.parse(JSON.stringify(e.properties||a.properties)),this.back=JSON.parse(JSON.stringify(e.back||a.back)),this.style=JSON.parse(JSON.stringify(e.style||{})),this.render()}}v.prototype.export=function(){return JSON.stringify({template:this.element.dataset.template,properties:this.properties,back:this.back,style:this.style})},v.prototype.clone=function(){const e=new v;return e.properties=JSON.parse(JSON.stringify(this.properties)),e.back=JSON.parse(JSON.stringify(this.back)),e.style=JSON.parse(JSON.stringify(this.style)),e.render(),e},v.prototype.copy=function(){const e=this.element.cloneNode();return e.innerHTML=this.element.innerHTML,e},v.prototype.render=function(){this.borderElt.style.color=this.style.borderColor||"#fff",this.backElt.style.backgroundColor=this.style.backColor||"#fff",this.backElt.style.color=this.style.hatchColor||"#fff",this.backElt.dataset.hatch=this.style.hach,this.renderProp(this.properties),this.renderProp(this.back)},v.prototype.renderProp=function(e){Object.keys(e).forEach((t=>{const a=this.element.querySelector('[data-prop="'+t+'"]');if(!a)return;const o=e[t];switch(o.hasOwnProperty("visibility")&&(!1===o.visibility?a.style.display="none":a.style.display=""),a.dataset.type=o.type,a.dataset.alt=o.altVal,o.type){case"text":case"textarea":{const e=void 0!==o.value?o.value:r(o.default)||"";a.innerHTML="";c.create("P",{style:{fontSize:o.fontSize+"em"},parent:a}).innerHTML=y(e);break}case"image":a.innerHTML="";c.create("IMG",{parent:a}).src=void 0!==o.value?o.value:o.default||"";break;case"lineh":break;default:console.warn("[BADTYPE] ",o.type)}o.style&&Object.keys(o.style).forEach((e=>{switch(e){case"transform":g(a,o.style[e]);break;case"img_top":case"img_left":case"img_width":a.querySelector("img").style[e.replace("img_","")]=o.style[e]+"%";break;default:a.style[e]=o.style[e]}}))}))},v.prototype.getForm=function(e){e.innerHTML="";const t=c.create("FRONT",{parent:e}),a=c.create("FIELDSET",{html:"<legend>Style</legend>",parent:t});c.create("LABEL",{html:r("borderColor"),parent:a}),c.create("INPUT",{type:"color",value:this.style.borderColor||"#ffffff",change:e=>{this.style.borderColor=e.target.value||"#ffffff",this.borderElt.style.color=this.style.borderColor||"#fff"},parent:a}),this.getFromProperties(this.properties,t);const o=c.create("BACK",{parent:e}),n=c.create("FIELDSET",{html:"<legend>Style</legend>",parent:o}),s=c.create("SELECT",{change:()=>{this.backElt.dataset.hatch=this.style.hach=s.value},parent:n});["solid","hatch","cross"].forEach((e=>{c.create("OPTION",{value:e,html:r(e),parent:s})})),c.create("INPUT",{type:"color",value:this.style.backColor||"#ffffff",change:e=>{this.style.hatchColor=e.target.value||"#ffffff",this.backElt.style.color=this.style.hatchColor||"#fff"},parent:n}),c.create("INPUT",{type:"color",value:this.style.backColor||"#ffffff",change:e=>{this.style.backColor=e.target.value||"#ffffff",this.backElt.style.backgroundColor=this.style.backColor||"#fff"},parent:n}),this.getFromProperties(this.back||{},o)},v.prototype.getFromProperties=function(e,t){Object.keys(e).forEach((a=>{const o=e[a],n=c.create("FIELDSET",{"data-type":o.type,parent:t});o.collapse?n.dataset.collapse="":delete n.dataset.collapse;c.create("LEGEND",{html:'<i class="expand"></i>'+r(a),parent:n}).querySelector("i").addEventListener("click",(()=>{o.collapse=!o.collapse,o.collapse?n.dataset.collapse="":delete n.dataset.collapse}));const s=this.element.querySelector('[data-prop="'+a+'"]');switch(o.type){case"text":case"textarea":c.create("textarea"===o.type?"TEXTAREA":"INPUT",{value:o.value||"",placeholder:r(a),type:"text",on:{keyup:e=>{o.value=e.target.value;const t=y(e.target.value);s.querySelector("p").innerHTML=t}},parent:n});break;case"image":{c.create("BUTTON",{className:"image",click:()=>{u((t=>{e.value=t,e.dispatchEvent(new Event("change"))}))},parent:n});const e=c.create("INPUT",{type:"url",className:"image",placeholder:"http://",value:o.value||"",change:e=>{o.value=e.target.value,s.querySelector("IMG").src=o.value},parent:n});break}}if(o.alt){const e=c.create("SELECT",{className:"alt",change:()=>{o.altVal=s.dataset.alt=e.value},parent:n});o.alt.forEach((t=>{const a=c.create("OPTION",{value:t,html:t,parent:e});o.altVal===t&&(a.selected=!0)}))}const l=Object.keys(o.style||{});if(l.length){const e=c.create("FIELDSET",{html:"<legend>Style</legend>",parent:n});l.forEach((t=>{const a="transform"!==t?c.create("LABEL",{html:r(t),parent:e}):null;switch(t){case"color":case"borderColor":case"backgroundColor":c.create("INPUT",{type:"color",value:o.style[t],change:e=>{s.style[t]=o.style[t]=e.target.value},parent:a});break;case"img_top":case"img_left":case"img_width":c.create("INPUT",{type:"range",className:"size",min:/width/.test(t)?20:-200,max:/width/.test(t)?200:300,value:o.style[t],on:{input:e=>{o.style[t]=e.target.value,s.querySelector("img").style[t.replace("img_","")]=o.style[t]+"%"}},parent:a});break;case"transform":Object.keys(o.style.transform).forEach((t=>{const a=c.create("LABEL",{html:r(t),parent:e});switch(t){case"scale":{const e=c.create("INPUT",{type:"range",min:.5,max:3,step:.1,value:o.style.transform[t],on:{input:e=>{o.style.transform[t]=e.target.value,g(s,o.style.transform)}},parent:a});c.create("BUTTON",{html:"↻",className:"reset",click:()=>{e.value=1,e.dispatchEvent(new Event("input"))},parent:a});break}case"skewY":case"rotate":{const e=c.create("INPUT",{type:"range",className:"angle",min:-10,max:10,step:.1,value:-1*o.style.transform[t],on:{input:e=>{o.style.transform[t]=-1*e.target.value,g(s,o.style.transform)}},parent:a});c.create("BUTTON",{html:"↻",className:"reset",click:()=>{e.value=0,e.dispatchEvent(new Event("input"))},parent:a});break}default:a.style.display="none"}}))}}))}}))};var b=v;const k=document.getElementById("card"),w=document.getElementById("form"),L=[];let E;const T=document.getElementById("cards");c.create("BUTTON",{html:"+",click:()=>{S()},parent:T});const N=c.create("UL",{parent:T});function S(e){e=e?e.clone():new b({template:"role"});const t={li:c.create("LI",{html:e.copy(),click:()=>{O(t)},parent:N}),card:e};L.push(t),O(t)}function O(e){if(E&&(E.li.innerHTML="",E.li.appendChild(E.card.copy()),L.forEach((e=>delete e.li.dataset.select))),k.innerHTML="",w.innerHTML="",E=e,!E)return;e.li.dataset.select="",k.appendChild(e.card.element);const t=c.create("BUTTON",{className:"fback",click:()=>{k.dataset.face=w.dataset.face="back"===k.dataset.face?"front":"back"},parent:k});c.create("SPAN",{html:r("front"),className:"front",parent:t}),c.create("SPAN",{html:r("back"),className:"back",parent:t}),c.create("BUTTON",{html:r("duplicate"),className:"duplicate",click:()=>{S(E.card)},parent:k}),c.create("BUTTON",{html:r("delete"),className:"delete",click:()=>{!function(e){const t=L.indexOf(e);L.splice(t,1),e.li.remove(),O(L[t-1]||L[t])}(E)},parent:k}),c.create("BUTTON",{html:r("save"),className:"save",click:()=>{const e={cards:[]};L.forEach((t=>e.cards.push(JSON.parse(t.card.export()))));var t=new Blob([JSON.stringify(e)],{type:"text/plain;charset=utf-8"});(0,l.saveAs)(t,"card.card")},parent:k}),e.card.getForm(w)}S()}();