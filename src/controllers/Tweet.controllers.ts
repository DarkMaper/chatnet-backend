import { Request, Response } from 'express';
import Tweet, { ITweetModel } from '../models/Tweet';


export default class TweetController {

    private tweetModel: ITweetModel;
    constructor() {
        this.tweetModel = Tweet;
    }

    getTweets = async ( req: Request, res: Response ) => {
        const autor = req.query.autor;
        let tweets;
        if(autor) {
            tweets = await this.tweetModel.find({ autor: autor });
        } else {
            tweets = await this.tweetModel.find();
        }
        

        res.json(tweets);
    }

    createTweet = async( req: Request, res: Response) => {
        const { autor, cuerpo } = req.body;

        const newTweet = new this.tweetModel({
            autor,
            cuerpo
        });

        await newTweet.save();

        res.json(newTweet);
    }

    deleteTweet = async( req: Request, res: Response) => {
        const id = req.params.id;

        const deletedTweet = await this.tweetModel.deleteOne({ _id: id });

        res.json(deletedTweet);
    }
}