import{S as s,i as a,s as e,e as l,c as r,b as c,D as t,f as o,d as i,k as f,t as h,a as n,n as u,g as v,E as p,F as m,h as x,G as d,H as g,I as E,j as w,m as L,o as I,J as $,K as A,L as b,x as j,u as y,v as P}from"../chunks/vendor-b3872f44.js";import{p as M}from"../chunks/stores-5d90ee18.js";import{u as _}from"../chunks/stores-e47c0e86.js";function k(s){let a,e,f;return{c(){a=l("img"),this.h()},l(s){a=r(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){c(a,"class","user-img svelte-x1eeu7"),t(a.src,e=s[1].logo)||c(a,"src",e),c(a,"alt",f=s[1].legal_name||"Logotipo")},m(s,e){o(s,a,e)},p(s,l){2&l&&!t(a.src,e=s[1].logo)&&c(a,"src",e),2&l&&f!==(f=s[1].legal_name||"Logotipo")&&c(a,"alt",f)},d(s){s&&i(a)}}}function G(s){let a,e,f;return{c(){a=l("div"),e=l("img"),this.h()},l(s){a=r(s,"DIV",{class:!0});var l=n(a);e=r(l,"IMG",{class:!0,src:!0,alt:!0}),l.forEach(i),this.h()},h(){c(e,"class","fill"),t(e.src,f="/options.svg")||c(e,"src","/options.svg"),c(e,"alt","Menú"),c(a,"class","icon row fcenter svelte-x1eeu7")},m(s,l){o(s,a,l),m(a,e)},p:d,d(s){s&&i(a)}}}function C(s){let a,e,f;return{c(){a=l("img"),this.h()},l(s){a=r(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){c(a,"class","user-img svelte-x1eeu7"),t(a.src,e=s[1].logo)||c(a,"src",e),c(a,"alt",f=s[1].legal_name||"Logotipo")},m(s,e){o(s,a,e)},p(s,l){2&l&&!t(a.src,e=s[1].logo)&&c(a,"src",e),2&l&&f!==(f=s[1].legal_name||"Logotipo")&&c(a,"alt",f)},d(s){s&&i(a)}}}function F(s){let a,e,g,E,w,L,I,$,A,b,j,y,P,M,_,F,D,H,U,V,N,O,J,K,R,S,T,q,z,B,Q,W,X,Y,Z,ss,as,es,ls,rs,cs,ts,os,is,fs,hs,ns,us,vs,ps,ms=(s[1].legal_name||"Ajustes")+"",xs=s[1].logo&&k(s);function ds(s,a){return s[1].logo?C:G}let gs=ds(s),Es=gs(s);return{c(){a=l("nav"),e=l("a"),g=l("img"),w=f(),L=l("ul"),I=l("li"),$=l("a"),A=h("Herramientas"),b=f(),j=l("li"),y=l("p"),P=h("Crear"),M=f(),_=l("ul"),F=l("li"),D=l("a"),H=h("Facturas"),U=f(),V=l("li"),N=l("a"),O=h("Presupuestos"),J=f(),K=l("li"),R=l("a"),S=h("Albaranes"),T=f(),q=l("li"),z=l("p"),B=h("Listas"),Q=f(),W=l("ul"),X=l("li"),Y=l("a"),Z=h("Clientes"),ss=f(),as=l("li"),es=l("a"),ls=h("Productos/servicios"),rs=f(),cs=l("li"),ts=l("a"),os=h("Proveedores"),is=f(),fs=l("li"),hs=l("a"),xs&&xs.c(),ns=f(),us=h(ms),vs=f(),ps=l("a"),Es.c(),this.h()},l(s){a=r(s,"NAV",{class:!0});var l=n(a);e=r(l,"A",{href:!0,class:!0});var c=n(e);g=r(c,"IMG",{class:!0,src:!0,alt:!0}),c.forEach(i),w=u(l),L=r(l,"UL",{class:!0});var t=n(L);I=r(t,"LI",{class:!0});var o=n(I);$=r(o,"A",{href:!0,class:!0});var f=n($);A=v(f,"Herramientas"),f.forEach(i),o.forEach(i),b=u(t),j=r(t,"LI",{class:!0});var h=n(j);y=r(h,"P",{});var p=n(y);P=v(p,"Crear"),p.forEach(i),M=u(h),_=r(h,"UL",{class:!0});var m=n(_);F=r(m,"LI",{class:!0});var x=n(F);D=r(x,"A",{href:!0,class:!0});var d=n(D);H=v(d,"Facturas"),d.forEach(i),x.forEach(i),U=u(m),V=r(m,"LI",{class:!0});var E=n(V);N=r(E,"A",{href:!0,class:!0});var k=n(N);O=v(k,"Presupuestos"),k.forEach(i),E.forEach(i),J=u(m),K=r(m,"LI",{class:!0});var G=n(K);R=r(G,"A",{href:!0,class:!0});var C=n(R);S=v(C,"Albaranes"),C.forEach(i),G.forEach(i),m.forEach(i),h.forEach(i),T=u(t),q=r(t,"LI",{class:!0});var ds=n(q);z=r(ds,"P",{});var gs=n(z);B=v(gs,"Listas"),gs.forEach(i),Q=u(ds),W=r(ds,"UL",{class:!0});var ws=n(W);X=r(ws,"LI",{class:!0});var Ls=n(X);Y=r(Ls,"A",{href:!0,class:!0});var Is=n(Y);Z=v(Is,"Clientes"),Is.forEach(i),Ls.forEach(i),ss=u(ws),as=r(ws,"LI",{class:!0});var $s=n(as);es=r($s,"A",{href:!0,class:!0});var As=n(es);ls=v(As,"Productos/servicios"),As.forEach(i),$s.forEach(i),rs=u(ws),cs=r(ws,"LI",{class:!0});var bs=n(cs);ts=r(bs,"A",{href:!0,class:!0});var js=n(ts);os=v(js,"Proveedores"),js.forEach(i),bs.forEach(i),ws.forEach(i),ds.forEach(i),is=u(t),fs=r(t,"LI",{class:!0});var ys=n(fs);hs=r(ys,"A",{href:!0,class:!0});var Ps=n(hs);xs&&xs.l(Ps),ns=u(Ps),us=v(Ps,ms),Ps.forEach(i),ys.forEach(i),t.forEach(i),vs=u(l),ps=r(l,"A",{class:!0,href:!0});var Ms=n(ps);Es.l(Ms),Ms.forEach(i),l.forEach(i),this.h()},h(){c(g,"class","logo svelte-x1eeu7"),t(g.src,E="/logo.svg")||c(g,"src","/logo.svg"),c(g,"alt","facturasgratis"),c(e,"href","/"),c(e,"class","row acenter"),c($,"href","/"),c($,"class","row acenter yfill"),c(I,"class","row acenter yfill svelte-x1eeu7"),p(I,"active","/"===s[0].path),c(D,"href","/facturas"),c(D,"class","row acenter fill"),c(F,"class","xfill svelte-x1eeu7"),c(N,"href","/presupuestos"),c(N,"class","row acenter fill"),c(V,"class","xfill svelte-x1eeu7"),c(R,"href","/albaranes"),c(R,"class","row acenter fill"),c(K,"class","xfill svelte-x1eeu7"),c(_,"class","expand-menu col svelte-x1eeu7"),c(j,"class","row acenter yfill svelte-x1eeu7"),p(j,"active","/facturas"===s[0].path||"/presupuestos"===s[0].path||"/albaranes"===s[0].path),c(Y,"href","/clientes"),c(Y,"class","row acenter fill"),c(X,"class","xfill svelte-x1eeu7"),c(es,"href","/productos-servicios"),c(es,"class","row acenter fill"),c(as,"class","xfill svelte-x1eeu7"),c(ts,"href","/proveedores"),c(ts,"class","row acenter fill"),c(cs,"class","xfill svelte-x1eeu7"),c(W,"class","expand-menu col svelte-x1eeu7"),c(q,"class","row acenter yfill svelte-x1eeu7"),p(q,"active","/clientes"===s[0].path||"/productos-servicios"===s[0].path||"/proveedores"===s[0].path),c(hs,"href","/ajustes"),c(hs,"class","row acenter yfill"),c(fs,"class","row acenter yfill svelte-x1eeu7"),p(fs,"active","/ajustes"===s[0].path),c(L,"class","desktop-menu row yfill svelte-x1eeu7"),c(ps,"class","mobile-menu row fcenter svelte-x1eeu7"),c(ps,"href","/ajustes"),c(a,"class","row jbetween acenter xfill svelte-x1eeu7")},m(s,l){o(s,a,l),m(a,e),m(e,g),m(a,w),m(a,L),m(L,I),m(I,$),m($,A),m(L,b),m(L,j),m(j,y),m(y,P),m(j,M),m(j,_),m(_,F),m(F,D),m(D,H),m(_,U),m(_,V),m(V,N),m(N,O),m(_,J),m(_,K),m(K,R),m(R,S),m(L,T),m(L,q),m(q,z),m(z,B),m(q,Q),m(q,W),m(W,X),m(X,Y),m(Y,Z),m(W,ss),m(W,as),m(as,es),m(es,ls),m(W,rs),m(W,cs),m(cs,ts),m(ts,os),m(L,is),m(L,fs),m(fs,hs),xs&&xs.m(hs,null),m(hs,ns),m(hs,us),m(a,vs),m(a,ps),Es.m(ps,null)},p(s,[a]){1&a&&p(I,"active","/"===s[0].path),1&a&&p(j,"active","/facturas"===s[0].path||"/presupuestos"===s[0].path||"/albaranes"===s[0].path),1&a&&p(q,"active","/clientes"===s[0].path||"/productos-servicios"===s[0].path||"/proveedores"===s[0].path),s[1].logo?xs?xs.p(s,a):(xs=k(s),xs.c(),xs.m(hs,ns)):xs&&(xs.d(1),xs=null),2&a&&ms!==(ms=(s[1].legal_name||"Ajustes")+"")&&x(us,ms),1&a&&p(fs,"active","/ajustes"===s[0].path),gs===(gs=ds(s))&&Es?Es.p(s,a):(Es.d(1),Es=gs(s),Es&&(Es.c(),Es.m(ps,null)))},i:d,o:d,d(s){s&&i(a),xs&&xs.d(),Es.d()}}}function D(s,a,e){let l,r;return g(s,M,(s=>e(0,l=s))),g(s,_,(s=>e(1,r=s))),[l,r]}class H extends s{constructor(s){super(),a(this,s,D,F,e,{})}}function U(s){let a,e,t,p,x,d,g,M,_;e=new H({});const k=s[1].default,G=E(k,s,s[0],null);return{c(){a=l("main"),w(e.$$.fragment),t=f(),p=l("div"),G&&G.c(),x=f(),d=l("footer"),g=l("p"),M=h("Made with ♥ by verdu on 2021"),this.h()},l(s){a=r(s,"MAIN",{});var l=n(a);L(e.$$.fragment,l),t=u(l),p=r(l,"DIV",{class:!0});var c=n(p);G&&G.l(c),c.forEach(i),x=u(l),d=r(l,"FOOTER",{class:!0});var o=n(d);g=r(o,"P",{});var f=n(g);M=v(f,"Made with ♥ by verdu on 2021"),f.forEach(i),o.forEach(i),l.forEach(i),this.h()},h(){c(p,"class","view fill svelte-ripxix"),c(d,"class","row fcenter xfill svelte-ripxix")},m(s,l){o(s,a,l),I(e,a,null),m(a,t),m(a,p),G&&G.m(p,null),m(a,x),m(a,d),m(d,g),m(g,M),_=!0},p(s,[a]){G&&G.p&&(!_||1&a)&&$(G,k,s,s[0],_?b(k,s[0],a,null):A(s[0]),null)},i(s){_||(j(e.$$.fragment,s),j(G,s),_=!0)},o(s){y(e.$$.fragment,s),y(G,s),_=!1},d(s){s&&i(a),P(e),G&&G.d(s)}}}function V(s,a,e){let{$$slots:l={},$$scope:r}=a;return s.$$set=s=>{"$$scope"in s&&e(0,r=s.$$scope)},[r,l]}class N extends s{constructor(s){super(),a(this,s,V,U,e,{})}}export{N as default};
