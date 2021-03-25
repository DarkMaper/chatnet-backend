import { model, Schema } from 'mongoose';
import { ITweet, ITweetModel } from './interfaces/tweet.interfaces'

const TweetSchema: Schema<ITweet, ITweetModel> = new Schema<ITweet,ITweetModel>({
    //autor: { type: Types.ObjectId, ref: 'Usuario'}
    autor: { type: String, required: true },
    cuerpo: { type: String, required: true },
    /* favoritos: [{
        autor: { type: String, required: true },
        fecha: { type: Date, default: Date.now() },
    }],
    retweet: [{
        autor: { type: String, required: true },
        fecha: { type: Date, default: Date.now() },
    }] */
},{
    timestamps: true
})

export default <ITweetModel>model<ITweet>("Tweet", TweetSchema);
export { ITweetModel } from './interfaces/tweet.interfaces';