import{S as a,i as e,s,e as l,t as r,c as t,a as o,g as c,d as i,b as n,f as d,F as h,h as f,G as u,T as p,k as v,n as m,H as E,W as g,X as b,_,D as I,Z as x,K as y,U as A,L as D,a0 as T,$ as N,V as L}from"../../chunks/vendor-1bb6e2c0.js";import{g as P}from"../../chunks/navigation-51f4a605.js";import{u as R,p as V,a as B,c as w,d as S,e as O,b as j}from"../../chunks/stores-dc0795db.js";import"../../chunks/singletons-12a22614.js";let U={usage:0};var C;U.usage=(C=new Blob(Object.values(localStorage)).size/1024,Math.round(100*(C+Number.EPSILON))/100);const{document:F}=T;function M(a){let e,s,u,p,v,m,E,g,b=U.usage+"",_=new Date(a[1]._updated).toLocaleDateString()+"";return{c(){e=l("p"),s=r("Peso: "),u=l("b"),p=r(b),v=r("kb"),m=r(" | Ultima actualizacion: "),E=l("b"),g=r(_),this.h()},l(a){e=t(a,"P",{class:!0});var l=o(e);s=c(l,"Peso: "),u=t(l,"B",{});var r=o(u);p=c(r,b),v=c(r,"kb"),r.forEach(i),m=c(l," | Ultima actualizacion: "),E=t(l,"B",{});var n=o(E);g=c(n,_),n.forEach(i),l.forEach(i),this.h()},h(){n(e,"class","svelte-1mh7dhf")},m(a,l){d(a,e,l),h(e,s),h(e,u),h(u,p),h(u,v),h(e,m),h(e,E),h(E,g)},p(a,e){2&e&&_!==(_=new Date(a[1]._updated).toLocaleDateString()+"")&&f(g,_)},d(a){a&&i(e)}}}function k(a){let e,s,f,v;return{c(){e=l("button"),s=r("DESCARGAR DATOS"),this.h()},l(a){e=t(a,"BUTTON",{class:!0});var l=o(e);s=c(l,"DESCARGAR DATOS"),l.forEach(i),this.h()},h(){n(e,"class","succ semi svelte-1mh7dhf")},m(l,r){d(l,e,r),h(e,s),f||(v=u(e,"click",a[3]),f=!0)},p:p,d(a){a&&i(e),f=!1,v()}}}function G(a){let e,s,f,p,I,A,D,T,N,L,P,R,V,B,w,S,O,j,U,C,F,M,k,G,H,X,z,J,Q,K,W,Z,Y,aa,ea,sa,la,ra,ta,oa,ca,ia,na,da,ha,fa,ua,pa,va,ma,Ea,ga,ba,_a,Ia,xa,ya,Aa,Da,Ta,Na,La,Pa,Ra,Va,Ba,wa,Sa,Oa,ja,Ua,Ca,Fa,Ma,ka,Ga,qa,$a,Ha,Xa,za,Ja,Qa,Ka,Wa,Za,Ya,ae,ee,se,le,re,te,oe,ce,ie,ne,de,he,fe,ue,pe,ve,me,Ee,ge,be,_e,Ie,xe,ye,Ae,De,Te,Ne,Le,Pe,Re,Ve,Be,we,Se,Oe,je,Ue,Ce,Fe,Me,ke,Ge,qe,$e,He,Xe,ze,Je,Qe,Ke,We,Ze,Ye,as,es,ss,ls,rs,ts,os,cs,is,ns,ds,hs,fs,us,ps=a[2].logo&&q(a),vs=a[2].logo&&$(a);return{c(){e=l("form"),s=l("div"),f=l("h2"),p=r("Logotipo"),I=v(),A=l("p"),D=r("Si usas logotipo en tus facturas, presupuestos o albaranes, aqui es el sitio."),T=v(),N=l("div"),L=l("label"),P=r("SUBIR IMÁGEN"),R=v(),ps&&ps.c(),V=v(),B=l("input"),w=v(),vs&&vs.c(),S=v(),O=l("div"),j=l("h2"),U=r("Datos legales"),C=v(),F=l("p"),M=r("Los campos marcados con un 👈 son obligatorios."),k=v(),G=l("div"),H=l("label"),X=r("Nombre fiscal 👈"),z=v(),J=l("input"),Q=v(),K=l("div"),W=l("label"),Z=r("CIF/NIF 👈"),Y=v(),aa=l("input"),ea=v(),sa=l("div"),la=l("h2"),ra=r("Dirección fiscal"),ta=v(),oa=l("p"),ca=r("Los campos marcados con un 👈 son obligatorios."),ia=v(),na=l("div"),da=l("div"),ha=l("label"),fa=r("Dirección fiscal 👈"),ua=v(),pa=l("input"),va=v(),ma=l("div"),Ea=l("label"),ga=r("Código postal 👈"),ba=v(),_a=l("input"),Ia=v(),xa=l("div"),ya=l("div"),Aa=l("label"),Da=r("Población 👈"),Ta=v(),Na=l("input"),La=v(),Pa=l("div"),Ra=l("label"),Va=r("País 👈"),Ba=v(),wa=l("input"),Sa=v(),Oa=l("div"),ja=l("h2"),Ua=r("Contacto"),Ca=v(),Fa=l("p"),Ma=r("Puedes rellenar ambos campos, pero con uno es suficiente."),ka=v(),Ga=l("div"),qa=l("label"),$a=r("Teléfono"),Ha=v(),Xa=l("input"),za=v(),Ja=l("div"),Qa=l("label"),Ka=r("Correo electrónico"),Wa=v(),Za=l("input"),Ya=v(),ae=l("div"),ee=l("h2"),se=r("Moneda e impuestos"),le=v(),re=l("p"),te=r("Si no rellenas el campo del IRPF, no lo aplicaremos."),oe=v(),ce=l("div"),ie=l("label"),ne=r("Moneda"),de=v(),he=l("select"),fe=l("option"),ue=r("€"),pe=l("option"),ve=r("$"),me=l("option"),Ee=r("£"),ge=l("option"),be=r("¥"),_e=l("option"),Ie=r("₹"),xe=v(),ye=l("div"),Ae=l("label"),De=r("IVA %"),Te=v(),Ne=l("input"),Le=v(),Pe=l("div"),Re=l("label"),Ve=r("IRPF %"),Be=v(),we=l("input"),Se=v(),Oe=l("div"),je=l("h2"),Ue=r("Notas"),Ce=v(),Fe=l("p"),Me=r("Añade notas a pie de tus facturas, presupuestos o albaranes."),ke=v(),Ge=l("div"),qe=l("label"),$e=r("Nota para facturas"),He=v(),Xe=l("textarea"),ze=v(),Je=l("div"),Qe=l("label"),Ke=r("Nota para presupuestos"),We=v(),Ze=l("textarea"),Ye=v(),as=l("div"),es=l("label"),ss=r("Nota para albarenes"),ls=v(),rs=l("textarea"),ts=v(),os=l("div"),cs=l("button"),is=r("GUARDAR DATOS"),ns=v(),ds=l("a"),hs=r("CANCELAR"),this.h()},l(a){e=t(a,"FORM",{class:!0});var l=o(e);s=t(l,"DIV",{class:!0});var r=o(s);f=t(r,"H2",{});var n=o(f);p=c(n,"Logotipo"),n.forEach(i),I=m(r),A=t(r,"P",{class:!0});var d=o(A);D=c(d,"Si usas logotipo en tus facturas, presupuestos o albaranes, aqui es el sitio."),d.forEach(i),T=m(r),N=t(r,"DIV",{class:!0});var h=o(N);L=t(h,"LABEL",{for:!0,class:!0});var u=o(L);P=c(u,"SUBIR IMÁGEN"),u.forEach(i),R=m(h),ps&&ps.l(h),h.forEach(i),V=m(r),B=t(r,"INPUT",{type:!0,id:!0,accept:!0,class:!0}),w=m(r),vs&&vs.l(r),r.forEach(i),S=m(l),O=t(l,"DIV",{class:!0});var v=o(O);j=t(v,"H2",{});var E=o(j);U=c(E,"Datos legales"),E.forEach(i),C=m(v),F=t(v,"P",{class:!0});var g=o(F);M=c(g,"Los campos marcados con un 👈 son obligatorios."),g.forEach(i),k=m(v),G=t(v,"DIV",{class:!0});var b=o(G);H=t(b,"LABEL",{for:!0,class:!0});var _=o(H);X=c(_,"Nombre fiscal 👈"),_.forEach(i),z=m(b),J=t(b,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),b.forEach(i),Q=m(v),K=t(v,"DIV",{class:!0});var x=o(K);W=t(x,"LABEL",{for:!0,class:!0});var y=o(W);Z=c(y,"CIF/NIF 👈"),y.forEach(i),Y=m(x),aa=t(x,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),x.forEach(i),v.forEach(i),ea=m(l),sa=t(l,"DIV",{class:!0});var q=o(sa);la=t(q,"H2",{});var $=o(la);ra=c($,"Dirección fiscal"),$.forEach(i),ta=m(q),oa=t(q,"P",{class:!0});var fs=o(oa);ca=c(fs,"Los campos marcados con un 👈 son obligatorios."),fs.forEach(i),ia=m(q),na=t(q,"DIV",{class:!0});var us=o(na);da=t(us,"DIV",{class:!0});var ms=o(da);ha=t(ms,"LABEL",{for:!0,class:!0});var Es=o(ha);fa=c(Es,"Dirección fiscal 👈"),Es.forEach(i),ua=m(ms),pa=t(ms,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),ms.forEach(i),va=m(us),ma=t(us,"DIV",{class:!0});var gs=o(ma);Ea=t(gs,"LABEL",{for:!0,class:!0});var bs=o(Ea);ga=c(bs,"Código postal 👈"),bs.forEach(i),ba=m(gs),_a=t(gs,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),gs.forEach(i),us.forEach(i),Ia=m(q),xa=t(q,"DIV",{class:!0});var _s=o(xa);ya=t(_s,"DIV",{class:!0});var Is=o(ya);Aa=t(Is,"LABEL",{for:!0,class:!0});var xs=o(Aa);Da=c(xs,"Población 👈"),xs.forEach(i),Ta=m(Is),Na=t(Is,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),Is.forEach(i),La=m(_s),Pa=t(_s,"DIV",{class:!0});var ys=o(Pa);Ra=t(ys,"LABEL",{for:!0,class:!0});var As=o(Ra);Va=c(As,"País 👈"),As.forEach(i),Ba=m(ys),wa=t(ys,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),ys.forEach(i),_s.forEach(i),q.forEach(i),Sa=m(l),Oa=t(l,"DIV",{class:!0});var Ds=o(Oa);ja=t(Ds,"H2",{});var Ts=o(ja);Ua=c(Ts,"Contacto"),Ts.forEach(i),Ca=m(Ds),Fa=t(Ds,"P",{class:!0});var Ns=o(Fa);Ma=c(Ns,"Puedes rellenar ambos campos, pero con uno es suficiente."),Ns.forEach(i),ka=m(Ds),Ga=t(Ds,"DIV",{class:!0});var Ls=o(Ga);qa=t(Ls,"LABEL",{for:!0,class:!0});var Ps=o(qa);$a=c(Ps,"Teléfono"),Ps.forEach(i),Ha=m(Ls),Xa=t(Ls,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),Ls.forEach(i),za=m(Ds),Ja=t(Ds,"DIV",{class:!0});var Rs=o(Ja);Qa=t(Rs,"LABEL",{for:!0,class:!0});var Vs=o(Qa);Ka=c(Vs,"Correo electrónico"),Vs.forEach(i),Wa=m(Rs),Za=t(Rs,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),Rs.forEach(i),Ds.forEach(i),Ya=m(l),ae=t(l,"DIV",{class:!0});var Bs=o(ae);ee=t(Bs,"H2",{});var ws=o(ee);se=c(ws,"Moneda e impuestos"),ws.forEach(i),le=m(Bs),re=t(Bs,"P",{class:!0});var Ss=o(re);te=c(Ss,"Si no rellenas el campo del IRPF, no lo aplicaremos."),Ss.forEach(i),oe=m(Bs),ce=t(Bs,"DIV",{class:!0});var Os=o(ce);ie=t(Os,"LABEL",{for:!0,class:!0});var js=o(ie);ne=c(js,"Moneda"),js.forEach(i),de=m(Os),he=t(Os,"SELECT",{id:!0,class:!0});var Us=o(he);fe=t(Us,"OPTION",{});var Cs=o(fe);ue=c(Cs,"€"),Cs.forEach(i),pe=t(Us,"OPTION",{});var Fs=o(pe);ve=c(Fs,"$"),Fs.forEach(i),me=t(Us,"OPTION",{});var Ms=o(me);Ee=c(Ms,"£"),Ms.forEach(i),ge=t(Us,"OPTION",{});var ks=o(ge);be=c(ks,"¥"),ks.forEach(i),_e=t(Us,"OPTION",{});var Gs=o(_e);Ie=c(Gs,"₹"),Gs.forEach(i),Us.forEach(i),Os.forEach(i),xe=m(Bs),ye=t(Bs,"DIV",{class:!0});var qs=o(ye);Ae=t(qs,"LABEL",{for:!0,class:!0});var $s=o(Ae);De=c($s,"IVA %"),$s.forEach(i),Te=m(qs),Ne=t(qs,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),qs.forEach(i),Le=m(Bs),Pe=t(Bs,"DIV",{class:!0});var Hs=o(Pe);Re=t(Hs,"LABEL",{for:!0,class:!0});var Xs=o(Re);Ve=c(Xs,"IRPF %"),Xs.forEach(i),Be=m(Hs),we=t(Hs,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),Hs.forEach(i),Bs.forEach(i),Se=m(l),Oe=t(l,"DIV",{class:!0});var zs=o(Oe);je=t(zs,"H2",{});var Js=o(je);Ue=c(Js,"Notas"),Js.forEach(i),Ce=m(zs),Fe=t(zs,"P",{class:!0});var Qs=o(Fe);Me=c(Qs,"Añade notas a pie de tus facturas, presupuestos o albaranes."),Qs.forEach(i),ke=m(zs),Ge=t(zs,"DIV",{class:!0});var Ks=o(Ge);qe=t(Ks,"LABEL",{for:!0,class:!0});var Ws=o(qe);$e=c(Ws,"Nota para facturas"),Ws.forEach(i),He=m(Ks),Xe=t(Ks,"TEXTAREA",{id:!0,class:!0,placeholder:!0}),o(Xe).forEach(i),Ks.forEach(i),ze=m(zs),Je=t(zs,"DIV",{class:!0});var Zs=o(Je);Qe=t(Zs,"LABEL",{for:!0,class:!0});var Ys=o(Qe);Ke=c(Ys,"Nota para presupuestos"),Ys.forEach(i),We=m(Zs),Ze=t(Zs,"TEXTAREA",{id:!0,class:!0,placeholder:!0}),o(Ze).forEach(i),Zs.forEach(i),Ye=m(zs),as=t(zs,"DIV",{class:!0});var al=o(as);es=t(al,"LABEL",{for:!0,class:!0});var el=o(es);ss=c(el,"Nota para albarenes"),el.forEach(i),ls=m(al),rs=t(al,"TEXTAREA",{id:!0,class:!0,placeholder:!0}),o(rs).forEach(i),al.forEach(i),zs.forEach(i),ts=m(l),os=t(l,"DIV",{class:!0});var sl=o(os);cs=t(sl,"BUTTON",{class:!0});var ll=o(cs);is=c(ll,"GUARDAR DATOS"),ll.forEach(i),ns=m(sl),ds=t(sl,"A",{href:!0,class:!0});var rl=o(ds);hs=c(rl,"CANCELAR"),rl.forEach(i),sl.forEach(i),l.forEach(i),this.h()},h(){n(A,"class","notice svelte-1mh7dhf"),n(L,"for","logo"),n(L,"class","file-btn svelte-1mh7dhf"),n(N,"class","row xfill"),n(B,"type","file"),n(B,"id","logo"),n(B,"accept","image/png, image/jpeg"),n(B,"class","xfill svelte-1mh7dhf"),n(s,"class","box round col xfill svelte-1mh7dhf"),n(F,"class","notice svelte-1mh7dhf"),n(H,"for","legal_name"),n(H,"class","svelte-1mh7dhf"),n(J,"type","text"),n(J,"id","legal_name"),n(J,"class","xfill svelte-1mh7dhf"),n(J,"placeholder","Ej. Factura Gratis S.L."),J.required=!0,n(G,"class","input-wrapper col xfill svelte-1mh7dhf"),n(W,"for","legal_id"),n(W,"class","svelte-1mh7dhf"),n(aa,"type","text"),n(aa,"id","legal_id"),n(aa,"class","xfill svelte-1mh7dhf"),n(aa,"placeholder","Ej. B00011100"),aa.required=!0,n(K,"class","input-wrapper col xfill svelte-1mh7dhf"),n(O,"class","box round col xfill svelte-1mh7dhf"),n(oa,"class","notice svelte-1mh7dhf"),n(ha,"for","street"),n(ha,"class","svelte-1mh7dhf"),n(pa,"type","text"),n(pa,"id","street"),n(pa,"class","xfill svelte-1mh7dhf"),n(pa,"placeholder","Ej. Calle Mayor, 18"),pa.required=!0,n(da,"class","input-wrapper col xhalf svelte-1mh7dhf"),n(Ea,"for","cp"),n(Ea,"class","svelte-1mh7dhf"),n(_a,"type","text"),n(_a,"id","cp"),n(_a,"class","xfill svelte-1mh7dhf"),n(_a,"placeholder","Ej. 08818"),_a.required=!0,n(ma,"class","input-wrapper col xhalf svelte-1mh7dhf"),n(na,"class","row xfill"),n(Aa,"for","city"),n(Aa,"class","svelte-1mh7dhf"),n(Na,"type","text"),n(Na,"id","city"),n(Na,"class","xfill svelte-1mh7dhf"),n(Na,"placeholder","Ej. Barcelona"),Na.required=!0,n(ya,"class","input-wrapper col xhalf svelte-1mh7dhf"),n(Ra,"for","country"),n(Ra,"class","svelte-1mh7dhf"),n(wa,"type","text"),n(wa,"id","country"),n(wa,"class","xfill svelte-1mh7dhf"),n(wa,"placeholder","Ej. España"),wa.required=!0,n(Pa,"class","input-wrapper col xhalf svelte-1mh7dhf"),n(xa,"class","row xfill"),n(sa,"class","box round col xfill svelte-1mh7dhf"),n(Fa,"class","notice svelte-1mh7dhf"),n(qa,"for","phone"),n(qa,"class","svelte-1mh7dhf"),n(Xa,"type","text"),n(Xa,"id","phone"),n(Xa,"class","xfill svelte-1mh7dhf"),n(Xa,"placeholder","Ej. 600 600 600"),n(Ga,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Qa,"for","email"),n(Qa,"class","svelte-1mh7dhf"),n(Za,"type","text"),n(Za,"id","email"),n(Za,"class","xfill svelte-1mh7dhf"),n(Za,"placeholder","Ej. hola@facturagratis.com"),n(Ja,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Oa,"class","box round col xfill svelte-1mh7dhf"),n(re,"class","notice svelte-1mh7dhf"),n(ie,"for","currency"),n(ie,"class","svelte-1mh7dhf"),fe.__value="€",fe.value=fe.__value,pe.__value="$",pe.value=pe.__value,me.__value="£",me.value=me.__value,ge.__value="¥",ge.value=ge.__value,_e.__value="₹",_e.value=_e.__value,n(he,"id","currency"),n(he,"class","xfill svelte-1mh7dhf"),he.required=!0,void 0===a[2].currency&&E((()=>a[16].call(he))),n(ce,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Ae,"for","iva"),n(Ae,"class","svelte-1mh7dhf"),n(Ne,"type","number"),n(Ne,"id","iva"),n(Ne,"class","xfill svelte-1mh7dhf"),n(Ne,"placeholder","Ej. 21"),Ne.required=!0,n(ye,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Re,"for","ret"),n(Re,"class","svelte-1mh7dhf"),n(we,"type","number"),n(we,"id","ret"),n(we,"class","xfill svelte-1mh7dhf"),n(we,"placeholder","Ej. 15"),n(Pe,"class","input-wrapper col xfill svelte-1mh7dhf"),n(ae,"class","box round col xfill svelte-1mh7dhf"),n(Fe,"class","notice svelte-1mh7dhf"),n(qe,"for","bill_note"),n(qe,"class","svelte-1mh7dhf"),n(Xe,"id","bill_note"),n(Xe,"class","xfill svelte-1mh7dhf"),n(Xe,"placeholder","Ej. Transporte no incluido"),n(Ge,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Qe,"for","budget_note"),n(Qe,"class","svelte-1mh7dhf"),n(Ze,"id","budget_note"),n(Ze,"class","xfill svelte-1mh7dhf"),n(Ze,"placeholder","Ej. Transporte no incluido"),n(Je,"class","input-wrapper col xfill svelte-1mh7dhf"),n(es,"for","delivery_note"),n(es,"class","svelte-1mh7dhf"),n(rs,"id","delivery_note"),n(rs,"class","xfill svelte-1mh7dhf"),n(rs,"placeholder","Ej. Transporte no incluido"),n(as,"class","input-wrapper col xfill svelte-1mh7dhf"),n(Oe,"class","box round col xfill svelte-1mh7dhf"),n(cs,"class","succ semi svelte-1mh7dhf"),n(ds,"href","/"),n(ds,"class","btn out semi svelte-1mh7dhf"),n(os,"class","row jcenter xfill"),n(e,"class","info col acenter xfill svelte-1mh7dhf")},m(l,r){d(l,e,r),h(e,s),h(s,f),h(f,p),h(s,I),h(s,A),h(A,D),h(s,T),h(s,N),h(N,L),h(L,P),h(N,R),ps&&ps.m(N,null),h(s,V),h(s,B),h(s,w),vs&&vs.m(s,null),h(e,S),h(e,O),h(O,j),h(j,U),h(O,C),h(O,F),h(F,M),h(O,k),h(O,G),h(G,H),h(H,X),h(G,z),h(G,J),g(J,a[2].legal_name),h(O,Q),h(O,K),h(K,W),h(W,Z),h(K,Y),h(K,aa),g(aa,a[2].legal_id),h(e,ea),h(e,sa),h(sa,la),h(la,ra),h(sa,ta),h(sa,oa),h(oa,ca),h(sa,ia),h(sa,na),h(na,da),h(da,ha),h(ha,fa),h(da,ua),h(da,pa),g(pa,a[2].street),h(na,va),h(na,ma),h(ma,Ea),h(Ea,ga),h(ma,ba),h(ma,_a),g(_a,a[2].cp),h(sa,Ia),h(sa,xa),h(xa,ya),h(ya,Aa),h(Aa,Da),h(ya,Ta),h(ya,Na),g(Na,a[2].city),h(xa,La),h(xa,Pa),h(Pa,Ra),h(Ra,Va),h(Pa,Ba),h(Pa,wa),g(wa,a[2].country),h(e,Sa),h(e,Oa),h(Oa,ja),h(ja,Ua),h(Oa,Ca),h(Oa,Fa),h(Fa,Ma),h(Oa,ka),h(Oa,Ga),h(Ga,qa),h(qa,$a),h(Ga,Ha),h(Ga,Xa),g(Xa,a[2].phone),h(Oa,za),h(Oa,Ja),h(Ja,Qa),h(Qa,Ka),h(Ja,Wa),h(Ja,Za),g(Za,a[2].email),h(e,Ya),h(e,ae),h(ae,ee),h(ee,se),h(ae,le),h(ae,re),h(re,te),h(ae,oe),h(ae,ce),h(ce,ie),h(ie,ne),h(ce,de),h(ce,he),h(he,fe),h(fe,ue),h(he,pe),h(pe,ve),h(he,me),h(me,Ee),h(he,ge),h(ge,be),h(he,_e),h(_e,Ie),b(he,a[2].currency),h(ae,xe),h(ae,ye),h(ye,Ae),h(Ae,De),h(ye,Te),h(ye,Ne),g(Ne,a[2].iva),h(ae,Le),h(ae,Pe),h(Pe,Re),h(Re,Ve),h(Pe,Be),h(Pe,we),g(we,a[2].ret),h(e,Se),h(e,Oe),h(Oe,je),h(je,Ue),h(Oe,Ce),h(Oe,Fe),h(Fe,Me),h(Oe,ke),h(Oe,Ge),h(Ge,qe),h(qe,$e),h(Ge,He),h(Ge,Xe),g(Xe,a[2].bill_note),h(Oe,ze),h(Oe,Je),h(Je,Qe),h(Qe,Ke),h(Je,We),h(Je,Ze),g(Ze,a[2].budget_note),h(Oe,Ye),h(Oe,as),h(as,es),h(es,ss),h(as,ls),h(as,rs),g(rs,a[2].delivery_note),h(e,ts),h(e,os),h(os,cs),h(cs,is),h(os,ns),h(os,ds),h(ds,hs),fs||(us=[u(B,"change",a[7]),u(J,"input",a[8]),u(aa,"input",a[9]),u(pa,"input",a[10]),u(_a,"input",a[11]),u(Na,"input",a[12]),u(wa,"input",a[13]),u(Xa,"input",a[14]),u(Za,"input",a[15]),u(he,"change",a[16]),u(Ne,"input",a[17]),u(we,"input",a[18]),u(Xe,"input",a[19]),u(Ze,"input",a[20]),u(rs,"input",a[21]),u(e,"submit",_(a[6]))],fs=!0)},p(a,e){a[2].logo?ps?ps.p(a,e):(ps=q(a),ps.c(),ps.m(N,null)):ps&&(ps.d(1),ps=null),a[2].logo?vs?vs.p(a,e):(vs=$(a),vs.c(),vs.m(s,null)):vs&&(vs.d(1),vs=null),4&e&&J.value!==a[2].legal_name&&g(J,a[2].legal_name),4&e&&aa.value!==a[2].legal_id&&g(aa,a[2].legal_id),4&e&&pa.value!==a[2].street&&g(pa,a[2].street),4&e&&_a.value!==a[2].cp&&g(_a,a[2].cp),4&e&&Na.value!==a[2].city&&g(Na,a[2].city),4&e&&wa.value!==a[2].country&&g(wa,a[2].country),4&e&&Xa.value!==a[2].phone&&g(Xa,a[2].phone),4&e&&Za.value!==a[2].email&&g(Za,a[2].email),4&e&&b(he,a[2].currency),4&e&&x(Ne.value)!==a[2].iva&&g(Ne,a[2].iva),4&e&&x(we.value)!==a[2].ret&&g(we,a[2].ret),4&e&&g(Xe,a[2].bill_note),4&e&&g(Ze,a[2].budget_note),4&e&&g(rs,a[2].delivery_note)},d(a){a&&i(e),ps&&ps.d(),vs&&vs.d(),fs=!1,y(us)}}}function q(a){let e,s,f,v;return{c(){e=l("div"),s=r("BORRAR IMÁGEN"),this.h()},l(a){e=t(a,"DIV",{class:!0});var l=o(e);s=c(l,"BORRAR IMÁGEN"),l.forEach(i),this.h()},h(){n(e,"class","file-btn remove-btn svelte-1mh7dhf")},m(l,r){d(l,e,r),h(e,s),f||(v=u(e,"click",a[5]),f=!0)},p:p,d(a){a&&i(e),f=!1,v()}}}function $(a){let e,s,r,c;return{c(){e=l("div"),s=l("img"),this.h()},l(a){e=t(a,"DIV",{class:!0});var l=o(e);s=t(l,"IMG",{src:!0,alt:!0,class:!0}),l.forEach(i),this.h()},h(){I(s.src,r=a[2].logo)||n(s,"src",r),n(s,"alt",c=a[2].legal_name||"Logotipo"),n(s,"class","svelte-1mh7dhf"),n(e,"class","logo-wrapper row fcenter xfill svelte-1mh7dhf")},m(a,l){d(a,e,l),h(e,s)},p(a,e){4&e&&!I(s.src,r=a[2].logo)&&n(s,"src",r),4&e&&c!==(c=a[2].legal_name||"Logotipo")&&n(s,"alt",c)},d(a){a&&i(e)}}}function H(a){let e,s,f,E,g,b,_,I,x,y,D,T,N,L,P,R,V,B,w,S,O,j,U,C,q,$,H,X=a[2]&&a[2].legal_id&&M(a),z=a[2]&&a[2].legal_id&&k(a),J=a[2]&&G(a);return{c(){e=l("meta"),s=l("meta"),f=l("meta"),E=l("meta"),g=v(),b=l("div"),_=l("section"),I=l("h1"),x=r("Tus datos de facturación"),y=v(),D=l("p"),T=r("En "),N=l("b"),L=r("facturagratis"),P=r(", usamos tu navegador como disco.\r\n      "),R=l("br"),V=l("br"),B=r("\r\n      Nuestra recomendacion es que descargues tus datos trimestalmente. Siempre podras volver a cargar tus datos y trabajar con ellos."),w=v(),X&&X.c(),S=v(),O=l("div"),z&&z.c(),j=v(),U=l("button"),C=r("CARGAR DATOS"),q=v(),J&&J.c(),this.h()},l(a){const l=A('[data-svelte="svelte-1n9vukf"]',F.head);e=t(l,"META",{property:!0,content:!0}),s=t(l,"META",{property:!0,content:!0}),f=t(l,"META",{name:!0,content:!0}),E=t(l,"META",{property:!0,content:!0}),l.forEach(i),g=m(a),b=t(a,"DIV",{class:!0});var r=o(b);_=t(r,"SECTION",{class:!0});var n=o(_);I=t(n,"H1",{class:!0});var d=o(I);x=c(d,"Tus datos de facturación"),d.forEach(i),y=m(n),D=t(n,"P",{class:!0});var h=o(D);T=c(h,"En "),N=t(h,"B",{});var u=o(N);L=c(u,"facturagratis"),u.forEach(i),P=c(h,", usamos tu navegador como disco.\r\n      "),R=t(h,"BR",{}),V=t(h,"BR",{}),B=c(h,"\r\n      Nuestra recomendacion es que descargues tus datos trimestalmente. Siempre podras volver a cargar tus datos y trabajar con ellos."),h.forEach(i),w=m(n),X&&X.l(n),S=m(n),O=t(n,"DIV",{class:!0});var p=o(O);z&&z.l(p),j=m(p),U=t(p,"BUTTON",{class:!0});var v=o(U);C=c(v,"CARGAR DATOS"),v.forEach(i),p.forEach(i),n.forEach(i),q=m(r),J&&J.l(r),r.forEach(i),this.h()},h(){F.title="Tus datos fiscales | Facturas gratis",n(e,"property","og:title"),n(e,"content","Tus datos fiscales | Facturas gratis"),n(s,"property","og:site_name"),n(s,"content","Facturas gratis"),n(f,"name","description"),n(f,"content","Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,\r\n  clientes, proveedores y productos/servicios. No se necesita instalación."),n(E,"property","og:description"),n(E,"content","Herramientas online y completamente gratuitas para generar, enviar, rectificar y listar facturas, presupuestos, albaranes,\r\n  clientes, proveedores y productos/servicios. No se necesita instalación."),n(I,"class","svelte-1mh7dhf"),n(D,"class","svelte-1mh7dhf"),n(U,"class","link semi svelte-1mh7dhf"),n(O,"class","io-wrapper row jcenter xfill svelte-1mh7dhf"),n(_,"class","header col fcenter xfill svelte-1mh7dhf"),n(b,"class","scroll")},m(l,r){h(F.head,e),h(F.head,s),h(F.head,f),h(F.head,E),d(l,g,r),d(l,b,r),h(b,_),h(_,I),h(I,x),h(_,y),h(_,D),h(D,T),h(D,N),h(N,L),h(D,P),h(D,R),h(D,V),h(D,B),h(_,w),X&&X.m(_,null),h(_,S),h(_,O),z&&z.m(O,null),h(O,j),h(O,U),h(U,C),h(b,q),J&&J.m(b,null),$||(H=u(U,"click",a[4]),$=!0)},p(a,[e]){a[2]&&a[2].legal_id?X?X.p(a,e):(X=M(a),X.c(),X.m(_,S)):X&&(X.d(1),X=null),a[2]&&a[2].legal_id?z?z.p(a,e):(z=k(a),z.c(),z.m(O,j)):z&&(z.d(1),z=null),a[2]?J?J.p(a,e):(J=G(a),J.c(),J.m(b,null)):J&&(J.d(1),J=null)},i:p,o:p,d(a){i(e),i(s),i(f),i(E),a&&i(g),a&&i(b),X&&X.d(),z&&z.d(),J&&J.d(),$=!1,H()}}}function X(a,e,s){let l,r,t,o,c,i,n,d,h;function f(){const a={db_userData:r,db_bills:d,db_budgets:n,db_deliveries:i,db_clients:c,db_products:o,db_providers:t},e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a)),s=document.createElement("a");s.href=e,s.download=`${l.legal_name}.facturasgratis`,s.click()}function u(){const a=document.createElement("input");a.type="file",a.accept=".facturasgratis",a.click(),a.onchange=()=>{let e=new FileReader;e.onload=a=>{const{db_userData:e,db_bills:s,db_budgets:l,db_deliveries:h,db_clients:f,db_products:u,db_providers:p}=JSON.parse(a.target.result);N(R,r=e,r),N(j,d=s,d),N(O,n=l,n),N(S,i=h,i),N(w,c=f,c),N(B,o=u,o),N(V,t=p,t),alert("Datos cargados correctamente ✔")},e.readAsText(a.files[0])}}function p(){localStorage.clear(),N(R,r={},r),N(j,d=[],d),N(O,n=[],n),N(S,i=[],i),N(w,c=[],c),N(B,o=[],o),N(V,t=[],t),alert("Datos borrados correctamente ✔")}return D(a,R,(a=>s(1,r=a))),D(a,V,(a=>s(22,t=a))),D(a,B,(a=>s(23,o=a))),D(a,w,(a=>s(24,c=a))),D(a,S,(a=>s(25,i=a))),D(a,O,(a=>s(26,n=a))),D(a,j,(a=>s(27,d=a))),a.$$.update=()=>{if(2&a.$$.dirty&&s(2,l=r),1&a.$$.dirty&&h){let a=h[0],e=new FileReader;e.onload=a=>{s(2,l.logo=a.target.result,l)},e.readAsDataURL(a)}},[h,r,l,function(){if(f(),confirm("¿Quieres borrar tambien tus datos?")){prompt("Se borraran todos tus datos. Introduce tu CIF/NIF para confirmar.")===r.legal_id&&p()}},function(){if(r.legal_id){confirm("¿Quieres descargar tus datos antes de cargar unos nuevos?")&&f();prompt("Se borraran todos tus datos. Introduce tu CIF/NIF para confirmar.")===r.legal_id&&(p(),u())}else u()},function(){s(0,h=void 0),delete l.logo,s(2,l),s(1,r),s(0,h)},function(){l.phone||l.email?(s(2,l._updated=new Date,l),N(R,r=l,r),P("/")):alert("⚠ No has añadido un método de contacto ⚠")},function(){h=this.files,s(0,h)},function(){l.legal_name=this.value,s(2,l),s(1,r),s(0,h)},function(){l.legal_id=this.value,s(2,l),s(1,r),s(0,h)},function(){l.street=this.value,s(2,l),s(1,r),s(0,h)},function(){l.cp=this.value,s(2,l),s(1,r),s(0,h)},function(){l.city=this.value,s(2,l),s(1,r),s(0,h)},function(){l.country=this.value,s(2,l),s(1,r),s(0,h)},function(){l.phone=this.value,s(2,l),s(1,r),s(0,h)},function(){l.email=this.value,s(2,l),s(1,r),s(0,h)},function(){l.currency=L(this),s(2,l),s(1,r),s(0,h)},function(){l.iva=x(this.value),s(2,l),s(1,r),s(0,h)},function(){l.ret=x(this.value),s(2,l),s(1,r),s(0,h)},function(){l.bill_note=this.value,s(2,l),s(1,r),s(0,h)},function(){l.budget_note=this.value,s(2,l),s(1,r),s(0,h)},function(){l.delivery_note=this.value,s(2,l),s(1,r),s(0,h)}]}class z extends a{constructor(a){super(),e(this,a,X,H,s,{})}}export{z as default};
