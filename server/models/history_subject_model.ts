import mongoose, { Schema, Document,Types } from 'mongoose';

interface HistorySubjectInterface extends Document {
    IDsubject:Types.ObjectId;
    IDuser:Types.ObjectId;
    date:Date;
    time:Number;
}


const HistorySubjectSchema:Schema = new Schema({
    IDsubject:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Subject'
    },
    Iduser:{
        type:Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    time:{
        type:Number,
        require: true,
    },
    date:{
        type:Date,
        require:true,

    }
})

HistorySubjectSchema.index({date:1,Iduser:1,},{unique:true})

const HistorySubject = mongoose.model<HistorySubjectInterface>('HistorySubject', HistorySubjectSchema);

export default HistorySubject;