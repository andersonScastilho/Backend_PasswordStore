"use strict";var T=Object.create;var l=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var N=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var b=(o,e)=>{for(var r in e)l(o,r,{get:e[r],enumerable:!0})},y=(o,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of S(e))!O.call(o,t)&&t!==r&&l(o,t,{get:()=>e[t],enumerable:!(s=C(e,t))||s.enumerable});return o};var w=(o,e,r)=>(r=o!=null?T(N(o)):{},y(e||!o||!o.__esModule?l(r,"default",{value:o,enumerable:!0}):r,o)),V=o=>y(l({},"__esModule",{value:!0}),o);var q={};b(q,{verifyEmail:()=>R});module.exports=V(q);var P=require("express");var U=require("zod");var v=w(require("events"));var E=require("@prisma/client"),c=new E.PrismaClient;var f=class extends v.default{},g=new f;var i=w(require("jsonwebtoken")),u=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:p}=i.default.verify(r,process.env.TOKEN_SECRET??""),a=await this.showUserPerUserIdRepository?.show(t);if(!a)throw Error("User not found");if(p!==a.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},x=u;var d=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let s=await new x(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(s)?(g.emit("user/verifiedEmail-update",s),!0):!1}};var m=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var I=`<!DOCTYPE html>
<html>
<head>
    <title>Verifica\xE7\xE3o de E-mail Conclu\xEDda</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        h1 {
            background-color: #007BFF;
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
    <h1>Verifica\xE7\xE3o de E-mail Conclu\xEDda com Sucesso</h1>
    <p>O seu endere\xE7o de e-mail foi validado com sucesso. Agora voc\xEA pode acessar nossos servi\xE7os.</p>
</body>
</html>`,h=`<!DOCTYPE html>
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
</html>`;var F=U.z.string(),n=class{async handle(e,r,s){try{let t=F.parse(e.query.token);if(!t)return r.status(401).send(`${h}`);let p=new m,a=new d(p),k=`Bearer ${t}`;return await a.execute(k)===!1?r.status(400).send(`${h}`):r.status(200).send(`${I}`)}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};var R=(0,P.Router)(),A=new n;R.get("/verify-email",A.handle);0&&(module.exports={verifyEmail});
