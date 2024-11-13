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
        min: [0,'Time can no be minous or equal than 0']
    },
    date:{
        type:Date,
        require:true,
        validate:{
            validator: function(value:Date){ const now = new Date(); return value > now},
            message: 'Date must not be before than the actual date'
        }
    }
})

HistorySubjectSchema.index({date:1,Iduser:1,},{unique:true})

const HistorySubject = mongoose.model<HistorySubjectInterface>('HistorySubject', HistorySubjectSchema);

export default HistorySubject;