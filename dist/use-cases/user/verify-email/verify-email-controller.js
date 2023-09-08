"use strict";var U=Object.create;var n=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var T=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty;var N=(o,e)=>{for(var r in e)n(o,r,{get:e[r],enumerable:!0})},h=(o,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of k(e))!S.call(o,s)&&s!==r&&n(o,s,{get:()=>e[s],enumerable:!(t=R(e,s))||t.enumerable});return o};var w=(o,e,r)=>(r=o!=null?U(T(o)):{},h(e||!o||!o.__esModule?n(r,"default",{value:o,enumerable:!0}):r,o)),C=o=>h(n({},"__esModule",{value:!0}),o);var b={};N(b,{default:()=>p});module.exports=C(b);var x=require("zod");var v=w(require("events"));var y=require("@prisma/client"),c=new y.PrismaClient;var f=class extends v.default{},E=new f;var i=w(require("jsonwebtoken")),u=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:m}=i.default.verify(r,process.env.TOKEN_SECRET??""),a=await this.showUserPerUserIdRepository?.show(s);if(!a)throw Error("User not found");if(m!==a.email)throw Error("Invalid token");return s}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},g=u;var d=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let t=await new g(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(t)?(E.emit("user/verifiedEmail-update",t),!0):!1}};var l=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var I=`<!DOCTYPE html>
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
</html>`;var _=x.z.string(),p=class{async handle(e,r,t){try{let s=_.parse(e.query.token);if(!s)return r.status(401).send(`${I}`);let m=new l,a=new d(m),P=`Bearer ${s}`;return await a.execute(P)===!1?r.status(400).json({error:"N\xE3o foi possivel validar o email"}):r.status(200).json({message:"Email validado com sucesso"})}catch(s){t(s)}}};
