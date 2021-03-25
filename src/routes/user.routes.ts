import { Router } from "express";
import UserController from "../controllers/User.controller";


export class UserRoutes {
    router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();

        this.setRoutes();
    }

    setRoutes = () => {
        this.router.get('/:name', this.userController.getUser);
        this.router.post('/create', this.userController.createUser);
        this.router.post('/login', this.userController.loginUser);
    }
}