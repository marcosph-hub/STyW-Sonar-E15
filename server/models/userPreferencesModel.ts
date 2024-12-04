import { Schema, model, Types } from "mongoose";

interface UserPreferencesInterface extends Document {
    userId: Types.ObjectId;
    methodId: Types.ObjectId;
    workDuration: number;
    breakDuration: number;
    createdAt: Date;
    updatedAt: Date;
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
    workDuration: { type: Number },
    breakDuration: { type: Number }
}, {
    timestamps: true
});

const UserPreferencesModel = model<UserPreferencesInterface>('UserPreferencesModel', UserPreferencesSchema);
export default UserPreferencesModel;