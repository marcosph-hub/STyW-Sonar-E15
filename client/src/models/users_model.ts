import {Types} from 'mongoose'

export interface UsersInterfaces{
    _id?:Types.ObjectId;
    user_name:string;
    email:string;
    password:string;
    role:string;
}

/** class user */
export class User implements UsersInterfaces{
     
    constructor(
      public user_name: string,
      public email: string,
      public password: string,
      public role: string,
      public _id?: Types.ObjectId
    ) {}
    /** Regular expresion  verific email */
    validateEmail(): boolean { return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email); }  
}