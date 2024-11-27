import mongoose, { Schema, Document} from 'mongoose';

interface StudyMethodInterface extends Document {
    name:string;
    description:string;
    defaultSettings: {
        workDuration:number;
        breakDuration:number;
    };
}


const StudyMethodSchema = new Schema ({
    name:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    defaultSettings: {
        workDuration: { 
            type: Number
        },
        breakDuration: {
            type: Number
        }
    },
})

const StudyMethodModel = mongoose.model<StudyMethodInterface>('StudyMethodModel', StudyMethodSchema);
 
export default StudyMethodModel;