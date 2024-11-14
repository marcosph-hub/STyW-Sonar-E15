import {Types} from 'mongoose'

export interface SubjectInterfaces  {
    _id?:Types.ObjectId;
    name: string;
    type_education: string;
    description:string;
}

/** class Subject */
export class Subject implements SubjectInterfaces{
     
    constructor(
      public name:string,
      public type_education: string,
      public description:string,
      _id?:Types.ObjectId
    ) {}
}