import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.js';
import usersRoutes from './modules/users/users.routes.js';
import tasksRoutes from './modules/tasks/tasks.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) =>
  res.json({
    message: 'API funcionando',
    endpoints: {
      health: '/health',
      users: '/api/users',
      tasks: '/api/tasks',
    },
  }),
);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

app.use(errorHandler);

export default app;
