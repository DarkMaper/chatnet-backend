import { Document, Model } from "mongoose";

interface ITweetDocuemnt extends Document {
    author: string;
    cuerpo: string;
    /* favoritos: [{
        autor: string,
        fecha: Date,
    }];
    retweets: [{
        autor: string,
        fecha: Date,
    }];
    respuestas: [string];
    respuesta_de: string */
}

export interface ITweet extends ITweetDocuemnt {}

export interface ITweetModel extends Model<ITweet> {}