"use strict";(self.webpackChunktomas_app=self.webpackChunktomas_app||[]).push([[405],{4405:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=a(5861),n=a(885),c=a(7757),s=a.n(c),l=a(2791),o=a(5705),i=a(3014),u=a(4483),d=a(3174),h=(a(7050),a(184)),p=function(e){var t=(0,h.jsx)(u.G,{icon:d.$aW}),a=e.caca,r=a.date,n=a.time,c=a.type,s=a.id,l=e.handleDelete,o=e.total,i=e.average;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{scope:"col",children:"Fecha"}),(0,h.jsx)("th",{scope:"col",children:"Hora"}),(0,h.jsx)("th",{scope:"col",children:"Tipo"}),(0,h.jsx)("th",{scope:"col",children:"Total Diario"}),(0,h.jsx)("th",{scope:"col",children:"Promedio"}),(0,h.jsx)("th",{scope:"col",children:"Borrar"})]})}),(0,h.jsx)("tbody",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{"data-label":"Fecha",children:r}),(0,h.jsx)("td",{"data-label":"Hora",children:n}),(0,h.jsx)("td",{"data-label":"Tipo",children:c}),(0,h.jsx)("td",{"data-label":"Total Diario",children:o}),(0,h.jsx)("td",{"data-label":"Promedio",children:i}),(0,h.jsx)("td",{"data-label":"Borrar",children:(0,h.jsx)("button",{onClick:function(){return l(s)},children:t})})]})})]})},x=function(e){var t=e.cacas,a=e.total,r=e.average,n=e.handleDelete;return(0,h.jsx)("div",{className:"wrap-table",children:(0,h.jsxs)("table",{children:[(0,h.jsx)("caption",{children:"Historial"}),t?t.map((function(e,t){return(0,h.jsx)(p,{caca:e,total:a,average:r,handleDelete:n},t)})):(0,h.jsx)("tbody",{})]})})},f=(a(3508),function(e){var t=e.db,a=(0,l.useState)(null),c=(0,n.Z)(a,2),u=c[0],d=c[1],p=(0,l.useState)(null),f=(0,n.Z)(p,2),m=f[0],j=f[1],v=(0,l.useState)(0),b=(0,n.Z)(v,2),y=b[0],g=b[1],N=(0,l.useCallback)((function(){if(u)return u.reduce((function(e,t){return e+1}),0)/u.length}),[u]);(0,l.useEffect)((function(){t&&D(t).then((function(e){return d(e)}))}),[t]),(0,l.useEffect)((function(){t&&k(t).then((function(e){return g(e)}))}),[t]),(0,l.useEffect)((function(){j(N())}),[u,N]);var w=function(){var e=(0,r.Z)(s().mark((function e(a){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.oe)((0,i.JU)(t,"cacas-v1",a));case 2:D(t).then((function(e){return d(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=(0,r.Z)(s().mark((function e(a){var r,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.type,n=crypto.randomUUID(),e.next=4,(0,i.pl)((0,i.JU)(t,"cacas-v1/",n),{id:n,date:(new Date).toLocaleDateString("es-ES"),type:r,time:(new Date).toLocaleTimeString(),timeStamp:i.EK.now()});case 4:D(t).then((function(e){return d(e)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=(0,r.Z)(s().mark((function e(t){var a,r,n,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(0,i.hJ)(t,"cacas-v1/"),r=(0,i.IO)(a,(0,i.Xo)("timeStamp","desc")),e.next=4,(0,i.PL)(r);case 4:return n=e.sent,c=n.docs.map((function(e){return e.data()})),e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,r.Z)(s().mark((function e(t){var a,r,n,c;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(0,i.hJ)(t,"cacas-v1/"),r=(0,i.IO)(a,(0,i.ar)("date","==",(new Date).toLocaleDateString("es-ES"))),e.next=4,(0,i.PL)(r);case 4:return n=e.sent,c=n.docs.map((function(e){return e.data()})),e.abrupt("return",c.length);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.J9,{initialValues:{type:""},validate:function(e){var t={};return e.type||(t.type="Required"),t},onSubmit:function(e,t){var a=t.setSubmitting;S(e),a(!1)},children:function(e){var t=e.errors,a=e.handleSubmit,r=e.isSubmitting;return(0,h.jsxs)("form",{onSubmit:a,children:[(0,h.jsxs)("div",{className:"col-s-12 col-xs-12",role:"group","aria-labelledby":"radio-tit",children:[(0,h.jsx)("div",{id:"radio-tit",children:"Caca"}),(0,h.jsxs)("label",{htmlFor:"type",className:"col-xs-12 col-s-6",children:["L\xedquida",(0,h.jsx)(o.gN,{type:"radio",name:"type",value:"liquid",className:"col-xs-6 col-s-6"})]}),(0,h.jsxs)("label",{htmlFor:"type",className:"col-xs-12 col-s-6",children:["Normal",(0,h.jsx)(o.gN,{type:"radio",name:"type",value:"normal",className:"col-xs-6 col-s-6"})]}),(0,h.jsxs)("label",{htmlFor:"type",className:"col-xs-12 col-s-6",children:["Pastosa",(0,h.jsx)(o.gN,{type:"radio",name:"type",value:"hard",className:"col-xs-6 col-s-6"})]}),(0,h.jsxs)("label",{htmlFor:"type",className:"col-xs-12 col-s-6",children:["Dura",(0,h.jsx)(o.gN,{type:"radio",name:"type",value:"hard",className:"col-xs-6 col-s-6"})]})]}),t.type&&(0,h.jsx)("span",{className:"error",children:t.type}),(0,h.jsx)("button",{type:"submit",className:"button-register",disabled:r,children:"Registrar caca"})]})}}),(0,h.jsx)(x,{cacas:u,total:y,average:m,handleDelete:w})]})})}}]);
//# sourceMappingURL=405.aec46a96.chunk.js.map