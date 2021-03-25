import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./interfaces/user.interfaces";

import bcrypt from 'bcrypt';

const UserSchema: Schema<IUser, IUserModel> = new Schema<IUser, IUserModel>({

    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: { type: Schema.Types.ObjectId, ref: 'User' },
    follows: { type: Schema.Types.ObjectId, ref: 'User' }

}, {
    timestamps: true,
});

UserSchema.pre<IUser>('save', async function(next) {

    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.checkPassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

export default <IUserModel>model<IUser>('User', UserSchema);
export { IUserModel, IUser } from './interfaces/user.interfaces';