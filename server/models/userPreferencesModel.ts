import { Schema, model, Types } from "mongoose";

interface UserPreferencesInterface extends Document {
    userId: Types.ObjectId;
    methodId: Types.ObjectId;
    customSettings?: {
        workDuration?: number;
        breakDuration?: number;
    };
}

const UserPreferencesSchema = new Schema<UserPreferencesInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    methodId: {
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