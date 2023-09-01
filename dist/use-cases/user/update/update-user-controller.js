"use strict";var x=Object.create;var u=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var j=(e,s)=>{for(var r in s)u(e,r,{get:s[r],enumerable:!0})},g=(e,s,r,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let t of C(s))!v.call(e,t)&&t!==r&&u(e,t,{get:()=>s[t],enumerable:!(o=q(s,t))||o.enumerable});return e};var M=(e,s,r)=>(r=e!=null?x(b(e)):{},g(s||!e||!e.__esModule?u(r,"default",{value:e,enumerable:!0}):r,e)),V=e=>g(u({},"__esModule",{value:!0}),e);var B={};j(B,{UpdateUserController:()=>P});module.exports=V(B);var n=require("zod");var U=M(require("bcrypt")),m=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(s){this.props.userPassword=s}set updateUserFullName(s){this.props.userFullName=s}set updateUserEmail(s){this.props.userEmail=s}constructor(s){this.props=s}async encryptedPassword(s){return await U.default.hash(s,10)}async comparePasswords(s){return await U.default.compare(s,this.userPassword)}async updatePassword(s,r,o){if(!await this.comparePasswords(s))throw Error("Invalid password");if(r!==o)throw Error("Password confirmation must be the same as password");let i=await this.encryptedPassword(r);this.props.userPassword=i}};var w=class{constructor(s,r){this.showUserPerUserIdRepository=s;this.updateUserRepository=r}async handle({userId:s,email:r,fullName:o,oldPassword:t,newPassword:i,newPasswordConfirmation:d}){let p=await this.showUserPerUserIdRepository.show(s);if(!p)throw Error("User not found");let a=new m({userId:p.id,userEmail:p.email,userFullName:p.fullName,userPassword:p.password_hash});return o&&(a.updateUserFullName=o),i&&t&&d&&await a.updatePassword(t,i,d),r&&(a.updateUserEmail=r),await this.updateUserRepository.update({userId:a.userId,email:a.userEmail,fullName:a.userFullName,newPassword:a.userPassword})}};var y=require("@prisma/client"),l=new y.PrismaClient;var c=class{async show(s){return await l.user.findUnique({where:{id:s}})}};var h=class{async update({email:s,fullName:r,newPassword:o,userId:t}){return await l.user.update({where:{id:t},data:{email:s,fullName:r,password_hash:o}})}};var _=n.z.object({email:n.z.string().email().optional(),oldPassword:n.z.string().optional(),newPassword:n.z.string().optional(),newPasswordConfirmation:n.z.string().optional(),fullName:n.z.string().optional()}),z=n.z.object({userId:n.z.string()}),P=class{async handle(s,r,o){try{let{email:t,newPassword:i,newPasswordConfirmation:d,oldPassword:p,fullName:a}=_.parse(s.body),{userId:f}=z.parse(s.params);if(i){if(!d)throw Error("newPasswordConfirmation is required to update password");if(!p)throw Error("oldPassword is required to update password")}if(!t&&!i&&!d&&!p&&!a)throw Error("Missing data");let R=new c,I=new h,N=new w(R,I),{email:E,fullName:F,id:S}=await N.handle({userId:f,email:t,fullName:a,newPassword:i,newPasswordConfirmation:d,oldPassword:p});return r.status(200).json({user:{email:E,fullName:F,id:S}})}catch(t){o(t)}}};0&&(module.exports={UpdateUserController});