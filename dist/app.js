"use strict";var wt=Object.create;var F=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var bt=Object.getOwnPropertyNames;var Rt=Object.getPrototypeOf,xt=Object.prototype.hasOwnProperty;var Et=(s,e)=>{for(var t in e)F(s,t,{get:e[t],enumerable:!0})},De=(s,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of bt(e))!xt.call(s,r)&&r!==t&&F(s,r,{get:()=>e[r],enumerable:!(o=yt(e,r))||o.enumerable});return s};var g=(s,e,t)=>(t=s!=null?wt(Rt(s)):{},De(e||!s||!s.__esModule?F(t,"default",{value:s,enumerable:!0}):t,s)),St=s=>De(F({},"__esModule",{value:!0}),s);var rr={};Et(rr,{default:()=>tr});module.exports=St(rr);var qe=g(require("express"));var Ve=require("express");var He=require("@prisma/client"),d=new He.PrismaClient;var l=class{async show(e){return await d.user.findUnique({where:{id:e}})}};var T=g(require("jsonwebtoken")),xe=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,t]=e.split(" ");if(!T.default.verify(t,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:r,email:a}=T.default.verify(t,process.env.TOKEN_SECRET??""),i=await this.showUserPerUserIdRepository?.show(r);if(!i)throw Error("User not found");if(a!==i.email)throw Error("Invalid token");return r}async authentication(e,t){if(!await e.comparePasswords(t))throw Error("Invalid password");return T.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,t){return T.default.sign({id:e,email:t},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},h=xe;var w=async(s,e,t)=>{let{authorization:o}=s.headers;try{let r=new l;if(!o)return e.status(401).json({errors:["Login required"]});let i=await new h(r).validAuth(o);return s.params={...s.params,userId:i},t()}catch{return e.status(401).json({error:"Token expired or invalid"})}};var k=require("zod");var Me=require("uuid");var Ue=g(require("bcrypt"));var Be=g(require("nodemailer")),Ee=class{constructor(e,t,o){this._recipient=e;this._subject=t;this._text=o;this.sender="leosilvacast@gmail.com"}sendEmail(){let e=Be.default.createTransport({service:"gmail",auth:{type:"OAuth2",user:process.env.MAIL_USERNAME,clientId:process.env.OAUTH_CLIENTID,clientSecret:process.env.OAUTH_CLIENT_SECRET,refreshToken:process.env.OAUTH_REFRESH_TOKEN}}),t={from:this.sender,to:this._recipient,subject:this._subject,html:this._text};e.sendMail(t,function(o,r){console.log(o?"Error "+o:"Email sent successfully")})}},Se=Ee;var u=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await Ue.default.hash(e,10)}async comparePasswords(e){return await Ue.default.compare(e,this.userPassword)}async updatePassword(e,t,o){if(!await this.comparePasswords(e))throw Error("Invalid password");if(t!==o)throw Error("Password confirmation must be the same as password");let a=await this.encryptedPassword(t);this.props.userPassword=a}async sendEmailToVerify(){let t=await new h().authenticationProvider(this.props.userId,this.props.userEmail),o="Verifica\xE7\xE3o de Email",r=`<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          --------------------------------- ---- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }
    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #3498db;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #3498db; 
          }
    
          .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important; 
            }
            table.body .wrapper,
            table.body .article {
              padding: 10px !important; 
            }
            table.body .content {
              padding: 0 !important; 
            }
            table.body .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table.body .btn table {
              width: 100% !important; 
            }
            table.body .btn a {
              width: 100% !important; 
            }
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important; 
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; 
            } 
          }
    
        </style>
      </head>
      <body>
        <span class="preheader">Verificar email.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Ol\xE1</p>
                            <p>Valide seu email clicando no botao abaixo.</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href=${`${process.env.FRONTEND_URL}/verify-email?token=${t}`} target="_blank">Validar Email</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>Este email serve apenas para voc\xEA confirmar que o email que deseja cadastrar em nosso website \xE9 valido.</p>
                            <p>Fa\xE7a um bom uso do nosso website.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
             
                    <tr>
                      <td class="content-block powered-by">
                        Desenvolvido por <a href="https://www.linkedin.com/in/andersonscastilho/">Anderson Leonardo</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`;new Se(this.props.userEmail,o,r).sendEmail()}async sendEmailToForgotPassword(){let t=await new h().authenticationProvider(this.props.userId,this.props.userEmail),o="Esqueci Minha Senha",r=`<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          --------------------------------- ---- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }
    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #3498db;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #3498db; 
          }
    
          .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important; 
            }
            table.body .wrapper,
            table.body .article {
              padding: 10px !important; 
            }
            table.body .content {
              padding: 0 !important; 
            }
            table.body .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table.body .btn table {
              width: 100% !important; 
            }
            table.body .btn a {
              width: 100% !important; 
            }
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important; 
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; 
            } 
          }
    
        </style>
      </head>
      <body>
        <span class="preheader">Esqueci minha senha</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Ol\xE1</p>
                            <p>N\xE3o tem problema esquecer a senha, clica no botao abaixo para redefinir sua senha</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href=${`${process.env.FRONTEND_URL}/reset-password?token=${t}`} target="_blank">Redefinir senha</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>Este email serve apenas para voc\xEA redefinir sua senha</p>
                            <p>Fa\xE7a um bom uso do nosso website.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
             
                    <tr>
                      <td class="content-block powered-by">
                        Desenvolvido por <a href="https://www.linkedin.com/in/andersonscastilho/">Anderson Leonardo</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`;new Se(this.props.userEmail,o,r).sendEmail()}};var A=class{constructor(e,t){this.createUserRepository=e;this.showUserperEmailRepository=t}async execute({userEmail:e,userFullName:t,userPassword:o}){if(await this.showUserperEmailRepository.show(e))throw Error("Email in use");let a=(0,Me.v4)(),i=new u({userEmail:e,userFullName:t,userId:a,userPassword:o}),n=await i.encryptedPassword(o);return i.hashPasswordToUserPassword=n,await this.createUserRepository.create(i),await i.sendEmailToVerify(),i}};var O=class{async create(e){let{userEmail:t,userFullName:o,userPassword:r,userId:a}=e,i=await d.user.create({data:{email:t,fullName:o,id:a,password_hash:r}});if(!i)throw Error("N\xE3o foi possivel criar o usuario");return i}};var S=class{async show(e){return await d.user.findUnique({where:{email:e}})}};var Ut=k.z.object({email:k.z.string().email(),fullName:k.z.string(),password:k.z.string()}),j=class{async handle(e,t,o){try{let{email:r,fullName:a,password:i}=Ut.parse(e.body),n=new O,p=new S,m=await new A(n,p).execute({userEmail:r,userFullName:a,userPassword:i});return t.status(200).json({email:m.userEmail,fullName:m.userFullName})}catch(r){o(r)}}};var z=class{constructor(e){this.showUserRepository=e}async execute(e){let t=await this.showUserRepository.show(e);if(!t)throw Error("User not found");return new u({userEmail:t.email,userFullName:t.fullName,userId:t.id,userPassword:t.password_hash})}};var Pe=require("zod"),Pt=Pe.z.object({userId:Pe.z.string()}),q=class{async handle(e,t,o){try{let{userId:r}=Pt.parse(e.params),a=new l,n=await new z(a).execute(r);return t.status(200).json({email:n.userEmail,fullName:n.userFullName})}catch(r){o(r)}}};var x=require("zod");var _=class{constructor(e,t){this.showUserPerUserIdRepository=e;this.updateUserRepository=t}async handle({userId:e,email:t,fullName:o,oldPassword:r,newPassword:a,newPasswordConfirmation:i}){let n=await this.showUserPerUserIdRepository.show(e);if(!n)throw Error("User not found");let p=new u({userId:n.id,userEmail:n.email,userFullName:n.fullName,userPassword:n.password_hash});return o&&(p.updateUserFullName=o),a&&r&&i&&await p.updatePassword(r,a,i),t&&(p.updateUserEmail=t),await this.updateUserRepository.update({userId:p.userId,email:p.userEmail,fullName:p.userFullName,newPassword:p.userPassword})}};var L=class{async update({email:e,fullName:t,newPassword:o,userId:r}){return await d.user.update({where:{id:r},data:{email:e,fullName:t,password_hash:o}})}};var It=x.z.object({email:x.z.string().email().optional(),oldPassword:x.z.string().optional(),newPassword:x.z.string().optional(),newPasswordConfirmation:x.z.string().optional(),fullName:x.z.string().optional()}),vt=x.z.object({userId:x.z.string()}),D=class{async handle(e,t,o){try{let{email:r,newPassword:a,newPasswordConfirmation:i,oldPassword:n,fullName:p}=It.parse(e.body),{userId:c}=vt.parse(e.params);if(a){if(!i)throw Error("newPasswordConfirmation is required to update password");if(!n)throw Error("oldPassword is required to update password")}if(!r&&!a&&!i&&!n&&!p)throw Error("Missing data");let m=new l,P=new L,R=new _(m,P),{email:Le,fullName:Re,id:gt}=await R.handle({userId:c,email:r,fullName:p,newPassword:a,newPasswordConfirmation:i,oldPassword:n});return t.status(200).json({user:{email:Le,fullName:Re,id:gt}})}catch(r){o(r)}}};var N=(0,Ve.Router)(),Tt=new j,kt=new q,Nt=new D;N.post("/users",Tt.handle);N.get("/users",w,kt.handle);N.put("/users",w,Nt.handle);var Xe=require("express");var Je=require("uuid");var H=g(require("crypto")),$e="aes-256-gcm",Ke=Buffer.from(process.env.SECRET_CRYPTO??"","hex"),Ye=H.default.randomBytes(16),Ge=s=>{try{let e=H.default.createCipheriv($e,Ke,Ye),t=Buffer.concat([e.update(s.toString()),e.final()]),o=e.getAuthTag();return{iv:Ye.toString("hex"),content:t.toString("hex"),tag:o.toString("hex")}}catch{throw Error("Erro ao criptografar os dados")}},We=s=>{try{let e=H.default.createDecipheriv($e,Ke,Buffer.from(s.iv,"hex"));e.setAuthTag(Buffer.from(s.tag,"hex"));let t=Buffer.from(s.content,"hex");return Buffer.concat([e.update(t),e.final()]).toString("utf8")}catch{throw new Error("Erro ao descriptografar os dados.")}};var f=class{get storageId(){return this.props.storageId}get password(){return this.props.password}get account(){return this.props.account}get usageLocation(){return this.props.usageLocation}get link(){return this.props.link}get description(){return this.props.description}get userId(){return this.props.userId}set updatePassword(e){this.props.password=e}constructor(e){this.props=e}showPassword(e){let[t,o,r]=e.split(":");return We({iv:t,content:o,tag:r})}};var B=class{constructor(e){this.storageRepository=e}async execute({account:e,password:t,usageLocation:o,description:r,link:a,userId:i}){let n=(0,Je.v4)(),{iv:p,content:c,tag:m}=Ge(t),P=`${p}:${c}:${m}`,R=new f({password:P,account:e,usageLocation:o,description:r,link:a,userId:i,storageId:n});return await this.storageRepository.create(R),R.updatePassword="",R}};var M=class{async create(e){let{account:t,description:o,link:r,password:a,usageLocation:i,userId:n,storageId:p}=e,c=await d.storage.create({data:{account:t,id:p,password:a,usageLocation:i,description:o,link:r,userId:n}});if(!c)throw Error("N\xE3o foi possivel armazenar os dados");return c}};var E=require("zod"),Ct=E.z.object({password:E.z.string(),account:E.z.string(),usageLocation:E.z.string(),link:E.z.string(),description:E.z.string()}),Ft=E.z.object({userId:E.z.string()}),V=class{async handle(e,t,o){try{let{password:r,account:a,usageLocation:i,link:n,description:p}=Ct.parse(e.body),{userId:c}=Ft.parse(e.params),m=new M,R=await new B(m).execute({account:a,password:r,usageLocation:i,description:p,link:n,userId:c});return t.status(200).json(R)}catch(r){o(r)}}};var Y=class{async index(e){return await d.storage.findMany({where:{userId:e}})}};var $=class{constructor(e){this.indexStorageRepository=e}async execute(e){let t=await this.indexStorageRepository.index(e),o=[];return t.forEach(r=>{let a=new f({account:r.account,password:"",storageId:r.id,usageLocation:r.usageLocation,userId:r.userId,description:r.description||void 0,link:r.link||void 0});o.push(a)}),o}};var Ie=require("zod"),At=Ie.z.object({userId:Ie.z.string()}),K=class{async handle(e,t,o){try{let{userId:r}=At.parse(e.params);if(!r)return t.status(401).json({error:"Login required"});let a=new Y,n=await new $(a).execute(r);return t.status(200).json({storages:n})}catch(r){o(r)}}};var y=class{async show(e,t){return await d.storage.findFirst({where:{AND:{id:e,userId:t}}})}};var G=class{constructor(e){this.showStorageRepository=e}async execute(e,t){let o=await this.showStorageRepository.show(e,t);if(!o)throw Error("Storage not found");return new f({account:o.account,password:"",storageId:o.id,usageLocation:o.usageLocation,userId:o.userId,description:o.description||"",link:o.link||""})}};var W=require("zod"),Ot=W.z.object({storageId:W.z.string(),userId:W.z.string()}),J=class{async handle(e,t,o){try{let{storageId:r,userId:a}=Ot.parse(e.params),i=new y,p=await new G(i).execute(r,a);return t.status(200).json(p)}catch(r){o(r)}}};var X=class{async update({account:e,description:t,link:o,usageLocation:r,storageId:a,password:i}){return await d.storage.update({where:{id:a},data:{account:e,description:t,link:o,usageLocation:r,password:i}})}};var Z=class{constructor(e,t){this.updateStorageReposirory=e;this.showStorageRepository=t}async execute({storageId:e,account:t,description:o,link:r,usageLocation:a,userId:i,password:n}){if(!await this.showStorageRepository.show(e,i))throw Error("Storage not found");let c=await this.updateStorageReposirory.update({storageId:e,account:t,userId:i,description:o,link:r,usageLocation:a,password:n});return new f({account:c.account,password:"",storageId:c.id,usageLocation:c.usageLocation,userId:c.userId,description:c.description||"",link:c.link||""})}};var b=require("zod"),jt=b.z.object({account:b.z.string().optional(),usageLocation:b.z.string().optional(),description:b.z.string().optional(),link:b.z.string().optional(),password:b.z.string().optional()}),zt=b.z.object({userId:b.z.string(),storageId:b.z.string()}),Q=class{async handle(e,t,o){try{let{account:r,usageLocation:a,description:i,link:n,password:p}=jt.parse(e.body),{userId:c,storageId:m}=zt.parse(e.params);if(!r&&!a&&!i&&!n)return t.status(400).json({error:"Missing data"});let P=new X,R=new y,Re=await new Z(P,R).execute({account:r,storageId:m,userId:c,description:i,link:n,usageLocation:a,password:p});return t.status(200).json({storage:Re})}catch(r){o(r)}}};var ee=class{async delete(e){await d.storage.delete({where:{id:e}})}};var te=class{constructor(e,t){this.deleteStorageRepository=e;this.showStorageRepository=t}async execute(e,t){if(!await this.showStorageRepository.show(e,t))throw Error("Storage not found");await this.deleteStorageRepository.delete(e)}};var re=require("zod"),qt=re.z.object({userId:re.z.string(),storageId:re.z.string()}),oe=class{async handle(e,t,o){try{let{userId:r,storageId:a}=qt.parse(e.params),i=new ee,n=new y;return await new te(i,n).execute(a,r),t.status(200).json({})}catch(r){o(r)}}};var _t=new V,Lt=new K,Dt=new J,Ht=new Q,Bt=new oe,U=(0,Xe.Router)();U.post("/storages",w,_t.handle);U.get("/storages",w,Lt.handle);U.get("/storages/:storageId",w,Dt.handle);U.put("/storages/:storageId",w,Ht.handle);U.delete("/storages/:storageId",w,Bt.handle);var et=require("express");var Ze=g(require("dayjs")),Qe=require("uuid"),se=class{constructor(e,t,o){this.showUserPerEmailRepository=e;this.createRefreshTokenRepository=t;this.deleteRefreshTokenRepository=o}async execute({email:e,password:t}){let o=await this.showUserPerEmailRepository.show(e);if(!o)throw Error("User not found");if(o.verifiedEmail!==!0)throw Error("Unverified email");let r=new u({userEmail:o.email,userFullName:o.fullName,userId:o.id,userPassword:o.password_hash}),a=new h;await this.deleteRefreshTokenRepository.delete(o.id);let i=await a.authentication(r,t),n=(0,Qe.v4)(),p=(0,Ze.default)().add(7,"days").unix(),c=await this.createRefreshTokenRepository.create({expiresIn:p,id:n,userId:r.userId});return{token:i,refreshToken:c}}};var ae=class{async create({expiresIn:e,id:t,userId:o}){return await d.refresh_Token.create({data:{expiresIn:e,id:t,userId:o}})}};var ie=class{async delete(e){await d.refresh_Token.deleteMany({where:{userId:e}})}};var ne=require("zod"),Mt=ne.z.object({email:ne.z.string().email(),password:ne.z.string()}),pe=class{async handle(e,t,o){try{let{email:r,password:a}=Mt.parse(e.body);if(!r||!a)return t.status(400).json({error:"Missing data"});let i=new S,n=new ae,p=new ie,m=await new se(i,n,p).execute({email:r,password:a});return t.status(200).json(m)}catch(r){o(r)}}};var ve=(0,et.Router)(),Vt=new pe;ve.post("/auth",Vt.handle);var rt=require("express");var tt=g(require("bcrypt")),de=class{constructor(e,t){this.showStorageRepository=e;this.showUserPerUserIdRepository=t}async execute(e,t,o){let r=await this.showStorageRepository.show(e,t);if(!r)throw Error("Storage not found");let a=new f({account:r.account,password:r.password,storageId:r.id,usageLocation:r.usageLocation,userId:r.userId,description:r.description??"",link:r.link??""}),i=await this.showUserPerUserIdRepository.show(t);if(!i)throw Error("User not found");if(!await tt.default.compare(o,i.password_hash))throw Error("Invalid password");return a.showPassword(a.password)}};var I=require("zod"),Yt=I.z.object({password:I.z.string()}),$t=I.z.object({storageId:I.z.string(),userId:I.z.string()}),ce=class{async handle(e,t,o){try{let{password:r}=Yt.parse(e.body),{storageId:a,userId:i}=$t.parse(e.params);if(!r)return t.status(400).json({error:"Missing data"});let n=new y,p=new l,m=await new de(n,p).execute(a,i,r);return t.status(200).json({descryptedPassword:m})}catch(r){o(r)}}};var Te=(0,rt.Router)(),Kt=new ce;Te.post("/passwords/storages/:storageId",w,Kt.handle);var ot=require("express");var ke=g(require("dayjs"));var le=class{constructor(e,t){this.showRefreshTokenRepository=e;this.showUserPerUserIdRepository=t}async execute(e){let t=await this.showRefreshTokenRepository.show(e);if(!t)throw Error("Refresh token invalid");let o=await this.showUserPerUserIdRepository.show(t.userId);if(!o)throw Error("User not found");if(o.verifiedEmail!==!0)throw Error("Unverified email");let r=new h;if((0,ke.default)().isAfter(ke.default.unix(t.expiresIn)))throw Error("Refresh_token expired");return await r.authenticationProvider(t.userId,o.email)}};var me=class{async show(e){return await d.refresh_Token.findFirst({where:{id:e}})}};var Ne=require("zod");var Gt=Ne.z.object({refresh_token:Ne.z.string()}),ue=class{async handle(e,t,o){try{let{refresh_token:r}=Gt.parse(e.body),a=new me,i=new l,p=await new le(a,i).execute(r);return t.status(200).json({token:p})}catch(r){o(r)}}};var Ce=(0,ot.Router)(),Wt=new ue;Ce.post("/refresh-token",Wt.handle);var Fe=require("@prisma/client"),st=require("zod"),at=require("zod-validation-error"),it=async(s,e,t,o)=>{if(s instanceof Fe.Prisma.PrismaClientInitializationError)return t.status(500).json({error:"Failed to connect to the database"});if(s instanceof Fe.Prisma.PrismaClientKnownRequestError)return s.code==="P2025"?t.status(400).json({error:"The record no exists"}):s.code==="P2002"?t.status(400).json({error:"Record already exists"}):t.status(400).json({error:s.message});if(s instanceof st.ZodError){let{message:r}=(0,at.fromZodError)(s);return t.status(400).json({error:r})}if(s instanceof Error)return s.message==="invalid token"?t.status(401).json({error:s.message}):t.status(400).json({error:s.message});if(s)return t.status(400).json({error:"An error occurred"});o()};var ct=require("express");var dt=require("zod");var nt=g(require("events"));var Ae=class extends nt.default{},v=new Ae,he=class{constructor(){this._resetPassword(),this._verifiedEmail()}_verifiedEmail(){v.on("user/verifiedEmail-update",async e=>{await d.user.update({where:{id:e},data:{verifiedEmail:!0}})})}_resetPassword(){v.on("user/reset-password",async(e,t)=>{await d.user.update({where:{id:t},data:{password_hash:e}})})}};var fe=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let o=await new h(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(o)?(v.emit("user/verifiedEmail-update",o),!0):!1}};var pt=`<!DOCTYPE html>
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
</html>`;var Jt=dt.z.string(),C=class{async handle(e,t,o){try{let r=Jt.parse(e.query.token);if(!r)return t.status(401).send(`${pt}`);let a=new l,i=new fe(a),n=`Bearer ${r}`;return await i.execute(n)===!1?t.status(400).json({error:"N\xE3o foi possivel validar o email"}):t.status(200).json({message:"Email validado com sucesso"})}catch(r){o(r)}}};var Oe=(0,ct.Router)(),Xt=new C;Oe.post("/verify-email",Xt.handle);var ht=g(require("cors")),ft=g(require("helmet"));var lt=require("express");var ge=class{constructor(e){this.showUserPerEmail=e}async execute(e){let t=await this.showUserPerEmail.show(e);if(!t)throw Error("User not found");await new u({userEmail:t.email,userFullName:t.fullName,userId:t.id,userPassword:t.password_hash}).sendEmailToForgotPassword()}};var we=class{async handle(e,t,o){try{let r=e.body.email;if(!r)return t.status(400).json({error:"Missing data"});let a=new S;return await new ge(a).execute(r),t.status(200).json({message:"Foi enviado um e-mail para redefinir sua senha"})}catch(r){o(r)}}};var je=(0,lt.Router)(),Zt=new we;je.post("/forgot-password",Zt.handle);var ut=require("express");var ye=class{constructor(e){this.showUserPerIdRepository=e}async execute(e,t){let o=new h(this.showUserPerIdRepository),r=`Bearer ${e}`,a=await o.validAuth(r);if(!a)throw Error("Invalid token");let i=await this.showUserPerIdRepository.show(a);if(!i)throw Error("User not found");let p=await new u({userEmail:i.email,userFullName:i.fullName,userId:i.id,userPassword:i.password_hash}).encryptedPassword(t);v.emit("user/reset-password",p,i.id)}};var mt=require("zod");var Qt=mt.z.string(),be=class{async handle(e,t,o){try{let r=Qt.parse(e.query.token),a=e.body.newPassword;if(!r)throw Error("Missing token to reset password");if(!a)throw Error("Missing data");let i=new l;return await new ye(i).execute(r,a),t.status(200).json({message:"Senha atualizada com sucesso"})}catch(r){o(r)}}};var ze=(0,ut.Router)(),er=new be;ze.post("/reset-password",er.handle);var _e=class{constructor(){this.app=(0,qe.default)(),this._middlewares(),this._router(),this._lastMiddlewares(),new he}_middlewares(){this.app.use(qe.default.json());let e="https://passtorage.vercel.app",t={origin:(o,r)=>{o===e?r(null,!0):r(new Error("Acesso n\xE3o permitido por CORS"))}};this.app.use((0,ht.default)(t)),this.app.use((0,ft.default)())}_lastMiddlewares(){this.app.use(it)}_router(){this.app.use(N),this.app.use(U),this.app.use(ve),this.app.use(Te),this.app.use(Ce),this.app.use(Oe),this.app.use(je),this.app.use(ze)}},tr=new _e;
