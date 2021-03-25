import { Model, Document } from "mongoose";

interface IUserDocument extends Document {
    username: string,
    name: string,
    email: string,
    password: string,
    followers: string,
    follows: string,
}

export interface IUser extends IUserDocument {
    checkPassword(password: string): Promise<boolean>
}

export interface IUserModel extends Model<IUser> { }