import mongoose, { Schema, Document } from 'mongoose';

interface SubjectInterface extends Document {
    name: string;
    type_education: string;
    description:string;
}

const SubjectSchema:Schema = new Schema({
    name:{
        type:String,
        required: [true, 'The name of the subject is required.'],
        minlength: [3, 'The minimum length is 3 characters'],
        maxlength: [20, 'The maximum length is 20 characters'],        
    },
    type_education:{
        type:String,
        required: [true, 'The type of education is required.'],
        enum:['School','High School','University']
    },
    description:{
        type:String,
        required: [true, 'Description is required.'],
    }
})

const Subject = mongoose.model<SubjectInterface>('Subject', SubjectSchema);
export default Subject;