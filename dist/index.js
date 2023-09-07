"use strict";var cr=Object.create;var Fe=Object.defineProperty;var dr=Object.getOwnPropertyDescriptor;var mr=Object.getOwnPropertyNames;var lr=Object.getPrototypeOf,ur=Object.prototype.hasOwnProperty;var hr=(s,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of mr(e))!ur.call(s,t)&&t!==r&&Fe(s,t,{get:()=>e[t],enumerable:!(o=dr(e,t))||o.enumerable});return s};var h=(s,e,r)=>(r=s!=null?cr(lr(s)):{},hr(e||!s||!s.__esModule?Fe(r,"default",{value:s,enumerable:!0}):r,s));var Te=h(require("express"));var Oe=require("express");var je=require("@prisma/client"),c=new je.PrismaClient;var l=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var v=h(require("jsonwebtoken")),he=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!v.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:a}=v.default.verify(r,process.env.TOKEN_SECRET??""),i=await this.showUserPerUserIdRepository?.show(t);if(!i)throw Error("User not found");if(a!==i.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return v.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return v.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},g=he;var f=async(s,e,r)=>{let{authorization:o}=s.headers;try{let t=new l;if(!o)return e.status(401).json({errors:["Login required"]});let i=await new g(t).validAuth(o);return s.params={...s.params,userId:i},r()}catch{return e.status(401).json({error:"Token expired or invalid"})}};var k=require("zod");var _e=require("uuid");var ge=h(require("bcrypt"));var Ae=h(require("nodemailer")),fe=class{constructor(e,r,o){this._recipient=e;this._subject=r;this._text=o;this.sender="leosilvacast@gmail.com"}sendEmail(){let e=Ae.default.createTransport({service:"gmail",auth:{type:"OAuth2",user:process.env.MAIL_USERNAME,clientId:process.env.OAUTH_CLIENTID,clientSecret:process.env.OAUTH_CLIENT_SECRET,refreshToken:process.env.OAUTH_REFRESH_TOKEN}}),r={from:this.sender,to:this._recipient,subject:this._subject,html:this._text};e.sendMail(r,function(o,t){console.log(o?"Error "+o:"Email sent successfully")})}},qe=fe;var w=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await ge.default.hash(e,10)}async comparePasswords(e){return await ge.default.compare(e,this.userPassword)}async updatePassword(e,r,o){if(!await this.comparePasswords(e))throw Error("Invalid password");if(r!==o)throw Error("Password confirmation must be the same as password");let a=await this.encryptedPassword(r);this.props.userPassword=a}async sendEmailToVerify(){let r=await new g().authenticationProvider(this.props.userId,this.props.userEmail),o="Verifica\xE7\xE3o de Email",t=`<!doctype html>
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
    </html>`;new qe(this.props.userEmail,o,t).sendEmail()}};var C=class{constructor(e,r){this.createUserRepository=e;this.showUserperEmailRepository=r}async execute({userEmail:e,userFullName:r,userPassword:o}){if(await this.showUserperEmailRepository.show(e))throw Error("Email in use");let a=(0,_e.v4)(),i=new w({userEmail:e,userFullName:r,userId:a,userPassword:o}),n=await i.encryptedPassword(o);return i.hashPasswordToUserPassword=n,await this.createUserRepository.create(i),i.sendEmailToVerify(),i}};var F=class{async create(e){let{userEmail:r,userFullName:o,userPassword:t,userId:a}=e,i=await c.user.create({data:{email:r,fullName:o,id:a,password_hash:t}});if(!i)throw Error("N\xE3o foi possivel criar o usuario");return i}};var P=class{async show(e){return await c.user.findUnique({where:{email:e}})}};var fr=k.z.object({email:k.z.string().email(),fullName:k.z.string(),password:k.z.string()}),j=class{async handle(e,r,o){try{let{email:t,fullName:a,password:i}=fr.parse(e.body),n=new F,p=new P,m=await new C(n,p).execute({userEmail:t,userFullName:a,userPassword:i});return r.status(200).json({email:m.userEmail,fullName:m.userFullName})}catch(t){o(t)}}};var A=class{constructor(e){this.showUserRepository=e}async execute(e){let r=await this.showUserRepository.show(e);if(!r)throw Error("User not found");return new w({userEmail:r.email,userFullName:r.fullName,userId:r.id,userPassword:r.password_hash})}};var we=require("zod"),gr=we.z.object({userId:we.z.string()}),q=class{async handle(e,r,o){try{let{userId:t}=gr.parse(e.params),a=new l,n=await new A(a).execute(t);return r.status(200).json({email:n.userEmail,fullName:n.userFullName})}catch(t){o(t)}}};var S=require("zod");var _=class{constructor(e,r){this.showUserPerUserIdRepository=e;this.updateUserRepository=r}async handle({userId:e,email:r,fullName:o,oldPassword:t,newPassword:a,newPasswordConfirmation:i}){let n=await this.showUserPerUserIdRepository.show(e);if(!n)throw Error("User not found");let p=new w({userId:n.id,userEmail:n.email,userFullName:n.fullName,userPassword:n.password_hash});return o&&(p.updateUserFullName=o),a&&t&&i&&await p.updatePassword(t,a,i),r&&(p.updateUserEmail=r),await this.updateUserRepository.update({userId:p.userId,email:p.userEmail,fullName:p.userFullName,newPassword:p.userPassword})}};var O=class{async update({email:e,fullName:r,newPassword:o,userId:t}){return await c.user.update({where:{id:t},data:{email:e,fullName:r,password_hash:o}})}};var wr=S.z.object({email:S.z.string().email().optional(),oldPassword:S.z.string().optional(),newPassword:S.z.string().optional(),newPasswordConfirmation:S.z.string().optional(),fullName:S.z.string().optional()}),yr=S.z.object({userId:S.z.string()}),z=class{async handle(e,r,o){try{let{email:t,newPassword:a,newPasswordConfirmation:i,oldPassword:n,fullName:p}=wr.parse(e.body),{userId:d}=yr.parse(e.params);if(a){if(!i)throw Error("newPasswordConfirmation is required to update password");if(!n)throw Error("oldPassword is required to update password")}if(!t&&!a&&!i&&!n&&!p)throw Error("Missing data");let m=new l,U=new O,x=new _(m,U),{email:Ce,fullName:ue,id:pr}=await x.handle({userId:d,email:t,fullName:p,newPassword:a,newPasswordConfirmation:i,oldPassword:n});return r.status(200).json({user:{email:Ce,fullName:ue,id:pr}})}catch(t){o(t)}}};var T=(0,Oe.Router)(),Rr=new j,xr=new q,Sr=new z;T.post("/users",Rr.handle);T.get("/users",f,xr.handle);T.put("/users",f,Sr.handle);var Me=require("express");var He=require("uuid");var L=h(require("crypto")),Le="aes-256-gcm",De=Buffer.from(process.env.SECRET_CRYPTO??"","hex"),ze=L.default.randomBytes(16),Ve=s=>{try{let e=L.default.createCipheriv(Le,De,ze),r=Buffer.concat([e.update(s.toString()),e.final()]),o=e.getAuthTag();return{iv:ze.toString("hex"),content:r.toString("hex"),tag:o.toString("hex")}}catch{throw Error("Erro ao criptografar os dados")}},Be=s=>{try{let e=L.default.createDecipheriv(Le,De,Buffer.from(s.iv,"hex"));e.setAuthTag(Buffer.from(s.tag,"hex"));let r=Buffer.from(s.content,"hex");return Buffer.concat([e.update(r),e.final()]).toString("utf8")}catch{throw new Error("Erro ao descriptografar os dados.")}};var u=class{get storageId(){return this.props.storageId}get password(){return this.props.password}get account(){return this.props.account}get usageLocation(){return this.props.usageLocation}get link(){return this.props.link}get description(){return this.props.description}get userId(){return this.props.userId}set updatePassword(e){this.props.password=e}constructor(e){this.props=e}showPassword(e){let[r,o,t]=e.split(":");return Be({iv:r,content:o,tag:t})}};var D=class{constructor(e){this.storageRepository=e}async execute({account:e,password:r,usageLocation:o,description:t,link:a,userId:i}){let n=(0,He.v4)(),{iv:p,content:d,tag:m}=Ve(r),U=`${p}:${d}:${m}`,x=new u({password:U,account:e,usageLocation:o,description:t,link:a,userId:i,storageId:n});return await this.storageRepository.create(x),x.updatePassword="",x}};var V=class{async create(e){let{account:r,description:o,link:t,password:a,usageLocation:i,userId:n,storageId:p}=e,d=await c.storage.create({data:{account:r,id:p,password:a,usageLocation:i,description:o,link:t,userId:n}});if(!d)throw Error("N\xE3o foi possivel armazenar os dados");return d}};var b=require("zod"),br=b.z.object({password:b.z.string(),account:b.z.string(),usageLocation:b.z.string(),link:b.z.string(),description:b.z.string()}),Er=b.z.object({userId:b.z.string()}),B=class{async handle(e,r,o){try{let{password:t,account:a,usageLocation:i,link:n,description:p}=br.parse(e.body),{userId:d}=Er.parse(e.params),m=new V,x=await new D(m).execute({account:a,password:t,usageLocation:i,description:p,link:n,userId:d});return r.status(200).json(x)}catch(t){o(t)}}};var H=class{async index(e){return await c.storage.findMany({where:{userId:e}})}};var M=class{constructor(e){this.indexStorageRepository=e}async execute(e){let r=await this.indexStorageRepository.index(e),o=[];return r.forEach(t=>{let a=new u({account:t.account,password:"",storageId:t.id,usageLocation:t.usageLocation,userId:t.userId,description:t.description||void 0,link:t.link||void 0});o.push(a)}),o}};var ye=require("zod"),Ur=ye.z.object({userId:ye.z.string()}),Y=class{async handle(e,r,o){try{let{userId:t}=Ur.parse(e.params);if(!t)return r.status(401).json({error:"Login required"});let a=new H,n=await new M(a).execute(t);return r.status(200).json({storages:n})}catch(t){o(t)}}};var y=class{async show(e,r){return await c.storage.findFirst({where:{AND:{id:e,userId:r}}})}};var $=class{constructor(e){this.showStorageRepository=e}async execute(e,r){let o=await this.showStorageRepository.show(e,r);if(!o)throw Error("Storage not found");return new u({account:o.account,password:"",storageId:o.id,usageLocation:o.usageLocation,userId:o.userId,description:o.description||"",link:o.link||""})}};var K=require("zod"),Pr=K.z.object({storageId:K.z.string(),userId:K.z.string()}),G=class{async handle(e,r,o){try{let{storageId:t,userId:a}=Pr.parse(e.params),i=new y,p=await new $(i).execute(t,a);return r.status(200).json(p)}catch(t){o(t)}}};var J=class{async update({account:e,description:r,link:o,usageLocation:t,storageId:a,password:i}){return await c.storage.update({where:{id:a},data:{account:e,description:r,link:o,usageLocation:t,password:i}})}};var W=class{constructor(e,r){this.updateStorageReposirory=e;this.showStorageRepository=r}async execute({storageId:e,account:r,description:o,link:t,usageLocation:a,userId:i,password:n}){if(!await this.showStorageRepository.show(e,i))throw Error("Storage not found");let d=await this.updateStorageReposirory.update({storageId:e,account:r,userId:i,description:o,link:t,usageLocation:a,password:n});return new u({account:d.account,password:"",storageId:d.id,usageLocation:d.usageLocation,userId:d.userId,description:d.description||"",link:d.link||""})}};var R=require("zod"),Ir=R.z.object({account:R.z.string().optional(),usageLocation:R.z.string().optional(),description:R.z.string().optional(),link:R.z.string().optional(),password:R.z.string().optional()}),vr=R.z.object({userId:R.z.string(),storageId:R.z.string()}),X=class{async handle(e,r,o){try{let{account:t,usageLocation:a,description:i,link:n,password:p}=Ir.parse(e.body),{userId:d,storageId:m}=vr.parse(e.params);if(!t&&!a&&!i&&!n)return r.status(400).json({error:"Missing data"});let U=new J,x=new y,ue=await new W(U,x).execute({account:t,storageId:m,userId:d,description:i,link:n,usageLocation:a,password:p});return r.status(200).json({storage:ue})}catch(t){o(t)}}};var Z=class{async delete(e){await c.storage.delete({where:{id:e}})}};var Q=class{constructor(e,r){this.deleteStorageRepository=e;this.showStorageRepository=r}async execute(e,r){if(!await this.showStorageRepository.show(e,r))throw Error("Storage not found");await this.deleteStorageRepository.delete(e)}};var ee=require("zod"),kr=ee.z.object({userId:ee.z.string(),storageId:ee.z.string()}),re=class{async handle(e,r,o){try{let{userId:t,storageId:a}=kr.parse(e.params),i=new Z,n=new y;return await new Q(i,n).execute(a,t),r.status(200).json({})}catch(t){o(t)}}};var Tr=new B,Nr=new Y,Cr=new G,Fr=new X,jr=new re,E=(0,Me.Router)();E.post("/storages",f,Tr.handle);E.get("/storages",f,Nr.handle);E.get("/storages/:storageId",f,Cr.handle);E.put("/storages/:storageId",f,Fr.handle);E.delete("/storages/:storageId",f,jr.handle);var Ke=require("express");var Ye=h(require("dayjs")),$e=require("uuid"),te=class{constructor(e,r,o){this.showUserPerEmailRepository=e;this.createRefreshTokenRepository=r;this.deleteRefreshTokenRepository=o}async execute({email:e,password:r}){let o=await this.showUserPerEmailRepository.show(e);if(!o)throw Error("User not found");if(console.log(o),o.verifiedEmail!==!0)throw Error("Unverified email");let t=new w({userEmail:o.email,userFullName:o.fullName,userId:o.id,userPassword:o.password_hash}),a=new g;await this.deleteRefreshTokenRepository.delete(o.id);let i=await a.authentication(t,r),n=(0,$e.v4)(),p=(0,Ye.default)().add(7,"days").unix(),d=await this.createRefreshTokenRepository.create({expiresIn:p,id:n,userId:t.userId});return{token:i,refreshToken:d}}};var oe=class{async create({expiresIn:e,id:r,userId:o}){return await c.refresh_Token.create({data:{expiresIn:e,id:r,userId:o}})}};var se=class{async delete(e){await c.refresh_Token.deleteMany({where:{userId:e}})}};var ae=require("zod"),Ar=ae.z.object({email:ae.z.string().email(),password:ae.z.string()}),ie=class{async handle(e,r,o){try{let{email:t,password:a}=Ar.parse(e.body);if(!t||!a)return r.status(400).json({error:"Missing data"});let i=new P,n=new oe,p=new se,m=await new te(i,n,p).execute({email:t,password:a});return r.status(200).json(m)}catch(t){o(t)}}};var Re=(0,Ke.Router)(),qr=new ie;Re.post("/auth",qr.handle);var Je=require("express");var Ge=h(require("bcrypt")),ne=class{constructor(e,r){this.showStorageRepository=e;this.showUserPerUserIdRepository=r}async execute(e,r,o){let t=await this.showStorageRepository.show(e,r);if(!t)throw Error("Storage not found");let a=new u({account:t.account,password:t.password,storageId:t.id,usageLocation:t.usageLocation,userId:t.userId,description:t.description??"",link:t.link??""}),i=await this.showUserPerUserIdRepository.show(r);if(!i)throw Error("User not found");if(!await Ge.default.compare(o,i.password_hash))throw Error("Invalid password");return a.showPassword(a.password)}};var I=require("zod"),_r=I.z.object({password:I.z.string()}),Or=I.z.object({storageId:I.z.string(),userId:I.z.string()}),pe=class{async handle(e,r,o){try{let{password:t}=_r.parse(e.body),{storageId:a,userId:i}=Or.parse(e.params);if(!t)return r.status(400).json({error:"Missing data"});let n=new y,p=new l,m=await new ne(n,p).execute(a,i,t);return r.status(200).json({descryptedPassword:m})}catch(t){o(t)}}};var xe=(0,Je.Router)(),zr=new pe;xe.post("/passwords/storages/:storageId",f,zr.handle);var We=require("express");var Se=h(require("dayjs"));var ce=class{constructor(e,r){this.showRefreshTokenRepository=e;this.showUserPerUserIdRepository=r}async execute(e){let r=await this.showRefreshTokenRepository.show(e);if(!r)throw Error("Refresh token invalid");let o=await this.showUserPerUserIdRepository.show(r.userId);if(!o)throw Error("User not found");if(o.verifiedEmail!==!0)throw Error("Unverified email");let t=new g;if((0,Se.default)().isAfter(Se.default.unix(r.expiresIn)))throw Error("Refresh_token expired");return await t.authenticationProvider(r.userId,o.email)}};var de=class{async show(e){return await c.refresh_Token.findFirst({where:{id:e}})}};var be=require("zod");var Lr=be.z.object({refresh_token:be.z.string()}),me=class{async handle(e,r,o){try{let{refresh_token:t}=Lr.parse(e.body),a=new de,i=new l,p=await new ce(a,i).execute(t);return r.status(200).json({token:p})}catch(t){o(t)}}};var Ee=(0,We.Router)(),Dr=new me;Ee.post("/refresh-token",Dr.handle);var Ue=require("@prisma/client"),Xe=require("zod"),Ze=require("zod-validation-error"),Qe=async(s,e,r,o)=>{if(s instanceof Ue.Prisma.PrismaClientInitializationError)return r.status(500).json({error:"Failed to connect to the database"});if(s instanceof Ue.Prisma.PrismaClientKnownRequestError)return s.code==="P2025"?r.status(400).json({error:"The record no exists"}):s.code==="P2002"?r.status(400).json({error:"Record already exists"}):r.status(400).json({error:s.message});if(s instanceof Xe.ZodError){let{message:t}=(0,Ze.fromZodError)(s);return r.status(400).json({error:t})}if(s instanceof Error)return s.message==="invalid token"?r.status(401).json({error:s.message}):r.status(400).json({error:s.message});if(s)return r.status(400).json({error:"An error occurred"});o()};var sr=require("express");var or=require("zod");var er=h(require("events"));var Pe=class extends er.default{},Ie=new Pe;function rr(){Ie.on("user/verifiedEmail-update",async s=>{await c.user.update({where:{id:s},data:{verifiedEmail:!0}})})}var le=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let o=await new g(this.showUserPerIdRepository).validAuth(e);return await this.showUserPerIdRepository.show(o)?(Ie.emit("user/verifiedEmail-update",o),!0):!1}};var tr=`<!DOCTYPE html>
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
</html>`,ve=`<!DOCTYPE html>
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
</html>`;var Vr=or.z.string(),N=class{async handle(e,r,o){try{let t=Vr.parse(e.query.token);if(!t)return r.status(401).send(`${ve}`);let a=new l,i=new le(a),n=`Bearer ${t}`;return await i.execute(n)===!1?r.status(400).send(`${ve}`):r.status(200).send(`${tr}`)}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};var ke=(0,sr.Router)(),Br=new N;ke.get("/verify-email",Br.handle);var ar=h(require("cors")),ir=h(require("helmet"));var Ne=class{constructor(){this.app=(0,Te.default)(),this._middlewares(),this._router(),this._lastMiddlewares(),rr()}_middlewares(){this.app.use(Te.default.json()),this.app.use((0,ar.default)()),this.app.use((0,ir.default)())}_lastMiddlewares(){this.app.use(Qe)}_router(){this.app.use(T),this.app.use(E),this.app.use(Re),this.app.use(xe),this.app.use(Ee),this.app.use(ke)}},nr=new Ne;nr.app.listen(3002,()=>{console.log("Servidor rodando na porta 3000 ")});
