import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import pkg from '../package.json';

// Routes
import usersRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import calendarRoutes from './routes/calendar.routes';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);
app.set('pkg', pkg); // project data

// Middlewares
app.use(
  cors({
    origin: ['https://atusdedos.vercel.app', 'http://localhost:3000'],
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  const { name, version, description, author } = app.get('pkg');
  res.json({
    name,
    version,
    description,
    author,
  });
});
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);

export default app;
