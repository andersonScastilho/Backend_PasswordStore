"use strict";var E=Object.create;var n=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var m=(s,r)=>{for(var e in r)n(s,e,{get:r[e],enumerable:!0})},p=(s,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of I(r))!v.call(s,o)&&o!==e&&n(s,o,{get:()=>r[o],enumerable:!(t=l(r,o))||t.enumerable});return s};var h=(s,r,e)=>(e=s!=null?E(w(s)):{},p(r||!s||!s.__esModule?n(e,"default",{value:s,enumerable:!0}):e,s)),y=s=>p(n({},"__esModule",{value:!0}),s);var f={};m(f,{default:()=>T});module.exports=y(f);var i=h(require("jsonwebtoken")),a=class{constructor(r){this.showUserPerUserIdRepository=r}async validAuth(r){let[,e]=r.split(" ");if(!i.default.verify(e,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:o,email:c}=i.default.verify(e,process.env.TOKEN_SECRET??""),d=await this.showUserPerUserIdRepository?.show(o);if(!d)throw Error("User not found");if(c!==d.email)throw Error("Invalid token");return o}async authentication(r,e){if(!await r.comparePasswords(e))throw Error("Invalid password");return i.default.sign({id:r.userId,email:r.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(r,e){return i.default.sign({id:r,email:e},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},T=a;