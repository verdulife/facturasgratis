import{D as s,S as e,i as l,s as t,e as a,k as r,t as n,c,a as o,n as i,g as u,d as f,b as g,E as h,f as v,F as m,G as p,H as d,I as b,J as $,K as j,j as E,m as w,o as _,L as x,M as I,N as M,x as L,u as A,v as y}from"../chunks/vendor-f2c27089.js";import{u as G}from"../chunks/stores-2736cb01.js";const k={subscribe:e=>(()=>{const e=s("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)};function D(s,e,l){const t=s.slice();return t[5]=e[l],t}function N(s){let e,l,t;return{c(){e=a("img"),this.h()},l(s){e=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","user-img svelte-1nrfjse"),p(e.src,l=s[0].logo)||g(e,"src",l),g(e,"alt",t=s[0].legal_name||"Logotipo")},m(s,l){v(s,e,l)},p(s,a){1&a&&!p(e.src,l=s[0].logo)&&g(e,"src",l),1&a&&t!==(t=s[0].legal_name||"Logotipo")&&g(e,"alt",t)},d(s){s&&f(e)}}}function V(s){let e,l,t,p,d,b,$=s[5].title+"",j=s[5].title===s[0].legal_name&&s[0].logo&&N(s);return{c(){e=a("li"),l=a("a"),j&&j.c(),t=r(),p=n($),b=r(),this.h()},l(s){e=c(s,"LI",{class:!0});var a=o(e);l=c(a,"A",{href:!0,class:!0});var r=o(l);j&&j.l(r),t=i(r),p=u(r,$),r.forEach(f),b=i(a),a.forEach(f),this.h()},h(){g(l,"href",d=s[5].slug),g(l,"class","row acenter yfill"),g(e,"class","row acenter yfill svelte-1nrfjse"),h(e,"active",s[1].path===s[5].slug)},m(s,a){v(s,e,a),m(e,l),j&&j.m(l,null),m(l,t),m(l,p),m(e,b)},p(s,a){s[5].title===s[0].legal_name&&s[0].logo?j?j.p(s,a):(j=N(s),j.c(),j.m(l,t)):j&&(j.d(1),j=null),6&a&&h(e,"active",s[1].path===s[5].slug)},d(s){s&&f(e),j&&j.d()}}}function F(s){let e,l,t;return{c(){e=a("div"),l=a("img"),this.h()},l(s){e=c(s,"DIV",{class:!0});var t=o(e);l=c(t,"IMG",{class:!0,src:!0,alt:!0}),t.forEach(f),this.h()},h(){g(l,"class","fill"),p(l.src,t="/options.svg")||g(l,"src","/options.svg"),g(l,"alt","Menú"),g(e,"class","icon row fcenter svelte-1nrfjse")},m(s,t){v(s,e,t),m(e,l)},p:d,d(s){s&&f(e)}}}function O(s){let e,l,t;return{c(){e=a("img"),this.h()},l(s){e=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){g(e,"class","user-img svelte-1nrfjse"),p(e.src,l=s[0].logo)||g(e,"src",l),g(e,"alt",t=s[0].legal_name||"Logotipo")},m(s,l){v(s,e,l)},p(s,a){1&a&&!p(e.src,l=s[0].logo)&&g(e,"src",l),1&a&&t!==(t=s[0].legal_name||"Logotipo")&&g(e,"alt",t)},d(s){s&&f(e)}}}function H(s){let e,l,t,n,u,h,$,j,E=s[2],w=[];for(let a=0;a<E.length;a+=1)w[a]=V(D(s,E,a));function _(s,e){return s[0].logo?O:F}let x=_(s),I=x(s);return{c(){e=a("nav"),l=a("a"),t=a("img"),u=r(),h=a("ul");for(let s=0;s<w.length;s+=1)w[s].c();$=r(),j=a("a"),I.c(),this.h()},l(s){e=c(s,"NAV",{class:!0});var a=o(e);l=c(a,"A",{href:!0});var r=o(l);t=c(r,"IMG",{class:!0,src:!0,alt:!0}),r.forEach(f),u=i(a),h=c(a,"UL",{class:!0});var n=o(h);for(let e=0;e<w.length;e+=1)w[e].l(n);n.forEach(f),$=i(a),j=c(a,"A",{class:!0,href:!0});var g=o(j);I.l(g),g.forEach(f),a.forEach(f),this.h()},h(){g(t,"class","logo svelte-1nrfjse"),p(t.src,n="/logo.svg")||g(t,"src","/logo.svg"),g(t,"alt","facturasgratis"),g(l,"href","/"),g(h,"class","desktop-menu row yfill svelte-1nrfjse"),g(j,"class","mobile-menu row fcenter svelte-1nrfjse"),g(j,"href","/ajustes"),g(e,"class","row jbetween acenter xfill svelte-1nrfjse")},m(s,a){v(s,e,a),m(e,l),m(l,t),m(e,u),m(e,h);for(let e=0;e<w.length;e+=1)w[e].m(h,null);m(e,$),m(e,j),I.m(j,null)},p(s,[e]){if(7&e){let l;for(E=s[2],l=0;l<E.length;l+=1){const t=D(s,E,l);w[l]?w[l].p(t,e):(w[l]=V(t),w[l].c(),w[l].m(h,null))}for(;l<w.length;l+=1)w[l].d(1);w.length=E.length}x===(x=_(s))&&I?I.p(s,e):(I.d(1),I=x(s),I&&(I.c(),I.m(j,null)))},i:d,o:d,d(s){s&&f(e),b(w,s),I.d()}}}function J(s,e,l){let t,a;$(s,G,(s=>l(0,t=s))),$(s,k,(s=>l(1,a=s)));const r=[{slug:"/",title:"Inicio"},{slug:"/ajustes",title:t.legal_name||"Ajustes"}];return[t,a,r]}class K extends e{constructor(s){super(),l(this,s,J,H,t,{})}}function P(s){let e,l,t,h,p,d,b,$,G;l=new K({});const k=s[1].default,D=j(k,s,s[0],null);return{c(){e=a("main"),E(l.$$.fragment),t=r(),h=a("div"),D&&D.c(),p=r(),d=a("footer"),b=a("p"),$=n("Made with ♥ by verdu on 2021"),this.h()},l(s){e=c(s,"MAIN",{});var a=o(e);w(l.$$.fragment,a),t=i(a),h=c(a,"DIV",{class:!0});var r=o(h);D&&D.l(r),r.forEach(f),p=i(a),d=c(a,"FOOTER",{class:!0});var n=o(d);b=c(n,"P",{});var g=o(b);$=u(g,"Made with ♥ by verdu on 2021"),g.forEach(f),n.forEach(f),a.forEach(f),this.h()},h(){g(h,"class","view fill svelte-ripxix"),g(d,"class","row fcenter xfill svelte-ripxix")},m(s,a){v(s,e,a),_(l,e,null),m(e,t),m(e,h),D&&D.m(h,null),m(e,p),m(e,d),m(d,b),m(b,$),G=!0},p(s,[e]){D&&D.p&&(!G||1&e)&&x(D,k,s,s[0],G?M(k,s[0],e,null):I(s[0]),null)},i(s){G||(L(l.$$.fragment,s),L(D,s),G=!0)},o(s){A(l.$$.fragment,s),A(D,s),G=!1},d(s){s&&f(e),y(l),D&&D.d(s)}}}function R(s,e,l){let{$$slots:t={},$$scope:a}=e;return s.$$set=s=>{"$$scope"in s&&l(0,a=s.$$scope)},[a,t]}class S extends e{constructor(s){super(),l(this,s,R,P,t,{})}}export{S as default};