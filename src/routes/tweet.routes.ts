import { Router } from 'express';
import TweetController from '../controllers/Tweet.controllers';

export class TweetRoutes {

    router: Router;
    private tweetController: TweetController;

    constructor() {
        this.router = Router();
        this.tweetController = new TweetController();

        this.setRoutes();
    }

    setRoutes = () => {
        this.router.get('/', this.tweetController.getTweets);
        this.router.post('/', this.tweetController.createTweet);
        this.router.delete('/:id', this.tweetController.deleteTweet);
    }
}