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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    defaultSettings: {
        workDuration: Number,
        breakDuration: Number
    }
});

const StudyMethodModel = mongoose.model<StudyMethodInterface>('StudyMethodModel', StudyMethodSchema);
export default StudyMethodModel;