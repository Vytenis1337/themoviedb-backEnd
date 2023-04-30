import express from 'express';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
} from '../controller/movie.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/library', verifyToken, createMovie);
router.delete('/:id', verifyToken, deleteMovie);
router.get('/single/:id', getMovie);
router.get('/', getMovies);

export default router;
