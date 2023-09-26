import dotenv from 'dotenv';
import express from 'express';
import database from './config/database';
import salesRouter from './routes/salesRouter';
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

database
  .initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/performance', salesRouter);
app.get('/', (_req, _res) => {
  _res.send('TypeScript With Express');
});

app.listen(port, () => {
  console.log(`Running server : http://localhost:${port}/`);
});
