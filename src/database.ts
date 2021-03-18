import mongoose from 'mongoose';

const URI: string = process.env.MONGO_URI || 'mongodb://localhost/replaceme';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Se ha conectado a la base de datos'))
.catch(err => console.log('No se ha podido conectar a la base de datos', err))