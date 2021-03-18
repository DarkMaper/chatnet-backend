import 'dotenv/config';
import App from './server';

import './database';

async function bootstrap() {
    const app = new App(3000);

    app.listen();
}
bootstrap();