"use strict";var S=Object.create;var m=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var F=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var K=(s,e)=>{for(var r in e)m(s,r,{get:e[r],enumerable:!0})},k=(s,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of _(e))!O.call(s,t)&&t!==r&&m(s,t,{get:()=>e[t],enumerable:!(o=C(e,t))||o.enumerable});return s};var y=(s,e,r)=>(r=s!=null?S(F(s)):{},k(e||!s||!s.__esModule?m(r,"default",{value:s,enumerable:!0}):r,s)),V=s=>k(m({},"__esModule",{value:!0}),s);var q={};K(q,{AuthController:()=>T});module.exports=V(q);var P=y(require("bcrypt")),c=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await P.default.hash(e,10)}async comparePasswords(e){return await P.default.compare(e,this.userPassword)}async updatePassword(e,r,o){if(!await this.comparePasswords(e))throw Error("Invalid password");if(r!==o)throw Error("Password confirmation must be the same as password");let i=await this.encryptedPassword(r);this.props.userPassword=i}};var p=y(require("jsonwebtoken")),E=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!p.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:i}=p.default.verify(r,process.env.TOKEN_SECRET??""),n=await this.showUserPerUserIdRepository?.show(t);if(i!==n?.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return p.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return p.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},I=E;var U=y(require("dayjs")),v=require("uuid"),d=class{constructor(e,r,o){this.showUserPerEmailRepository=e;this.createRefreshTokenRepository=r;this.deleteRefreshTokenRepository=o}async execute({email:e,password:r}){let o=await this.showUserPerEmailRepository.show(e);if(!o)throw Error("User not found");let t=new c({userEmail:o.email,userFullName:o.fullName,userId:o.id,userPassword:o.password_hash}),i=new I;await this.deleteRefreshTokenRepository.delete(o.id);let n=await i.authentication(t,r),f=(0,v.v4)(),R=(0,U.default)().add(7,"day").unix(),g=await this.createRefreshTokenRepository.create({expiresIn:R,id:f,userId:t.userId});return{token:n,refreshToken:g}}};var x=require("@prisma/client"),a=new x.PrismaClient;var h=class{async show(e){return await a.user.findUnique({where:{email:e}})}};var u=class{async create({expiresIn:e,id:r,userId:o}){return await a.refresh_Token.create({data:{expiresIn:e,id:r,userId:o}})}};var l=class{async delete(e){await a.refresh_Token.deleteMany({where:{userId:e}})}};var w=require("zod"),j=w.z.object({email:w.z.string().email(),password:w.z.string()}),T=class{async handle(e,r,o){try{let{email:t,password:i}=j.parse(e.body);if(!t||!i)return r.status(400).json({error:"Missing data"});let n=new h,f=new u,R=new l,N=await new d(n,f,R).execute({email:t,password:i});return r.status(200).json(N)}catch(t){o(t)}}};0&&(module.exports={AuthController});