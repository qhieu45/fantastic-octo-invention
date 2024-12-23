import express from 'express';
import config from './config';
import routes from './api';
import bodyParser from 'body-parser';

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(routes());

app.get('/', (req, res) => {
  res.send('Hello from TypeScript and Node.js!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
