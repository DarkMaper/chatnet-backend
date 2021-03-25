import { Request, Response } from 'express';
import User,{ IUserModel } from "../models/User";
import jwt from 'jsonwebtoken';

export default class UserController {

    private userModel: IUserModel;
    private jwt_secret: string;

    constructor() {
        this.userModel = User;
        this.jwt_secret = process.env.JWT_SECRET || 'THISISSUPERSECRET';
    }

    createUser = async (req: Request, res: Response) => {
        const user = req.body;

        try {
            const newUser = new this.userModel(user);

            await newUser.save();
            res.json(newUser);
        } catch (error) {
            res.json({ message: error });
        }
    }

    getUser = async (req: Request, res: Response) => {
        const filter = req.params.name;
        const users = await this.userModel.find({ username: { $regex: filter , $options: "i" }}).select('-_id -password -email');

        res.json(users);
    }

    loginUser = async (req: Request, res: Response) => {

        const loginData = req.body;
        const user = await this.userModel.findOne({ username: loginData.username });

        if(user) {
            if(await user.checkPassword(loginData.password)) {
                const payload = {
                    id: user._id,
                }

                const token = jwt.sign(payload, this.jwt_secret);

                res.json(token);
            } else {
                res.json({ message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            res.json({ message: 'Usuario o contraseña incorrectos' });
        }
    }
}