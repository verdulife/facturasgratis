import{S as s,i as l,s as a,e,k as r,t,c,a as o,n,g as i,d as h,D as f,b as u,E as v,f as g,F as m,G as p,h as d,H as x,I as E,J as w,K as $,x as I,r as L,u as A,w as j,L as M,M as k,N as y,j as b,m as _,o as G,O as H,P as D,Q as P,v as V}from"../chunks/vendor-1bb6e2c0.js";import{p as N}from"../chunks/stores-a06af009.js";import{u as O}from"../chunks/stores-dc0795db.js";import{t as U}from"../chunks/utils-004f515d.js";function F(s,l,a){const e=s.slice();return e[4]=l[a].slug,e[5]=l[a].title,e[6]=l[a].icon,e}function J(s,l,a){const e=s.slice();return e[4]=l[a].slug,e[5]=l[a].title,e[6]=l[a].icon,e}function K(s){let l,a,p,d,x,E,w,$,I,L,A=s[5]+"";return{c(){l=e("li"),a=e("a"),p=e("img"),E=r(),w=e("p"),$=t(A),L=r(),this.h()},l(s){l=c(s,"LI",{class:!0});var e=o(l);a=c(e,"A",{href:!0,class:!0});var r=o(a);p=c(r,"IMG",{src:!0,alt:!0,class:!0}),E=n(r),w=c(r,"P",{});var t=o(w);$=i(t,A),t.forEach(h),r.forEach(h),L=n(e),e.forEach(h),this.h()},h(){f(p.src,d=s[6])||u(p,"src",d),u(p,"alt",x=s[5]),u(p,"class","svelte-sr0x10"),u(a,"href",I=s[4]),u(a,"class","row nowrap acenter fill"),u(l,"class","xfill svelte-sr0x10"),v(l,"active",s[1].path===s[4])},m(s,e){g(s,l,e),m(l,a),m(a,p),m(a,E),m(a,w),m(w,$),m(l,L)},p(s,a){2&a&&v(l,"active",s[1].path===s[4])},d(s){s&&h(l)}}}function Q(s){let l,a,r;return{c(){l=e("img"),this.h()},l(s){l=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(l,"class","user-img svelte-sr0x10"),f(l.src,a=s[2].logo)||u(l,"src",a),u(l,"alt",r=s[2].legal_name||"Logotipo")},m(s,a){g(s,l,a)},p(s,e){4&e&&!f(l.src,a=s[2].logo)&&u(l,"src",a),4&e&&r!==(r=s[2].legal_name||"Logotipo")&&u(l,"alt",r)},d(s){s&&h(l)}}}function R(s){let l,a,f,v,I,L,A,j,M,y,b,_,G,H,D=(s[2].legal_name||"Ajustes")+"",P=U,V=[];for(let e=0;e<P.length;e+=1)V[e]=S(F(s,P,e));let N=s[2].logo&&T(s);return{c(){l=e("ul"),a=e("li"),f=e("a"),v=t("Herramientas"),I=r();for(let s=0;s<V.length;s+=1)V[s].c();L=r(),A=e("li"),j=e("a"),N&&N.c(),M=r(),y=t(D),this.h()},l(s){l=c(s,"UL",{class:!0});var e=o(l);a=c(e,"LI",{class:!0});var r=o(a);f=c(r,"A",{href:!0,class:!0});var t=o(f);v=i(t,"Herramientas"),t.forEach(h),r.forEach(h),I=n(e);for(let l=0;l<V.length;l+=1)V[l].l(e);L=n(e),A=c(e,"LI",{class:!0});var u=o(A);j=c(u,"A",{href:!0,class:!0});var g=o(j);N&&N.l(g),M=n(g),y=i(g,D),g.forEach(h),u.forEach(h),e.forEach(h),this.h()},h(){u(f,"href","/"),u(f,"class","row acenter yfill"),u(a,"class","row acenter xfill svelte-sr0x10"),u(j,"href","/ajustes"),u(j,"class","row acenter yfill"),u(A,"class","row acenter xfill svelte-sr0x10"),u(l,"class","scroll svelte-sr0x10")},m(e,r){g(e,l,r),m(l,a),m(a,f),m(f,v),m(l,I);for(let s=0;s<V.length;s+=1)V[s].m(l,null);m(l,L),m(l,A),m(A,j),N&&N.m(j,null),m(j,M),m(j,y),_=!0,G||(H=[p(a,"click",s[3]),p(A,"click",s[3])],G=!0)},p(s,a){if(10&a){let e;for(P=U,e=0;e<P.length;e+=1){const r=F(s,P,e);V[e]?V[e].p(r,a):(V[e]=S(r),V[e].c(),V[e].m(l,L))}for(;e<V.length;e+=1)V[e].d(1);V.length=P.length}s[2].logo?N?N.p(s,a):(N=T(s),N.c(),N.m(j,M)):N&&(N.d(1),N=null),(!_||4&a)&&D!==(D=(s[2].legal_name||"Ajustes")+"")&&d(y,D)},i(s){_||(x((()=>{b||(b=E(l,k,{},!0)),b.run(1)})),_=!0)},o(s){b||(b=E(l,k,{},!1)),b.run(0),_=!1},d(s){s&&h(l),w(V,s),N&&N.d(),s&&b&&b.end(),G=!1,$(H)}}}function S(s){let l,a,d,x,E,w,$,I,L,A,j=s[5]+"";return{c(){l=e("li"),a=e("a"),d=e("img"),E=r(),w=e("p"),$=t(j),this.h()},l(s){l=c(s,"LI",{class:!0});var e=o(l);a=c(e,"A",{href:!0,class:!0});var r=o(a);d=c(r,"IMG",{src:!0,alt:!0,class:!0}),E=n(r),w=c(r,"P",{});var t=o(w);$=i(t,j),t.forEach(h),r.forEach(h),e.forEach(h),this.h()},h(){f(d.src,x=s[6])||u(d,"src",x),u(d,"alt",s[5]),u(d,"class","svelte-sr0x10"),u(a,"href",I=s[4]),u(a,"class","row nowrap acenter fill"),u(l,"class","xfill svelte-sr0x10"),v(l,"active",s[1].path===s[4])},m(e,r){g(e,l,r),m(l,a),m(a,d),m(a,E),m(a,w),m(w,$),L||(A=p(l,"click",s[3]),L=!0)},p(s,a){2&a&&v(l,"active",s[1].path===s[4])},d(s){s&&h(l),L=!1,A()}}}function T(s){let l,a,r;return{c(){l=e("img"),this.h()},l(s){l=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(l,"class","user-img svelte-sr0x10"),f(l.src,a=s[2].logo)||u(l,"src",a),u(l,"alt",r=s[2].legal_name||"Logotipo")},m(s,a){g(s,l,a)},p(s,e){4&e&&!f(l.src,a=s[2].logo)&&u(l,"src",a),4&e&&r!==(r=s[2].legal_name||"Logotipo")&&u(l,"alt",r)},d(s){s&&h(l)}}}function q(s){let l,a,v,x,E,$,M,k,y,b,_,G,H,D,P,V,N,O,F,S,T,q,z,B,C,W=(s[2].legal_name||"Ajustes")+"",X=U,Y=[];for(let e=0;e<X.length;e+=1)Y[e]=K(J(s,X,e));let Z=s[2].logo&&Q(s),ss=s[0]&&R(s);return{c(){l=e("nav"),a=e("a"),v=e("img"),E=r(),$=e("ul"),M=e("li"),k=e("a"),y=t("Herramientas"),b=r(),_=e("ul");for(let s=0;s<Y.length;s+=1)Y[s].c();G=r(),H=e("li"),D=e("a"),Z&&Z.c(),P=r(),V=t(W),N=r(),O=e("div"),F=e("div"),S=e("img"),q=r(),ss&&ss.c(),this.h()},l(s){l=c(s,"NAV",{class:!0});var e=o(l);a=c(e,"A",{href:!0,class:!0});var r=o(a);v=c(r,"IMG",{class:!0,src:!0,alt:!0}),r.forEach(h),E=n(e),$=c(e,"UL",{class:!0});var t=o($);M=c(t,"LI",{class:!0});var f=o(M);k=c(f,"A",{href:!0,class:!0});var u=o(k);y=i(u,"Herramientas"),u.forEach(h),b=n(f),_=c(f,"UL",{class:!0});var g=o(_);for(let l=0;l<Y.length;l+=1)Y[l].l(g);g.forEach(h),f.forEach(h),G=n(t),H=c(t,"LI",{class:!0});var m=o(H);D=c(m,"A",{href:!0,class:!0});var p=o(D);Z&&Z.l(p),P=n(p),V=i(p,W),p.forEach(h),m.forEach(h),t.forEach(h),N=n(e),O=c(e,"DIV",{class:!0});var d=o(O);F=c(d,"DIV",{class:!0});var x=o(F);S=c(x,"IMG",{class:!0,src:!0,alt:!0}),x.forEach(h),q=n(d),ss&&ss.l(d),d.forEach(h),e.forEach(h),this.h()},h(){u(v,"class","logo svelte-sr0x10"),f(v.src,x="/logo.svg")||u(v,"src","/logo.svg"),u(v,"alt","facturasgratis"),u(a,"href","/"),u(a,"class","row acenter"),u(k,"href","/"),u(k,"class","row acenter yfill"),u(_,"class","expand-menu col svelte-sr0x10"),u(M,"class","row acenter yfill svelte-sr0x10"),u(D,"href","/ajustes"),u(D,"class","row acenter yfill"),u(H,"class","row acenter yfill svelte-sr0x10"),u($,"class","desktop-menu row yfill svelte-sr0x10"),u(S,"class","fill svelte-sr0x10"),f(S.src,T="menu.svg")||u(S,"src","menu.svg"),u(S,"alt","Menú"),u(F,"class","icon svelte-sr0x10"),u(O,"class","mobile-menu row yfill svelte-sr0x10"),u(l,"class","row jbetween acenter xfill svelte-sr0x10")},m(e,r){g(e,l,r),m(l,a),m(a,v),m(l,E),m(l,$),m($,M),m(M,k),m(k,y),m(M,b),m(M,_);for(let s=0;s<Y.length;s+=1)Y[s].m(_,null);m($,G),m($,H),m(H,D),Z&&Z.m(D,null),m(D,P),m(D,V),m(l,N),m(l,O),m(O,F),m(F,S),m(O,q),ss&&ss.m(O,null),z=!0,B||(C=p(F,"click",s[3]),B=!0)},p(s,[l]){if(2&l){let a;for(X=U,a=0;a<X.length;a+=1){const e=J(s,X,a);Y[a]?Y[a].p(e,l):(Y[a]=K(e),Y[a].c(),Y[a].m(_,null))}for(;a<Y.length;a+=1)Y[a].d(1);Y.length=X.length}s[2].logo?Z?Z.p(s,l):(Z=Q(s),Z.c(),Z.m(D,P)):Z&&(Z.d(1),Z=null),(!z||4&l)&&W!==(W=(s[2].legal_name||"Ajustes")+"")&&d(V,W),s[0]?ss?(ss.p(s,l),1&l&&I(ss,1)):(ss=R(s),ss.c(),I(ss,1),ss.m(O,null)):ss&&(L(),A(ss,1,1,(()=>{ss=null})),j())},i(s){z||(I(ss),z=!0)},o(s){A(ss),z=!1},d(s){s&&h(l),w(Y,s),Z&&Z.d(),ss&&ss.d(),B=!1,C()}}}function z(s,l,a){let e,r;M(s,N,(s=>a(1,e=s))),M(s,O,(s=>a(2,r=s)));let t=!1;return[t,e,r,function(){a(0,t=!t)}]}class B extends s{constructor(s){super(),l(this,s,z,q,a,{})}}function C(s){let l,a,f,v,p,d,x,E,w;a=new B({});const $=s[1].default,L=y($,s,s[0],null);return{c(){l=e("main"),b(a.$$.fragment),f=r(),v=e("div"),L&&L.c(),p=r(),d=e("footer"),x=e("p"),E=t("Made with ♥ by verdu on 2021"),this.h()},l(s){l=c(s,"MAIN",{});var e=o(l);_(a.$$.fragment,e),f=n(e),v=c(e,"DIV",{class:!0});var r=o(v);L&&L.l(r),r.forEach(h),p=n(e),d=c(e,"FOOTER",{class:!0});var t=o(d);x=c(t,"P",{});var u=o(x);E=i(u,"Made with ♥ by verdu on 2021"),u.forEach(h),t.forEach(h),e.forEach(h),this.h()},h(){u(v,"class","view fill svelte-ripxix"),u(d,"class","row fcenter xfill svelte-ripxix")},m(s,e){g(s,l,e),G(a,l,null),m(l,f),m(l,v),L&&L.m(v,null),m(l,p),m(l,d),m(d,x),m(x,E),w=!0},p(s,[l]){L&&L.p&&(!w||1&l)&&H(L,$,s,s[0],w?P($,s[0],l,null):D(s[0]),null)},i(s){w||(I(a.$$.fragment,s),I(L,s),w=!0)},o(s){A(a.$$.fragment,s),A(L,s),w=!1},d(s){s&&h(l),V(a),L&&L.d(s)}}}function W(s,l,a){let{$$slots:e={},$$scope:r}=l;return s.$$set=s=>{"$$scope"in s&&a(0,r=s.$$scope)},[r,e]}class X extends s{constructor(s){super(),l(this,s,W,C,a,{})}}export{X as default};
