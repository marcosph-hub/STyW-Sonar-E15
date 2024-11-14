import {Types} from 'mongoose'

export interface MethodStudyInterfaces  {
    name:string;
    time_study:number;
    time_break:number;
    description:string;
    _id?:Types.ObjectId;
}

/** class Subject */
export class MethodStudy implements MethodStudyInterfaces{
     
    constructor(
      public name:string,
      public time_study:number,
      public time_break:number,
      public description:string,
      _id?:Types.ObjectId
    ) {}
}