import{D as s,S as a,i as e,s as r,e as l,c,b as t,E as o,f as i,d as n,k as v,t as f,a as h,n as u,g as p,F as d,G as g,h as w,H as m,I as E,J as b,j as L,m as q,o as z,K as x,L as I,M as $,x as A,u as j,v as _}from"../chunks/vendor-54427261.js";import{u as y}from"../chunks/stores-617dcc58.js";const M={subscribe:a=>(()=>{const a=s("__svelte__");return{page:{subscribe:a.page.subscribe},navigating:{subscribe:a.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:a.navigating.subscribe}},session:a.session}})().page.subscribe(a)};function P(s){let a,e,r;return{c(){a=l("img"),this.h()},l(s){a=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){t(a,"class","user-img svelte-1vwzdqo"),o(a.src,e=s[1].logo)||t(a,"src",e),t(a,"alt",r=s[1].legal_name||"Logotipo")},m(s,e){i(s,a,e)},p(s,l){2&l&&!o(a.src,e=s[1].logo)&&t(a,"src",e),2&l&&r!==(r=s[1].legal_name||"Logotipo")&&t(a,"alt",r)},d(s){s&&n(a)}}}function G(s){let a,e,r;return{c(){a=l("div"),e=l("img"),this.h()},l(s){a=c(s,"DIV",{class:!0});var r=h(a);e=c(r,"IMG",{class:!0,src:!0,alt:!0}),r.forEach(n),this.h()},h(){t(e,"class","fill"),o(e.src,r="/options.svg")||t(e,"src","/options.svg"),t(e,"alt","Menú"),t(a,"class","icon row fcenter svelte-1vwzdqo")},m(s,r){i(s,a,r),g(a,e)},p:m,d(s){s&&n(a)}}}function k(s){let a,e,r;return{c(){a=l("img"),this.h()},l(s){a=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){t(a,"class","user-img svelte-1vwzdqo"),o(a.src,e=s[1].logo)||t(a,"src",e),t(a,"alt",r=s[1].legal_name||"Logotipo")},m(s,e){i(s,a,e)},p(s,l){2&l&&!o(a.src,e=s[1].logo)&&t(a,"src",e),2&l&&r!==(r=s[1].legal_name||"Logotipo")&&t(a,"alt",r)},d(s){s&&n(a)}}}function C(s){let a,e,r,E,b,L,q,z,x,I,$,A,j,_,y,M,C,F,D,H,U,V,N,O,J,K,R,S,T,B,Q,W,X,Y,Z,ss,as,es,rs,ls,cs,ts,os,is,ns,vs,fs,hs,us,ps,ds=(s[1].legal_name||"Ajustes")+"",gs=s[1].logo&&P(s);function ws(s,a){return s[1].logo?k:G}let ms=ws(s),Es=ms(s);return{c(){a=l("nav"),e=l("a"),r=l("img"),b=v(),L=l("ul"),q=l("li"),z=l("a"),x=f("Herramientas"),I=v(),$=l("li"),A=l("p"),j=f("Crear"),_=v(),y=l("ul"),M=l("li"),C=l("a"),F=f("Facturas"),D=v(),H=l("li"),U=l("a"),V=f("Presupuestos"),N=v(),O=l("li"),J=l("a"),K=f("Albaranes"),R=v(),S=l("li"),T=l("p"),B=f("Listas"),Q=v(),W=l("ul"),X=l("li"),Y=l("a"),Z=f("Clientes"),ss=v(),as=l("li"),es=l("a"),rs=f("Productos/servicios"),ls=v(),cs=l("li"),ts=l("a"),os=f("Proveedores"),is=v(),ns=l("li"),vs=l("a"),gs&&gs.c(),fs=v(),hs=f(ds),us=v(),ps=l("a"),Es.c(),this.h()},l(s){a=c(s,"NAV",{class:!0});var l=h(a);e=c(l,"A",{href:!0,class:!0});var t=h(e);r=c(t,"IMG",{class:!0,src:!0,alt:!0}),t.forEach(n),b=u(l),L=c(l,"UL",{class:!0});var o=h(L);q=c(o,"LI",{class:!0});var i=h(q);z=c(i,"A",{href:!0,class:!0});var v=h(z);x=p(v,"Herramientas"),v.forEach(n),i.forEach(n),I=u(o),$=c(o,"LI",{class:!0});var f=h($);A=c(f,"P",{});var d=h(A);j=p(d,"Crear"),d.forEach(n),_=u(f),y=c(f,"UL",{class:!0});var g=h(y);M=c(g,"LI",{class:!0});var w=h(M);C=c(w,"A",{href:!0,class:!0});var m=h(C);F=p(m,"Facturas"),m.forEach(n),w.forEach(n),D=u(g),H=c(g,"LI",{class:!0});var E=h(H);U=c(E,"A",{href:!0,class:!0});var P=h(U);V=p(P,"Presupuestos"),P.forEach(n),E.forEach(n),N=u(g),O=c(g,"LI",{class:!0});var G=h(O);J=c(G,"A",{href:!0,class:!0});var k=h(J);K=p(k,"Albaranes"),k.forEach(n),G.forEach(n),g.forEach(n),f.forEach(n),R=u(o),S=c(o,"LI",{class:!0});var ws=h(S);T=c(ws,"P",{});var ms=h(T);B=p(ms,"Listas"),ms.forEach(n),Q=u(ws),W=c(ws,"UL",{class:!0});var bs=h(W);X=c(bs,"LI",{class:!0});var Ls=h(X);Y=c(Ls,"A",{href:!0,class:!0});var qs=h(Y);Z=p(qs,"Clientes"),qs.forEach(n),Ls.forEach(n),ss=u(bs),as=c(bs,"LI",{class:!0});var zs=h(as);es=c(zs,"A",{href:!0,class:!0});var xs=h(es);rs=p(xs,"Productos/servicios"),xs.forEach(n),zs.forEach(n),ls=u(bs),cs=c(bs,"LI",{class:!0});var Is=h(cs);ts=c(Is,"A",{href:!0,class:!0});var $s=h(ts);os=p($s,"Proveedores"),$s.forEach(n),Is.forEach(n),bs.forEach(n),ws.forEach(n),is=u(o),ns=c(o,"LI",{class:!0});var As=h(ns);vs=c(As,"A",{href:!0,class:!0});var js=h(vs);gs&&gs.l(js),fs=u(js),hs=p(js,ds),js.forEach(n),As.forEach(n),o.forEach(n),us=u(l),ps=c(l,"A",{class:!0,href:!0});var _s=h(ps);Es.l(_s),_s.forEach(n),l.forEach(n),this.h()},h(){t(r,"class","logo svelte-1vwzdqo"),o(r.src,E="/logo.svg")||t(r,"src","/logo.svg"),t(r,"alt","facturasgratis"),t(e,"href","/"),t(e,"class","row acenter"),t(z,"href","/"),t(z,"class","row acenter yfill"),t(q,"class","row acenter yfill svelte-1vwzdqo"),d(q,"active","/"===s[0].path),t(C,"href","/facturas"),t(C,"class","row acenter fill"),t(M,"class","xfill svelte-1vwzdqo"),t(U,"href","/presupuestos"),t(U,"class","row acenter fill"),t(H,"class","xfill svelte-1vwzdqo"),t(J,"href","/albaranes"),t(J,"class","row acenter fill"),t(O,"class","xfill svelte-1vwzdqo"),t(y,"class","expand-menu col svelte-1vwzdqo"),t($,"class","row acenter yfill svelte-1vwzdqo"),d($,"active","/facturas"===s[0].path||"/presupuestos"===s[0].path||"/albaranes"===s[0].path),t(Y,"href","/clientes"),t(Y,"class","row acenter fill"),t(X,"class","xfill svelte-1vwzdqo"),t(es,"href","/productos-servicios"),t(es,"class","row acenter fill"),t(as,"class","xfill svelte-1vwzdqo"),t(ts,"href","/proveedores"),t(ts,"class","row acenter fill"),t(cs,"class","xfill svelte-1vwzdqo"),t(W,"class","expand-menu col svelte-1vwzdqo"),t(S,"class","row acenter yfill svelte-1vwzdqo"),d(S,"active","/clientes"===s[0].path||"/productos-servicios"===s[0].path||"/proveedores"===s[0].path),t(vs,"href","/ajustes"),t(vs,"class","row acenter yfill"),t(ns,"class","row acenter yfill svelte-1vwzdqo"),d(ns,"active","/ajustes"===s[0].path),t(L,"class","desktop-menu row yfill svelte-1vwzdqo"),t(ps,"class","mobile-menu row fcenter svelte-1vwzdqo"),t(ps,"href","/ajustes"),t(a,"class","row jbetween acenter xfill svelte-1vwzdqo")},m(s,l){i(s,a,l),g(a,e),g(e,r),g(a,b),g(a,L),g(L,q),g(q,z),g(z,x),g(L,I),g(L,$),g($,A),g(A,j),g($,_),g($,y),g(y,M),g(M,C),g(C,F),g(y,D),g(y,H),g(H,U),g(U,V),g(y,N),g(y,O),g(O,J),g(J,K),g(L,R),g(L,S),g(S,T),g(T,B),g(S,Q),g(S,W),g(W,X),g(X,Y),g(Y,Z),g(W,ss),g(W,as),g(as,es),g(es,rs),g(W,ls),g(W,cs),g(cs,ts),g(ts,os),g(L,is),g(L,ns),g(ns,vs),gs&&gs.m(vs,null),g(vs,fs),g(vs,hs),g(a,us),g(a,ps),Es.m(ps,null)},p(s,[a]){1&a&&d(q,"active","/"===s[0].path),1&a&&d($,"active","/facturas"===s[0].path||"/presupuestos"===s[0].path||"/albaranes"===s[0].path),1&a&&d(S,"active","/clientes"===s[0].path||"/productos-servicios"===s[0].path||"/proveedores"===s[0].path),s[1].logo?gs?gs.p(s,a):(gs=P(s),gs.c(),gs.m(vs,fs)):gs&&(gs.d(1),gs=null),2&a&&ds!==(ds=(s[1].legal_name||"Ajustes")+"")&&w(hs,ds),1&a&&d(ns,"active","/ajustes"===s[0].path),ms===(ms=ws(s))&&Es?Es.p(s,a):(Es.d(1),Es=ms(s),Es&&(Es.c(),Es.m(ps,null)))},i:m,o:m,d(s){s&&n(a),gs&&gs.d(),Es.d()}}}function F(s,a,e){let r,l;return E(s,M,(s=>e(0,r=s))),E(s,y,(s=>e(1,l=s))),[r,l]}class D extends a{constructor(s){super(),e(this,s,F,C,r,{})}}function H(s){let a,e,r,o,d,w,m,E,y;e=new D({});const M=s[1].default,P=b(M,s,s[0],null);return{c(){a=l("main"),L(e.$$.fragment),r=v(),o=l("div"),P&&P.c(),d=v(),w=l("footer"),m=l("p"),E=f("Made with ♥ by verdu on 2021"),this.h()},l(s){a=c(s,"MAIN",{});var l=h(a);q(e.$$.fragment,l),r=u(l),o=c(l,"DIV",{class:!0});var t=h(o);P&&P.l(t),t.forEach(n),d=u(l),w=c(l,"FOOTER",{class:!0});var i=h(w);m=c(i,"P",{});var v=h(m);E=p(v,"Made with ♥ by verdu on 2021"),v.forEach(n),i.forEach(n),l.forEach(n),this.h()},h(){t(o,"class","view fill svelte-ripxix"),t(w,"class","row fcenter xfill svelte-ripxix")},m(s,l){i(s,a,l),z(e,a,null),g(a,r),g(a,o),P&&P.m(o,null),g(a,d),g(a,w),g(w,m),g(m,E),y=!0},p(s,[a]){P&&P.p&&(!y||1&a)&&x(P,M,s,s[0],y?$(M,s[0],a,null):I(s[0]),null)},i(s){y||(A(e.$$.fragment,s),A(P,s),y=!0)},o(s){j(e.$$.fragment,s),j(P,s),y=!1},d(s){s&&n(a),_(e),P&&P.d(s)}}}function U(s,a,e){let{$$slots:r={},$$scope:l}=a;return s.$$set=s=>{"$$scope"in s&&e(0,l=s.$$scope)},[l,r]}class V extends a{constructor(s){super(),e(this,s,U,H,r,{})}}export{V as default};
