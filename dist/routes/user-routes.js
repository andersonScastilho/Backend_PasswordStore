"use strict";var Y=Object.create;var f=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,W=Object.prototype.hasOwnProperty;var X=(o,e)=>{for(var r in e)f(o,r,{get:e[r],enumerable:!0})},_=(o,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of $(e))!W.call(o,t)&&t!==r&&f(o,t,{get:()=>e[t],enumerable:!(s=G(e,t))||s.enumerable});return o};var S=(o,e,r)=>(r=o!=null?Y(J(o)):{},_(e||!o||!o.__esModule?f(r,"default",{value:o,enumerable:!0}):r,o)),Q=o=>_(f({},"__esModule",{value:!0}),o);var ie={};X(ie,{userRouter:()=>T});module.exports=Q(ie);var L=require("express");var z=require("@prisma/client"),d=new z.PrismaClient;var m=class{async show(e){return await d.user.findUnique({where:{id:e}})}};var u=S(require("jsonwebtoken")),C=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!u.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:i}=u.default.verify(r,process.env.TOKEN_SECRET??""),a=await this.showUserPerUserIdRepository?.show(t);if(!a)throw Error("User not found");if(i!==a.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return u.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return u.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},b=C;var k=async(o,e,r)=>{let{authorization:s}=o.headers;try{let t=new m;if(!s)return e.status(401).json({errors:["Login required"]});let a=await new b(t).validAuth(s);return o.params={...o.params,userId:a},r()}catch{return e.status(401).json({error:"Token expired or invalid"})}};var h=require("zod");var H=require("uuid");var O=S(require("bcrypt"));var j=S(require("nodemailer")),A=class{constructor(e,r,s){this._recipient=e;this._subject=r;this._text=s;this.sender="leosilvacast@gmail.com"}sendEmail(){let e=j.default.createTransport({service:"gmail",auth:{type:"OAuth2",user:process.env.MAIL_USERNAME,clientId:process.env.OAUTH_CLIENTID,clientSecret:process.env.OAUTH_CLIENT_SECRET,refreshToken:process.env.OAUTH_REFRESH_TOKEN}}),r={from:this.sender,to:this._recipient,subject:this._subject,html:this._text};e.sendMail(r,function(s,t){console.log(s?"Error "+s:"Email sent successfully")})}},q=A;var c=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await O.default.hash(e,10)}async comparePasswords(e){return await O.default.compare(e,this.userPassword)}async updatePassword(e,r,s){if(!await this.comparePasswords(e))throw Error("Invalid password");if(r!==s)throw Error("Password confirmation must be the same as password");let i=await this.encryptedPassword(r);this.props.userPassword=i}async sendEmailToVerify(){let r=await new b().authenticationProvider(this.props.userId,this.props.userEmail),s="Verifica\xE7\xE3o de Email",t=`<!doctype html>
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
        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
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
                                          <td> <a href=${`${process.env.API_URL}/verify-email?token=${r}`} target="_blank">Validar Email</a> </td>
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
    </html>`;new q(this.props.userEmail,s,t).sendEmail()}};var g=class{constructor(e,r){this.createUserRepository=e;this.showUserperEmailRepository=r}async execute({userEmail:e,userFullName:r,userPassword:s}){if(await this.showUserperEmailRepository.show(e))throw Error("Email in use");let i=(0,H.v4)(),a=new c({userEmail:e,userFullName:r,userId:i,userPassword:s}),n=await a.encryptedPassword(s);return a.hashPasswordToUserPassword=n,await this.createUserRepository.create(a),a.sendEmailToVerify(),a}};var y=class{async create(e){let{userEmail:r,userFullName:s,userPassword:t,userId:i}=e,a=await d.user.create({data:{email:r,fullName:s,id:i,password_hash:t}});if(!a)throw Error("N\xE3o foi possivel criar o usuario");return a}};var E=class{async show(e){return await d.user.findUnique({where:{email:e}})}};var Z=h.z.object({email:h.z.string().email(),fullName:h.z.string(),password:h.z.string()}),U=class{async handle(e,r,s){try{let{email:t,fullName:i,password:a}=Z.parse(e.body),n=new y,l=new E,w=await new g(n,l).execute({userEmail:t,userFullName:i,userPassword:a});return r.status(200).json({email:w.userEmail,fullName:w.userFullName})}catch(t){s(t)}}};var x=class{constructor(e){this.showUserRepository=e}async execute(e){let r=await this.showUserRepository.show(e);if(!r)throw Error("User not found");return new c({userEmail:r.email,userFullName:r.fullName,userId:r.id,userPassword:r.password_hash})}};var F=require("zod"),ee=F.z.object({userId:F.z.string()}),R=class{async handle(e,r,s){try{let{userId:t}=ee.parse(e.params),i=new m,n=await new x(i).execute(t);return r.status(200).json({email:n.userEmail,fullName:n.userFullName})}catch(t){s(t)}}};var p=require("zod");var P=class{constructor(e,r){this.showUserPerUserIdRepository=e;this.updateUserRepository=r}async handle({userId:e,email:r,fullName:s,oldPassword:t,newPassword:i,newPasswordConfirmation:a}){let n=await this.showUserPerUserIdRepository.show(e);if(!n)throw Error("User not found");let l=new c({userId:n.id,userEmail:n.email,userFullName:n.fullName,userPassword:n.password_hash});return s&&(l.updateUserFullName=s),i&&t&&a&&await l.updatePassword(t,i,a),r&&(l.updateUserEmail=r),await this.updateUserRepository.update({userId:l.userId,email:l.userEmail,fullName:l.userFullName,newPassword:l.userPassword})}};var N=class{async update({email:e,fullName:r,newPassword:s,userId:t}){return await d.user.update({where:{id:t},data:{email:e,fullName:r,password_hash:s}})}};var re=p.z.object({email:p.z.string().email().optional(),oldPassword:p.z.string().optional(),newPassword:p.z.string().optional(),newPasswordConfirmation:p.z.string().optional(),fullName:p.z.string().optional()}),te=p.z.object({userId:p.z.string()}),I=class{async handle(e,r,s){try{let{email:t,newPassword:i,newPasswordConfirmation:a,oldPassword:n,fullName:l}=re.parse(e.body),{userId:v}=te.parse(e.params);if(i){if(!a)throw Error("newPasswordConfirmation is required to update password");if(!n)throw Error("oldPassword is required to update password")}if(!t&&!i&&!a&&!n&&!l)throw Error("Missing data");let w=new m,V=new N,D=new P(w,V),{email:M,fullName:B,id:K}=await D.handle({userId:v,email:t,fullName:l,newPassword:i,newPasswordConfirmation:a,oldPassword:n});return r.status(200).json({user:{email:M,fullName:B,id:K}})}catch(t){s(t)}}};var T=(0,L.Router)(),se=new U,oe=new R,ae=new I;T.post("/users",se.handle);T.get("/users",k,oe.handle);T.put("/users",k,ae.handle);0&&(module.exports={userRouter});
