import { Types } from 'mongoose';

export interface UserPreferencesInterface {
    userId: Types.ObjectId;
    methodId: Types.ObjectId;
    workDuration?: number;
    breakDuration?: number;
    createdAt: Date;
}

export class UserPreferences implements UserPreferencesInterface {
    constructor(
        public userId: Types.ObjectId,
        public methodId: Types.ObjectId,
        public workDuration?: number,
        public breakDuration?: number,
        public createdAt: Date = new Date()
    ) {}
}
