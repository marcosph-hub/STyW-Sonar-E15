import {Types} from 'mongoose'

interface SubjectInterfaces  {
    name: string;
    type_education: string;
    description:string;
}

/** class Subject */
export class Subject implements SubjectInterfaces{
     
    constructor(
      public name:string,
      public type_education: string,
      public description:string
    ) {}
}