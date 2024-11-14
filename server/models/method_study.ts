import mongoose, { Schema, Document} from 'mongoose';

interface MethodStudyInterface extends Document {
    name:string;
    time_study:number;
    time_break:number;
    description:string;
}


const MethodStudySchema = new Schema ({
    name:{
        type:String,
        require:true,
        minlength: [3, 'The minimum length is 3 characters'],
        maxlength: [20, 'The maximum length is 20 characters'],
    },
    time_study:{
        type:Number,
        require:true,
        validate:{
            validator: function(value:number){ return value > 0},
            message: 'Time have to be more 0'
        }
    },
    time_break:{
        type:Number,
        require:true,
        validate:{
            validator: function(value:number){ return value > 0},
            message: 'Time have to be more 0'
        }
    },
    description:{
        type:String,
        require:true,        
    }
})

const MethodStudy = mongoose.model<MethodStudyInterface>('MethodStudy', MethodStudySchema);
 
export default MethodStudy;