import{S as s,i as e,s as a,e as r,k as t,t as o,c,a as l,d as n,n as i,g as u,G as p,b as d,f,F as v,H as h,O as g,I as b}from"../chunks/vendor-299282bd.js";function m(s,e,a){const r=s.slice();return r[1]=e[a],r}function y(s){let e,a,g,b,m,y,E,P,H,I,x,D,F,C,G=s[1].title+"",w=s[1].desc+"";return{c(){e=r("li"),a=r("a"),g=r("div"),b=r("img"),E=t(),P=r("h2"),H=o(G),I=t(),x=r("p"),D=o(w),C=t(),this.h()},l(s){e=c(s,"LI",{class:!0});var r=l(e);a=c(r,"A",{class:!0,href:!0});var t=l(a);g=c(t,"DIV",{class:!0});var o=l(g);b=c(o,"IMG",{src:!0,alt:!0}),o.forEach(n),E=i(t),P=c(t,"H2",{class:!0});var p=l(P);H=u(p,G),p.forEach(n),I=i(t),x=c(t,"P",{class:!0});var d=l(x);D=u(d,w),d.forEach(n),t.forEach(n),C=i(r),r.forEach(n),this.h()},h(){p(b.src,m=s[1].icon)||d(b,"src",m),d(b,"alt",y=s[1].title),d(g,"class","icon svelte-2ba15b"),d(P,"class","nowrap xfill svelte-2ba15b"),d(x,"class","svelte-2ba15b"),d(a,"class","fill"),d(a,"href",F=s[1].slug),d(e,"class","box round col acenter svelte-2ba15b")},m(s,r){f(s,e,r),v(e,a),v(a,g),v(g,b),v(a,E),v(a,P),v(P,H),v(a,I),v(a,x),v(x,D),v(e,C)},p:h,d(s){s&&n(e)}}}function E(s){let e,a,p,E,P,H,I,x,D,F,C=s[0],G=[];for(let r=0;r<C.length;r+=1)G[r]=y(m(s,C,r));return{c(){e=t(),a=r("div"),p=r("section"),E=r("h1"),P=o("Herramientas online para facturación y presupuestos"),H=t(),I=r("p"),x=o("Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos, albaranes, clientes, proveedores y productos/servicios. No se necesita instalación."),D=t(),F=r("ul");for(let s=0;s<G.length;s+=1)G[s].c();this.h()},l(s){g('[data-svelte="svelte-mw7jhf"]',document.head).forEach(n),e=i(s),a=c(s,"DIV",{class:!0});var r=l(a);p=c(r,"SECTION",{class:!0});var t=l(p);E=c(t,"H1",{class:!0});var o=l(E);P=u(o,"Herramientas online para facturación y presupuestos"),o.forEach(n),H=i(t),I=c(t,"P",{class:!0});var d=l(I);x=u(d,"Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos, albaranes, clientes, proveedores y productos/servicios. No se necesita instalación."),d.forEach(n),t.forEach(n),D=i(r),F=c(r,"UL",{class:!0});var f=l(F);for(let e=0;e<G.length;e+=1)G[e].l(f);f.forEach(n),r.forEach(n),this.h()},h(){document.title="Facturas gratis | Inicio",d(E,"class","svelte-2ba15b"),d(I,"class","svelte-2ba15b"),d(p,"class","header row fcenter xfill svelte-2ba15b"),d(F,"class","tools row jcenter xfill svelte-2ba15b"),d(a,"class","scroll")},m(s,r){f(s,e,r),f(s,a,r),v(a,p),v(p,E),v(E,P),v(p,H),v(p,I),v(I,x),v(a,D),v(a,F);for(let e=0;e<G.length;e+=1)G[e].m(F,null)},p(s,[e]){if(1&e){let a;for(C=s[0],a=0;a<C.length;a+=1){const r=m(s,C,a);G[a]?G[a].p(r,e):(G[a]=y(r),G[a].c(),G[a].m(F,null))}for(;a<G.length;a+=1)G[a].d(1);G.length=C.length}},i:h,o:h,d(s){s&&n(e),s&&n(a),b(G,s)}}}function P(s){return[[{slug:"/facturas",title:"Facturas",desc:"Genera y/o modifica facturas. Envíalas por correo electrónico y/o guárdalas en PDF.",icon:"facturas.svg"},{slug:"/presupuestos",title:"Presupuetos",desc:"Genera y/o modifica presupuestos. Envíalos por correo electrónico y/o guárdalos en PDF.",icon:"presupuestos.svg"},{slug:"/albaranes",title:"Albaranes",desc:"Genera y/o modifica albaranes. Envíalos por correo electrónico y/o guárdalos en PDF.",icon:"albaranes.svg"},{slug:"/clientes",title:"Clientes",desc:"Crea una lista de clientes. Después podrás usarlos en tus facturas, presupuestos y/o albaranes.",icon:"clientes.svg"},{slug:"/productos-servicios",title:"Productos/Servicios",desc:"Crea una lista de productos/servicios. Podrás usarlos en tus facturas, presupuestos y/o albaranes.",icon:"productos-servicios.svg"},{slug:"/proveedores",title:"Proveedores",desc:"Crea una lista de proveedores. Así los tendrás su información de contacto siempre a mano.",icon:"proveedores.svg"}]]}class H extends s{constructor(s){super(),e(this,s,P,E,a,{})}}export{H as default};
