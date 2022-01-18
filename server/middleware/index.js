import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())

import getpost from './routes/getpost';
import insertpost from './routes/insertpost';
import gettoken from './routes/gettoken';

app.use(getpost);
app.use(insertpost);
app.use(gettoken);

export default app;