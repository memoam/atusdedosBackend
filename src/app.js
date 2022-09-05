import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import usersRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import calendarRoutes from './routes/calendar.routes';

const app = express();

// vars
app.set('pkg', pkg); // project data

// middleswares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  const { name, version, description, author}= app.get('pkg');
  res.json({
    name,
    version,
    description,
    author,
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/calendar', calendarRoutes);

export default app;
