import express, {Application} from "express";
import morgan from 'morgan';

import { TweetRoutes, UserRoutes } from './routes';

export default class App {

    private app: Application;
    private port: number;

    private tweetRoutes: TweetRoutes;
    private userRoutes: UserRoutes;

    constructor(port: number = 3000) {
        this.app = express();

        this.port = process.env.PORT && parseInt(process.env.PORT) || port;

        this.tweetRoutes = new TweetRoutes();
        this.userRoutes = new UserRoutes();

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes() {
        this.app.use('/tweets', this.tweetRoutes.router);
        this.app.use('/user', this.userRoutes.router);
    }


    listen() {
        this.app.listen(this.port);
        console.log('El servidor está escuchando en el puerto', this.port);
    }
}