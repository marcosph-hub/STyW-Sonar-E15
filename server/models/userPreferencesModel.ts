import { Schema, model, Types } from "mongoose";

interface UserPreferencesInterface extends Document {
    email: string;
    preferedMethod: Types.ObjectId;
    customSettings?: {
        workDuration?: number;
        breakDuration?: number;
    };
}

const UserPreferencesSchema = new Schema<UserPreferencesInterface>({
    email: {
        type: String,
        required: true
    },
    preferedMethod: {
        type: Schema.Types.ObjectId,
        ref: 'StudyMethodModel',
        required: true
    },
    customSettings: {
        workDuration: { type: Number },
        breakDuration: { type: Number }
    }
});

const UserPreferencesModel = model<UserPreferencesInterface>('UserPreferencesModel', UserPreferencesSchema);
export default UserPreferencesModel;