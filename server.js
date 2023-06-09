import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import movieRoute from './routes/movie.route.js';
import rootRoute from './routes/root.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './config/corsOptions.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log(error);
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log('backend is running');
});
