"use strict";var or=Object.create;var ve=Object.defineProperty;var sr=Object.getOwnPropertyDescriptor;var ar=Object.getOwnPropertyNames;var ir=Object.getPrototypeOf,nr=Object.prototype.hasOwnProperty;var pr=(s,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of ar(e))!nr.call(s,t)&&t!==r&&ve(s,t,{get:()=>e[t],enumerable:!(o=sr(e,t))||o.enumerable});return s};var f=(s,e,r)=>(r=s!=null?or(ir(s)):{},pr(e||!s||!s.__esModule?ve(r,"default",{value:s,enumerable:!0}):r,s));var Ie=f(require("express"));var Ae=require("express");var Ne=require("@prisma/client"),c=new Ne.PrismaClient;var l=class{async show(e){return await c.user.findUnique({where:{id:e}})}};var k=f(require("jsonwebtoken")),he=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!k.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:a}=k.default.verify(r,process.env.TOKEN_SECRET??""),i=await this.showUserPerUserIdRepository?.show(t);if(a!==i?.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return k.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return k.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},g=he;var h=async(s,e,r)=>{let{authorization:o}=s.headers;try{let t=new l;if(!o)return e.status(401).json({errors:["Login required"]});let i=await new g(t).validAuth(o);return s.params={...s.params,userId:i},r()}catch{return e.status(401).json({error:"Token expired or invalid"})}};var T=require("zod");var je=require("uuid");var ge=f(require("bcrypt"));var Ce=f(require("nodemailer")),fe=class{constructor(e,r,o){this._recipient=e;this._subject=r;this._text=o;this.sender="leosilvacast@gmail.com"}sendEmail(){let e=Ce.default.createTransport({service:"gmail",auth:{type:"OAuth2",user:process.env.MAIL_USERNAME,clientId:process.env.OAUTH_CLIENTID,clientSecret:process.env.OAUTH_CLIENT_SECRET,refreshToken:process.env.OAUTH_REFRESH_TOKEN}}),r={from:this.sender,to:this._recipient,subject:this._subject,html:this._text};e.sendMail(r,function(o,t){console.log(o?"Error "+o:"Email sent successfully")})}},Fe=fe;var w=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await ge.default.hash(e,10)}async comparePasswords(e){return await ge.default.compare(e,this.userPassword)}async updatePassword(e,r,o){if(!await this.comparePasswords(e))throw Error("Invalid password");if(r!==o)throw Error("Password confirmation must be the same as password");let a=await this.encryptedPassword(r);this.props.userPassword=a}async sendEmailToVerify(){let r=await new g().authenticationProvider(this.props.userId,this.props.userEmail),o="Verifica\xE7\xE3o de Email",t=`<!doctype html>
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
                            <p>Hi there,</p>
                            <p>Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href=${`${process.env.API_URL}/verify-email?token=${r}`} target="_blank">Call To Action</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p>
                            <p>Good luck! Hope it works.</p>
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
                      <td class="content-block">
                        <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                        <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by">
                        Powered by <a href="http://htmlemail.io">HTMLemail</a>.
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
    </html>`;new Fe(this.props.userEmail,o,t).sendEmail()}};var C=class{constructor(e,r){this.createUserRepository=e;this.showUserperEmailRepository=r}async execute({userEmail:e,userFullName:r,userPassword:o}){if(await this.showUserperEmailRepository.show(e))throw Error("Email in use");let a=(0,je.v4)(),i=new w({userEmail:e,userFullName:r,userId:a,userPassword:o}),n=await i.encryptedPassword(o);return i.hashPasswordToUserPassword=n,await this.createUserRepository.create(i),i.sendEmailToVerify(),i}};var F=class{async create(e){let{userEmail:r,userFullName:o,userPassword:t,userId:a}=e,i=await c.user.create({data:{email:r,fullName:o,id:a,password_hash:t}});if(!i)throw Error("N\xE3o foi possivel criar o usuario");return i}};var P=class{async show(e){return await c.user.findUnique({where:{email:e}})}};var cr=T.z.object({email:T.z.string().email(),fullName:T.z.string(),password:T.z.string()}),j=class{async handle(e,r,o){try{let{email:t,fullName:a,password:i}=cr.parse(e.body),n=new F,p=new P,d=await new C(n,p).execute({userEmail:t,userFullName:a,userPassword:i});return r.status(200).json({email:d.userEmail,fullName:d.userFullName})}catch(t){o(t)}}};var A=class{constructor(e){this.showUserRepository=e}async execute(e){let r=await this.showUserRepository.show(e);if(!r)throw Error("User not found");return new w({userEmail:r.email,userFullName:r.fullName,userId:r.id,userPassword:r.password_hash})}};var we=require("zod"),mr=we.z.object({userId:we.z.string()}),q=class{async handle(e,r,o){try{let{userId:t}=mr.parse(e.params),a=new l,n=await new A(a).execute(t);return r.status(200).json({email:n.userEmail,fullName:n.userFullName})}catch(t){o(t)}}};var x=require("zod");var _=class{constructor(e,r){this.showUserPerUserIdRepository=e;this.updateUserRepository=r}async handle({userId:e,email:r,fullName:o,oldPassword:t,newPassword:a,newPasswordConfirmation:i}){let n=await this.showUserPerUserIdRepository.show(e);if(!n)throw Error("User not found");let p=new w({userId:n.id,userEmail:n.email,userFullName:n.fullName,userPassword:n.password_hash});return o&&(p.updateUserFullName=o),a&&t&&i&&await p.updatePassword(t,a,i),r&&(p.updateUserEmail=r),await this.updateUserRepository.update({userId:p.userId,email:p.userEmail,fullName:p.userFullName,newPassword:p.userPassword})}};var L=class{async update({email:e,fullName:r,newPassword:o,userId:t}){return await c.user.update({where:{id:t},data:{email:e,fullName:r,password_hash:o}})}};var dr=x.z.object({email:x.z.string().email().optional(),oldPassword:x.z.string().optional(),newPassword:x.z.string().optional(),newPasswordConfirmation:x.z.string().optional(),fullName:x.z.string().optional()}),lr=x.z.object({userId:x.z.string()}),z=class{async handle(e,r,o){try{let{email:t,newPassword:a,newPasswordConfirmation:i,oldPassword:n,fullName:p}=dr.parse(e.body),{userId:m}=lr.parse(e.params);if(a){if(!i)throw Error("newPasswordConfirmation is required to update password");if(!n)throw Error("oldPassword is required to update password")}if(!t&&!a&&!i&&!n&&!p)throw Error("Missing data");let d=new l,E=new L,S=new _(d,E),{email:Te,fullName:ue,id:tr}=await S.handle({userId:m,email:t,fullName:p,newPassword:a,newPasswordConfirmation:i,oldPassword:n});return r.status(200).json({user:{email:Te,fullName:ue,id:tr}})}catch(t){o(t)}}};var v=(0,Ae.Router)(),ur=new j,hr=new q,fr=new z;v.post("/users",ur.handle);v.get("/users",h,hr.handle);v.put("/users",h,fr.handle);var He=require("express");var De=require("uuid");var O=f(require("crypto")),_e="aes-256-gcm",Le=Buffer.from(process.env.SECRET_CRYPTO??"","hex"),qe=O.default.randomBytes(16),ze=s=>{try{let e=O.default.createCipheriv(_e,Le,qe),r=Buffer.concat([e.update(s.toString()),e.final()]),o=e.getAuthTag();return{iv:qe.toString("hex"),content:r.toString("hex"),tag:o.toString("hex")}}catch{throw Error("Erro ao criptografar os dados")}},Oe=s=>{try{let e=O.default.createDecipheriv(_e,Le,Buffer.from(s.iv,"hex"));e.setAuthTag(Buffer.from(s.tag,"hex"));let r=Buffer.from(s.content,"hex");return Buffer.concat([e.update(r),e.final()]).toString("utf8")}catch{throw new Error("Erro ao descriptografar os dados.")}};var u=class{get storageId(){return this.props.storageId}get password(){return this.props.password}get account(){return this.props.account}get usageLocation(){return this.props.usageLocation}get link(){return this.props.link}get description(){return this.props.description}get userId(){return this.props.userId}set updatePassword(e){this.props.password=e}constructor(e){this.props=e}showPassword(e){let[r,o,t]=e.split(":");return Oe({iv:r,content:o,tag:t})}};var D=class{constructor(e){this.storageRepository=e}async execute({account:e,password:r,usageLocation:o,description:t,link:a,userId:i}){let n=(0,De.v4)(),{iv:p,content:m,tag:d}=ze(r),E=`${p}:${m}:${d}`,S=new u({password:E,account:e,usageLocation:o,description:t,link:a,userId:i,storageId:n});return await this.storageRepository.create(S),S.updatePassword="",S}};var H=class{async create(e){let{account:r,description:o,link:t,password:a,usageLocation:i,userId:n,storageId:p}=e,m=await c.storage.create({data:{account:r,id:p,password:a,usageLocation:i,description:o,link:t,userId:n}});if(!m)throw Error("N\xE3o foi possivel armazenar os dados");return m}};var b=require("zod"),gr=b.z.object({password:b.z.string(),account:b.z.string(),usageLocation:b.z.string(),link:b.z.string(),description:b.z.string()}),wr=b.z.object({userId:b.z.string()}),M=class{async handle(e,r,o){try{let{password:t,account:a,usageLocation:i,link:n,description:p}=gr.parse(e.body),{userId:m}=wr.parse(e.params),d=new H,S=await new D(d).execute({account:a,password:t,usageLocation:i,description:p,link:n,userId:m});return r.status(200).json(S)}catch(t){o(t)}}};var B=class{async index(e){return await c.storage.findMany({where:{userId:e}})}};var V=class{constructor(e){this.indexStorageRepository=e}async execute(e){let r=await this.indexStorageRepository.index(e),o=[];return r.forEach(t=>{let a=new u({account:t.account,password:"",storageId:t.id,usageLocation:t.usageLocation,userId:t.userId,description:t.description||void 0,link:t.link||void 0});o.push(a)}),o}};var ye=require("zod"),yr=ye.z.object({userId:ye.z.string()}),K=class{async handle(e,r,o){try{let{userId:t}=yr.parse(e.params);if(!t)return r.status(401).json({error:"Login required"});let a=new B,n=await new V(a).execute(t);return r.status(200).json({storages:n})}catch(t){o(t)}}};var y=class{async show(e,r){return await c.storage.findFirst({where:{AND:{id:e,userId:r}}})}};var Y=class{constructor(e){this.showStorageRepository=e}async execute(e,r){let o=await this.showStorageRepository.show(e,r);if(!o)throw Error("Storage not found");return new u({account:o.account,password:"",storageId:o.id,usageLocation:o.usageLocation,userId:o.userId,description:o.description||"",link:o.link||""})}};var $=require("zod"),Rr=$.z.object({storageId:$.z.string(),userId:$.z.string()}),G=class{async handle(e,r,o){try{let{storageId:t,userId:a}=Rr.parse(e.params),i=new y,p=await new Y(i).execute(t,a);return r.status(200).json(p)}catch(t){o(t)}}};var J=class{async update({account:e,description:r,link:o,usageLocation:t,storageId:a,password:i}){return await c.storage.update({where:{id:a},data:{account:e,description:r,link:o,usageLocation:t,password:i}})}};var W=class{constructor(e,r){this.updateStorageReposirory=e;this.showStorageRepository=r}async execute({storageId:e,account:r,description:o,link:t,usageLocation:a,userId:i,password:n}){if(!await this.showStorageRepository.show(e,i))throw Error("Storage not found");let m=await this.updateStorageReposirory.update({storageId:e,account:r,userId:i,description:o,link:t,usageLocation:a,password:n});return new u({account:m.account,password:"",storageId:m.id,usageLocation:m.usageLocation,userId:m.userId,description:m.description||"",link:m.link||""})}};var R=require("zod"),Sr=R.z.object({account:R.z.string().optional(),usageLocation:R.z.string().optional(),description:R.z.string().optional(),link:R.z.string().optional(),password:R.z.string().optional()}),xr=R.z.object({userId:R.z.string(),storageId:R.z.string()}),X=class{async handle(e,r,o){try{let{account:t,usageLocation:a,description:i,link:n,password:p}=Sr.parse(e.body),{userId:m,storageId:d}=xr.parse(e.params);if(!t&&!a&&!i&&!n)return r.status(400).json({error:"Missing data"});let E=new J,S=new y,ue=await new W(E,S).execute({account:t,storageId:d,userId:m,description:i,link:n,usageLocation:a,password:p});return r.status(200).json({storage:ue})}catch(t){o(t)}}};var Z=class{async delete(e){await c.storage.delete({where:{id:e}})}};var Q=class{constructor(e,r){this.deleteStorageRepository=e;this.showStorageRepository=r}async execute(e,r){if(!await this.showStorageRepository.show(e,r))throw Error("Storage not found");await this.deleteStorageRepository.delete(e)}};var ee=require("zod"),br=ee.z.object({userId:ee.z.string(),storageId:ee.z.string()}),re=class{async handle(e,r,o){try{let{userId:t,storageId:a}=br.parse(e.params),i=new Z,n=new y;return await new Q(i,n).execute(a,t),r.status(200).json({})}catch(t){o(t)}}};var Ur=new M,Er=new K,Pr=new G,Ir=new X,kr=new re,U=(0,He.Router)();U.post("/storages",h,Ur.handle);U.get("/storages",h,Er.handle);U.get("/storages/:storageId",h,Pr.handle);U.put("/storages/:storageId",h,Ir.handle);U.delete("/storages/:storageId",h,kr.handle);var Ve=require("express");var Me=f(require("dayjs")),Be=require("uuid"),te=class{constructor(e,r,o){this.showUserPerEmailRepository=e;this.createRefreshTokenRepository=r;this.deleteRefreshTokenRepository=o}async execute({email:e,password:r}){let o=await this.showUserPerEmailRepository.show(e);if(!o)throw Error("User not found");let t=new w({userEmail:o.email,userFullName:o.fullName,userId:o.id,userPassword:o.password_hash}),a=new g;await this.deleteRefreshTokenRepository.delete(o.id);let i=await a.authentication(t,r),n=(0,Be.v4)(),p=(0,Me.default)().add(7,"days").unix(),m=await this.createRefreshTokenRepository.create({expiresIn:p,id:n,userId:t.userId});return{token:i,refreshToken:m}}};var oe=class{async create({expiresIn:e,id:r,userId:o}){return await c.refresh_Token.create({data:{expiresIn:e,id:r,userId:o}})}};var se=class{async delete(e){await c.refresh_Token.deleteMany({where:{userId:e}})}};var ae=require("zod"),Tr=ae.z.object({email:ae.z.string().email(),password:ae.z.string()}),ie=class{async handle(e,r,o){try{let{email:t,password:a}=Tr.parse(e.body);if(!t||!a)return r.status(400).json({error:"Missing data"});let i=new P,n=new oe,p=new se,d=await new te(i,n,p).execute({email:t,password:a});return r.status(200).json(d)}catch(t){o(t)}}};var Re=(0,Ve.Router)(),vr=new ie;Re.post("/auth",vr.handle);var Ye=require("express");var Ke=f(require("bcrypt")),ne=class{constructor(e,r){this.showStorageRepository=e;this.showUserPerUserIdRepository=r}async execute(e,r,o){let t=await this.showStorageRepository.show(e,r);if(!t)throw Error("Storage not found");let a=new u({account:t.account,password:t.password,storageId:t.id,usageLocation:t.usageLocation,userId:t.userId,description:t.description??"",link:t.link??""}),i=await this.showUserPerUserIdRepository.show(r);if(!i)throw Error("User not found");if(!await Ke.default.compare(o,i.password_hash))throw Error("Invalid password");return a.showPassword(a.password)}};var I=require("zod"),Nr=I.z.object({password:I.z.string()}),Cr=I.z.object({storageId:I.z.string(),userId:I.z.string()}),pe=class{async handle(e,r,o){try{let{password:t}=Nr.parse(e.body),{storageId:a,userId:i}=Cr.parse(e.params);if(!t)return r.status(400).json({error:"Missing data"});let n=new y,p=new l,d=await new ne(n,p).execute(a,i,t);return r.status(200).json({descryptedPassword:d})}catch(t){o(t)}}};var Se=(0,Ye.Router)(),Fr=new pe;Se.post("/passwords/storages/:storageId",h,Fr.handle);var $e=require("express");var xe=f(require("dayjs"));var ce=class{constructor(e,r){this.showRefreshTokenRepository=e;this.showUserPerUserIdRepository=r}async execute(e){let r=await this.showRefreshTokenRepository.show(e);if(!r)throw Error("Refresh token invalid");let o=await this.showUserPerUserIdRepository.show(r.userId);if(!o)throw Error("User not found");let t=new g;if((0,xe.default)().isAfter(xe.default.unix(r.expiresIn)))throw Error("Refresh_token expired");return await t.authenticationProvider(r.userId,o.email)}};var me=class{async show(e){return await c.refresh_Token.findFirst({where:{id:e}})}};var be=require("zod");var jr=be.z.object({refresh_token:be.z.string()}),de=class{async handle(e,r,o){try{let{refresh_token:t}=jr.parse(e.body),a=new me,i=new l,p=await new ce(a,i).execute(t);return r.status(200).json({token:p})}catch(t){o(t)}}};var Ue=(0,$e.Router)(),Ar=new de;Ue.post("/refresh-token",Ar.handle);var Ee=require("@prisma/client"),Ge=require("zod"),Je=require("zod-validation-error"),We=async(s,e,r,o)=>{if(s instanceof Ee.Prisma.PrismaClientInitializationError)return r.status(500).json({error:"Failed to connect to the database"});if(s instanceof Ee.Prisma.PrismaClientKnownRequestError)return s.code==="P2025"?r.status(400).json({error:"The record no exists"}):s.code==="P2002"?r.status(400).json({error:"Record already exists"}):r.status(400).json({error:s.message});if(s instanceof Ge.ZodError){let{message:t}=(0,Je.fromZodError)(s);return r.status(400).json({error:t})}if(s instanceof Error)return s.message==="invalid token"?r.status(401).json({error:s.message}):r.status(400).json({error:s.message});if(s)return r.status(400).json({error:"An error occurred"});o()};var Ze=require("express");var Xe=require("zod");var le=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let o=await new g(this.showUserPerIdRepository).validAuth(e);return!!await this.showUserPerIdRepository.show(o)}};var qr=Xe.z.string(),N=class{async handle(e,r,o){try{let t=qr.parse(e.query.token);if(!t)return r.status(401).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>");let a=new l,i=new le(a),n=`Bearer ${t}`;return await i.execute(n)===!1?r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>"):r.status(200).send("<h1>Email validado com sucesso</h1>")}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};var Pe=(0,Ze.Router)(),_r=new N;Pe.get("/verify-email",_r.handle);var Qe=f(require("cors")),er=f(require("helmet")),ke=class{constructor(){this.app=(0,Ie.default)(),this._middlewares(),this._router(),this._lastMiddlewares()}_middlewares(){this.app.use(Ie.default.json()),this.app.use((0,Qe.default)()),this.app.use((0,er.default)())}_lastMiddlewares(){this.app.use(We)}_router(){this.app.use(v),this.app.use(U),this.app.use(Re),this.app.use(Se),this.app.use(Ue),this.app.use(Pe)}},rr=new ke;rr.app.listen(3002,()=>{console.log("Servidor rodando na porta 3000 ")});
