"use strict";var l=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var n=Object.getOwnPropertyNames;var r=Object.prototype.hasOwnProperty;var s=(o,e)=>{for(var i in e)l(o,i,{get:e[i],enumerable:!0})},c=(o,e,i,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of n(e))!r.call(o,a)&&a!==i&&l(o,a,{get:()=>e[a],enumerable:!(t=d(e,a))||t.enumerable});return o};var f=o=>c(l({},"__esModule",{value:!0}),o);var g={};s(g,{invalidEmail:()=>p,validEmail:()=>m});module.exports=f(g);var m=`<!DOCTYPE html>
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
</html>`,p=`<!DOCTYPE html>
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
</html>`;0&&(module.exports={invalidEmail,validEmail});
