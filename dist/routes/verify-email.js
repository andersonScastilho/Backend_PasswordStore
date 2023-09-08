"use strict";var k=Object.create;var d=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var _=(o,e)=>{for(var r in e)d(o,r,{get:e[r],enumerable:!0})},h=(o,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of C(e))!N.call(o,s)&&s!==r&&d(o,s,{get:()=>e[s],enumerable:!(t=T(e,s))||t.enumerable});return o};var w=(o,e,r)=>(r=o!=null?k(S(o)):{},h(e||!o||!o.__esModule?d(r,"default",{value:o,enumerable:!0}):r,o)),b=o=>h(d({},"__esModule",{value:!0}),o);var F={};_(F,{verifyEmail:()=>U});module.exports=b(F);var P=require("express");var x=require("zod");var v=w(require("events"));var y=require("@prisma/client"),c=new y.PrismaClient;var f=class extends v.default{},E=new f;var i=w(require("jsonwebtoken")),u=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:p}=i.default.verify(r,process.env.TOKEN_SECRET??""),n=await this.showUserPerUserIdRepository?.show(s);if(!n)throw Error("User not found");if(p!==n.email)throw Error("Invalid token");return s}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},g=u;var l=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let t=await new g(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(t)?(E.emit("user/verifiedEmail-update",t),!0):!1}};var m=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var I=`<!DOCTYPE html>
<html>
<head>
    <title>Valida\xE7\xE3o de E-mail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        h1 {
            background-color: #FF4500;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        p {
            text-align: center;
            font-size: 18px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Valida\xE7\xE3o de E-mail Falhou</h1>
    <p>N\xE3o foi poss\xEDvel validar o endere\xE7o de e-mail. Por favor, verifique o endere\xE7o e tente novamente.</p>
</body>
</html>`;var O=x.z.string(),a=class{async handle(e,r,t){try{let s=O.parse(e.query.token);if(!s)return r.status(401).send(`${I}`);let p=new m,n=new l(p),R=`Bearer ${s}`;return await n.execute(R)===!1?r.status(400).json({error:"N\xE3o foi possivel validar o email"}):r.status(200).json({message:"Email validado com sucesso"})}catch(s){t(s)}}};var U=(0,P.Router)(),V=new a;U.post("/verify-email",V.handle);0&&(module.exports={verifyEmail});
