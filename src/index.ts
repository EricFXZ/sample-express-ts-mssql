import dotenv from 'dotenv';
import express from 'express';
import salesRouter from './routes/salesRouter';
dotenv.config();

const app: express.Application = express();

const port = process.env.PORT;

app.use('/performance', salesRouter);

app.get('/', (_req, _res) => {
  _res.send('TypeScript With Express');
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
		http://localhost:${port}/`);
});
