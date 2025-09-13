import express from 'express';
import cors from 'cors';
import usersRoutes from './users/routes/users.routes';

const app: express.Application = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Welcome!').end());

app.use('/users', usersRoutes);
app.use('/assistances', assistancesRoutes);
app.use('/quotes', quotesRoutes);

export { app };
