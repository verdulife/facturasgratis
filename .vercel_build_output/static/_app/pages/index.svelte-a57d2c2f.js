import{S as s,i as e,s as a,e as r,k as t,t as o,c,a as l,d as n,n as i,g as u,G as p,b as d,f,F as h,H as v,O as g,I as m}from"../chunks/vendor-46edfb2d.js";function b(s,e,a){const r=s.slice();return r[1]=e[a],r}function y(s){let e,a,g,m,b,y,E,P,H,D,F,I,x,C,G=s[1].title+"",j=s[1].desc+"";return{c(){e=r("li"),a=r("a"),g=r("div"),m=r("img"),E=t(),P=r("h2"),H=o(G),D=t(),F=r("p"),I=o(j),C=t(),this.h()},l(s){e=c(s,"LI",{class:!0});var r=l(e);a=c(r,"A",{href:!0});var t=l(a);g=c(t,"DIV",{class:!0});var o=l(g);m=c(o,"IMG",{src:!0,alt:!0}),o.forEach(n),E=i(t),P=c(t,"H2",{class:!0});var p=l(P);H=u(p,G),p.forEach(n),D=i(t),F=c(t,"P",{});var d=l(F);I=u(d,j),d.forEach(n),t.forEach(n),C=i(r),r.forEach(n),this.h()},h(){p(m.src,b=s[1].icon)||d(m,"src",b),d(m,"alt",y=s[1].title),d(g,"class","icon svelte-45tthb"),d(P,"class","svelte-45tthb"),d(a,"href",x=s[1].slug),d(e,"class","box round col acenter svelte-45tthb")},m(s,r){f(s,e,r),h(e,a),h(a,g),h(g,m),h(a,E),h(a,P),h(P,H),h(a,D),h(a,F),h(F,I),h(e,C)},p:v,d(s){s&&n(e)}}}function E(s){let e,a,p,E,P,H,D,F,I,x=s[0],C=[];for(let r=0;r<x.length;r+=1)C[r]=y(b(s,x,r));return{c(){e=t(),a=r("section"),p=r("h1"),E=o("Herramientas online para facturación y presupuestos"),P=t(),H=r("p"),D=o("Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos,\r\n    albaranes, clientes, proveedores y productos/servicios. No se necesita instalación."),F=t(),I=r("ul");for(let s=0;s<C.length;s+=1)C[s].c();this.h()},l(s){g('[data-svelte="svelte-mw7jhf"]',document.head).forEach(n),e=i(s),a=c(s,"SECTION",{class:!0});var r=l(a);p=c(r,"H1",{class:!0});var t=l(p);E=u(t,"Herramientas online para facturación y presupuestos"),t.forEach(n),P=i(r),H=c(r,"P",{class:!0});var o=l(H);D=u(o,"Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos,\r\n    albaranes, clientes, proveedores y productos/servicios. No se necesita instalación."),o.forEach(n),r.forEach(n),F=i(s),I=c(s,"UL",{class:!0});var d=l(I);for(let e=0;e<C.length;e+=1)C[e].l(d);d.forEach(n),this.h()},h(){document.title="Facturas gratis | Inicio",d(p,"class","svelte-45tthb"),d(H,"class","svelte-45tthb"),d(a,"class","header row fcenter xfill svelte-45tthb"),d(I,"class","tools row jcenter xfill svelte-45tthb")},m(s,r){f(s,e,r),f(s,a,r),h(a,p),h(p,E),h(a,P),h(a,H),h(H,D),f(s,F,r),f(s,I,r);for(let e=0;e<C.length;e+=1)C[e].m(I,null)},p(s,[e]){if(1&e){let a;for(x=s[0],a=0;a<x.length;a+=1){const r=b(s,x,a);C[a]?C[a].p(r,e):(C[a]=y(r),C[a].c(),C[a].m(I,null))}for(;a<C.length;a+=1)C[a].d(1);C.length=x.length}},i:v,o:v,d(s){s&&n(e),s&&n(a),s&&n(F),s&&n(I),m(C,s)}}}function P(s){return[[{slug:"/facturas",title:"Facturas",desc:"Genera y/o modifica facturas. Envíalas por correo electrónico y/o guárdalas en PDF.",icon:"facturas.svg"},{slug:"/presupuestos",title:"Presupuetos",desc:"Genera y/o modifica presupuestos. Envíalos por correo electrónico y/o guárdalos en PDF.",icon:"presupuestos.svg"},{slug:"/albaranes",title:"Albaranes",desc:"Genera y/o modifica albaranes. Envíalos por correo electrónico y/o guárdalos en PDF.",icon:"albaranes.svg"},{slug:"/clientes",title:"Clientes",desc:"Crea una lista de clientes. Después podrás usarlos en tus facturas, presupuestos y/o albaranes.",icon:"clientes.svg"},{slug:"/productos-servicios",title:"Productos/Servicios",desc:"Crea una lista de productos/servicios. Después podrás usarlos en tus facturas, presupuestos y/o albaranes.",icon:"productos-servicios.svg"},{slug:"/proveedores",title:"Proveedores",desc:"Crea una lista de proveedores. Así los tendrás su información de contacto siempre a mano.",icon:"proveedores.svg"}]]}class H extends s{constructor(s){super(),e(this,s,P,E,a,{})}}export{H as default};