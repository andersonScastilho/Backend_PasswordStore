"use strict";var I=Object.create;var a=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var k=(r,e)=>{for(var o in e)a(r,o,{get:e[o],enumerable:!0})},u=(r,e,o,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of x(e))!R.call(r,s)&&s!==o&&a(r,s,{get:()=>e[s],enumerable:!(t=U(e,s))||t.enumerable});return r};var T=(r,e,o)=>(o=r!=null?I(P(r)):{},u(e||!r||!r.__esModule?a(o,"default",{value:r,enumerable:!0}):o,r)),S=r=>u(a({},"__esModule",{value:!0}),r);var O={};k(O,{default:()=>l});module.exports=S(O);var E=require("zod");var i=T(require("jsonwebtoken")),m=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,o]=e.split(" ");if(!i.default.verify(o,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:p}=i.default.verify(o,process.env.TOKEN_SECRET??""),c=await this.showUserPerUserIdRepository?.show(s);if(p!==c?.email)throw Error("Invalid token");return s}async authentication(e,o){if(!await e.comparePasswords(o))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,o){return i.default.sign({id:e,email:o},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},h=m;var n=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let t=await new h(this.showUserPerIdRepository).validAuth(e);return!!await this.showUserPerIdRepository.show(t)}};var y=require("@prisma/client"),w=new y.PrismaClient;var d=class{async show(e){return await w.user.findUnique({where:{id:e}})}};var v=`<!DOCTYPE html>
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
</html>`,f=`<!DOCTYPE html>
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
</html>`;var N=E.z.string(),l=class{async handle(e,o,t){try{let s=N.parse(e.query.token);if(!s)return o.status(401).send(`${f}`);let p=new d,c=new n(p),g=`Bearer ${s}`;return await c.execute(g)===!1?o.status(400).send(`${f}`):o.status(200).send(`${v}`)}catch{return o.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};
