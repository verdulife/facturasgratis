import{S as e,i as l,s,k as t,e as a,t as r,N as n,d as c,n as o,c as h,a as u,g as f,b as i,f as v,F as d,G as g,H as m,P as p,h as E,O as b,Q as x,R as A,T,U as _,V as R}from"../../chunks/vendor-b3872f44.js";import{b as P,u as I}from"../../chunks/stores-e47c0e86.js";import{t as O,m as N}from"../../chunks/utils-004f515d.js";function U(e,l,s){const t=e.slice();return t[10]=l[s],t}function C(e,l,s){const t=e.slice();return t[13]=l[s],t[15]=s,t}function F(e,l,s){const t=e.slice();return t[16]=l[s],t[15]=s,t}function L(e){let l,s,n,m,p,E,b,x,A,T,_;return{c(){l=a("div"),s=a("h2"),n=r("Primeros pasos"),m=t(),p=a("p"),E=r("Para poder empezar a generar facturas, primero tienes que rellenar tus datos"),b=t(),x=a("br"),A=t(),T=a("a"),_=r("RELLENAR DATOS"),this.h()},l(e){l=h(e,"DIV",{class:!0});var t=u(l);s=h(t,"H2",{});var a=u(s);n=f(a,"Primeros pasos"),a.forEach(c),m=o(t),p=h(t,"P",{});var r=u(p);E=f(r,"Para poder empezar a generar facturas, primero tienes que rellenar tus datos"),r.forEach(c),b=o(t),x=h(t,"BR",{}),A=o(t),T=h(t,"A",{href:!0,class:!0});var i=u(T);_=f(i,"RELLENAR DATOS"),i.forEach(c),t.forEach(c),this.h()},h(){i(T,"href","/ajustes"),i(T,"class","btn pri semi svelte-12bnxg1"),i(l,"class","first col acenter xfill svelte-12bnxg1")},m(e,t){v(e,l,t),d(l,s),d(s,n),d(l,m),d(l,p),d(p,E),d(l,b),d(l,x),d(l,A),d(l,T),d(T,_)},p:g,d(e){e&&c(l)}}}function w(e){let l,s,r;function n(e,l){return e[3].length<=0?S:D}let f=n(e),d=f(e),g=e[3],m=[];for(let t=0;t<g.length;t+=1)m[t]=k(U(e,g,t));return{c(){l=a("div"),d.c(),s=t(),r=a("ul");for(let e=0;e<m.length;e+=1)m[e].c();this.h()},l(e){l=h(e,"DIV",{class:!0});var t=u(l);d.l(t),t.forEach(c),s=o(e),r=h(e,"UL",{class:!0});var a=u(r);for(let l=0;l<m.length;l+=1)m[l].l(a);a.forEach(c),this.h()},h(){i(l,"class","list-filter col acenter xfill svelte-12bnxg1"),i(r,"class","bill-list col acenter xfill svelte-12bnxg1")},m(e,t){v(e,l,t),d.m(l,null),v(e,s,t),v(e,r,t);for(let l=0;l<m.length;l+=1)m[l].m(r,null)},p(e,s){if(f===(f=n(e))&&d?d.p(e,s):(d.d(1),d=f(e),d&&(d.c(),d.m(l,null))),8&s){let l;for(g=e[3],l=0;l<g.length;l+=1){const t=U(e,g,l);m[l]?m[l].p(t,s):(m[l]=k(t),m[l].c(),m[l].m(r,null))}for(;l<m.length;l+=1)m[l].d(1);m.length=g.length}},d(e){e&&c(l),d.d(),e&&c(s),e&&c(r),b(m,e)}}}function D(e){let l,s,n,g,m,p,E,P,I,O,U,L,w,D,S,k=N,y=[];for(let t=0;t<k.length;t+=1)y[t]=V(F(e,k,t));let H=e[5](),q=[];for(let t=0;t<H.length;t+=1)q[t]=j(C(e,H,t));return{c(){l=a("a"),s=r("NUEVA FACTURA"),n=t(),g=a("div"),m=a("input"),p=t(),E=a("select"),P=a("option"),I=r("Todos los meses");for(let e=0;e<y.length;e+=1)y[e].c();O=t(),U=a("select"),L=a("option"),w=r("Todos los años");for(let e=0;e<q.length;e+=1)q[e].c();this.h()},l(e){l=h(e,"A",{class:!0,href:!0});var t=u(l);s=f(t,"NUEVA FACTURA"),t.forEach(c),n=o(e),g=h(e,"DIV",{class:!0});var a=u(g);m=h(a,"INPUT",{type:!0,class:!0,placeholder:!0}),p=o(a),E=h(a,"SELECT",{class:!0});var r=u(E);P=h(r,"OPTION",{});var i=u(P);I=f(i,"Todos los meses"),i.forEach(c);for(let l=0;l<y.length;l+=1)y[l].l(r);r.forEach(c),O=o(a),U=h(a,"SELECT",{class:!0});var v=u(U);L=h(v,"OPTION",{});var d=u(L);w=f(d,"Todos los años"),d.forEach(c);for(let l=0;l<q.length;l+=1)q[l].l(v);v.forEach(c),a.forEach(c),this.h()},h(){i(l,"class","new-btn btn succ semi svelte-12bnxg1"),i(l,"href","/facturas/nueva"),i(m,"type","text"),i(m,"class","out grow"),i(m,"placeholder","Buscar factura"),P.__value="",P.value=P.__value,i(E,"class","out svelte-12bnxg1"),void 0===e[1]&&x((()=>e[7].call(E))),L.__value="",L.value=L.__value,i(U,"class","out svelte-12bnxg1"),void 0===e[2]&&x((()=>e[8].call(U))),i(g,"class","row xfill")},m(t,a){v(t,l,a),d(l,s),v(t,n,a),v(t,g,a),d(g,m),A(m,e[0]),d(g,p),d(g,E),d(E,P),d(P,I);for(let e=0;e<y.length;e+=1)y[e].m(E,null);T(E,e[1]),d(g,O),d(g,U),d(U,L),d(L,w);for(let e=0;e<q.length;e+=1)q[e].m(U,null);T(U,e[2]),D||(S=[_(m,"input",e[6]),_(E,"change",e[7]),_(U,"change",e[8])],D=!0)},p(e,l){if(1&l&&m.value!==e[0]&&A(m,e[0]),0&l){let s;for(k=N,s=0;s<k.length;s+=1){const t=F(e,k,s);y[s]?y[s].p(t,l):(y[s]=V(t),y[s].c(),y[s].m(E,null))}for(;s<y.length;s+=1)y[s].d(1);y.length=k.length}if(2&l&&T(E,e[1]),32&l){let s;for(H=e[5](),s=0;s<H.length;s+=1){const t=C(e,H,s);q[s]?q[s].p(t,l):(q[s]=j(t),q[s].c(),q[s].m(U,null))}for(;s<q.length;s+=1)q[s].d(1);q.length=H.length}4&l&&T(U,e[2])},d(e){e&&c(l),e&&c(n),e&&c(g),b(y,e),b(q,e),D=!1,R(S)}}}function S(e){let l,s;return{c(){l=a("a"),s=r("CREA TU PRIMERA FACTURA"),this.h()},l(e){l=h(e,"A",{class:!0,href:!0});var t=u(l);s=f(t,"CREA TU PRIMERA FACTURA"),t.forEach(c),this.h()},h(){i(l,"class","btn succ semi"),i(l,"href","/facturas/nueva")},m(e,t){v(e,l,t),d(l,s)},p:g,d(e){e&&c(l)}}}function V(e){let l,s,t,n=e[16]+"";return{c(){l=a("option"),s=r(n),this.h()},l(e){l=h(e,"OPTION",{});var t=u(l);s=f(t,n),t.forEach(c),this.h()},h(){l.__value=t=e[15],l.value=l.__value},m(e,t){v(e,l,t),d(l,s)},p:g,d(e){e&&c(l)}}}function j(e){let l,s,t,n=e[13]+"";return{c(){l=a("option"),s=r(n),this.h()},l(e){l=h(e,"OPTION",{});var t=u(l);s=f(t,n),t.forEach(c),this.h()},h(){l.__value=t=e[15],l.value=l.__value},m(e,t){v(e,l,t),d(l,s)},p:g,d(e){e&&c(l)}}}function k(e){let l,s,n,g,m,p,b,x,A=e[10].client.legal_name+"",T=e[10].number+"";return{c(){l=a("li"),s=a("a"),n=r(A),g=t(),m=a("span"),p=r(T),x=t(),this.h()},l(e){l=h(e,"LI",{class:!0});var t=u(l);s=h(t,"A",{href:!0,class:!0});var a=u(s);n=f(a,A),g=o(a),m=h(a,"SPAN",{});var r=u(m);p=f(r,T),r.forEach(c),a.forEach(c),x=o(t),t.forEach(c),this.h()},h(){i(s,"href",b="/facturas/"+e[10]._id),i(s,"class","row jbetween xfill"),i(l,"class","box round row xfill")},m(e,t){v(e,l,t),d(l,s),d(s,n),d(s,g),d(s,m),d(m,p),d(l,x)},p(e,l){8&l&&A!==(A=e[10].client.legal_name+"")&&E(n,A),8&l&&T!==(T=e[10].number+"")&&E(p,T),8&l&&b!==(b="/facturas/"+e[10]._id)&&i(s,"href",b)},d(e){e&&c(l)}}}function y(e){let l,s,m,p,E,b,x,A,T,_=O[0].title+"",R=O[0].desc+"";function P(e,l){return void 0!==e[4].legal_name?w:L}let I=P(e),N=I(e);return{c(){l=t(),s=a("div"),m=a("section"),p=a("h1"),E=r(_),b=t(),x=a("p"),A=r(R),T=t(),N.c(),this.h()},l(e){n('[data-svelte="svelte-1xbu039"]',document.head).forEach(c),l=o(e),s=h(e,"DIV",{class:!0});var t=u(s);m=h(t,"SECTION",{class:!0});var a=u(m);p=h(a,"H1",{class:!0});var r=u(p);E=f(r,_),r.forEach(c),b=o(a),x=h(a,"P",{class:!0});var i=u(x);A=f(i,R),i.forEach(c),a.forEach(c),T=o(t),N.l(t),t.forEach(c),this.h()},h(){document.title="Facturas gratis | Facturas",i(p,"class","svelte-12bnxg1"),i(x,"class","svelte-12bnxg1"),i(m,"class","header col fcenter xfill svelte-12bnxg1"),i(s,"class","scroll")},m(e,t){v(e,l,t),v(e,s,t),d(s,m),d(m,p),d(p,E),d(m,b),d(m,x),d(x,A),d(s,T),N.m(s,null)},p(e,[l]){I===(I=P(e))&&N?N.p(e,l):(N.d(1),N=I(e),N&&(N.c(),N.m(s,null)))},i:g,o:g,d(e){e&&c(l),e&&c(s),N.d()}}}function H(e,l,s){let t,a,r,n,c;m(e,P,(e=>s(3,t=e))),m(e,I,(e=>s(4,a=e)));const o=(new Date).getFullYear(),h=()=>{let e=[];for(let l=t.reduce(((e,l)=>l.date.year<e?l.date.year:e),o);l<=o;l++)e.push(l);return e};return c=h().indexOf(o),[r,n,c,t,a,h,function(){r=this.value,s(0,r)},function(){n=p(this),s(1,n)},function(){c=p(this),s(2,c)}]}class q extends e{constructor(e){super(),l(this,e,H,y,s,{})}}export{q as default};
