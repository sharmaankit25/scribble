import{u as p}from"./settings.b14b5b53.js";import{d as _,a as n,c as o,j as c,t,u as a,b as e,F as u,h as d}from"./index.3990f57e.js";const m=e("h1",null,"Settings Page",-1),h=e("br",null,null,-1),y=e("input",{type:"text",placeholder:"Type here",class:"input input-bordered"},null,-1),b=e("select",{className:"select select-bordered "},[e("option",{disabled:"",selected:""},"Who shot first?"),e("option",null,"Han Solo"),e("option",null,"Greedo")],-1),g=e("hr",{class:"my-2"},null,-1),f=e("input",{type:"radio",name:"radio-2",className:"radio radio-primary",checked:""},null,-1),k=e("input",{type:"radio",name:"radio-2",className:"radio radio-primary"},null,-1),x=e("div",{className:"form-control"},[e("label",{className:"label cursor-pointer"},[e("span",{className:"label-text"},"Remember me"),e("input",{type:"checkbox",checked:"",className:"checkbox checkbox-primary"})])],-1),N=e("br",null,null,-1),S=e("hr",null,null,-1),V=e("h3",null,"Accounts Group",-1),F=_({__name:"SettingsView",setup(v){const{settings:s}=p();return(B,C)=>(n(),o(u,null,[m,h,y,b,g,f,k,x,c(" Current Currency: "+t(a(s).currency.name)+" ("+t(a(s).currency.symbol)+") ",1),N,S,V,e("ul",null,[(n(!0),o(u,null,d(a(s).accountGroups,i=>(n(),o("li",{key:i.code},[c(t(i.name)+" - "+t(i.description)+" ",1),e("ol",null,[(n(!0),o(u,null,d(a(s).categories.filter(l=>l.group===i.code),l=>(n(),o("li",{key:l.code},[c(t(l.name)+" - "+t(l.description)+" ",1),e("ul",null,[(n(!0),o(u,null,d(a(s).accounts.filter(r=>r.type===l.code),r=>(n(),o("li",{key:r.code},t(r.name)+" - "+t(r.description),1))),128))])]))),128))])]))),128))])],64))}});export{F as default};