"use strict";var R=Object.create;var n=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var C=(o,e)=>{for(var r in e)n(o,r,{get:e[r],enumerable:!0})},w=(o,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of T(e))!N.call(o,s)&&s!==r&&n(o,s,{get:()=>e[s],enumerable:!(t=k(e,s))||t.enumerable});return o};var y=(o,e,r)=>(r=o!=null?R(S(o)):{},w(e||!o||!o.__esModule?n(r,"default",{value:o,enumerable:!0}):r,o)),_=o=>w(n({},"__esModule",{value:!0}),o);var O={};C(O,{default:()=>p});module.exports=_(O);var P=require("zod");var E=y(require("events"));var v=require("@prisma/client"),c=new v.PrismaClient;var u=class extends E.default{},g=new u;var i=y(require("jsonwebtoken")),f=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:m}=i.default.verify(r,process.env.TOKEN_SECRET??""),a=await this.showUserPerUserIdRepository?.show(s);if(!a)throw Error("User not found");if(m!==a.email)throw Error("Invalid token");return s}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},I=f;var d=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let t=await new I(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(t)?(g.emit("user/verifiedEmail-update",t),!0):!1}};var l=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var x=`<!DOCTYPE html>
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
</html>`;var b=P.z.string(),p=class{async handle(e,r,t){try{let s=b.parse(e.query.token);if(!s)return r.status(401).send(`${h}`);let m=new l,a=new d(m),U=`Bearer ${s}`;return await a.execute(U)===!1?r.status(400).send(`${h}`):r.status(200).send(`${x}`)}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};
