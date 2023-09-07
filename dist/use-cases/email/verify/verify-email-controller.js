"use strict";var R=Object.create;var a=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var O=(o,e)=>{for(var r in e)a(o,r,{get:e[r],enumerable:!0})},w=(o,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of T(e))!N.call(o,t)&&t!==r&&a(o,t,{get:()=>e[t],enumerable:!(s=k(e,t))||s.enumerable});return o};var y=(o,e,r)=>(r=o!=null?R(S(o)):{},w(e||!o||!o.__esModule?a(r,"default",{value:o,enumerable:!0}):r,o)),C=o=>w(a({},"__esModule",{value:!0}),o);var V={};O(V,{default:()=>p});module.exports=C(V);var U=require("zod");var v=y(require("events"));var E=require("@prisma/client"),c=new E.PrismaClient;var f=class extends v.default{},g=new f;var i=y(require("jsonwebtoken")),u=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:m}=i.default.verify(r,process.env.TOKEN_SECRET??""),n=await this.showUserPerUserIdRepository?.show(t);if(!n)throw Error("User not found");if(m!==n.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},I=u;var d=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let s=await new I(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(s)?(g.emit("user/verifiedEmail-update",s),!0):!1}};var l=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var x=`<!DOCTYPE html>
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
</html>`;var b=U.z.string(),p=class{async handle(e,r,s){try{let t=b.parse(e.query.token);if(!t)return r.status(401).send(`${h}`);let m=new l,n=new d(m),P=`Bearer ${t}`;return await n.execute(P)===!1?r.status(400).send(`${h}`):r.status(200).send(`${x}`)}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};
