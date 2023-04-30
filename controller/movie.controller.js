import Movie from '../models/movie.model.js';
import createError from '../utils/createError.js';

export const createMovie = async (req, res, next) => {
  const newMovie = new Movie({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
};
export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie.userId !== req.userId)
      return next(createError(403, 'You can delete only your movie!'));

    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).send('Movie has been deleted!');
  } catch (err) {
    next(err);
  }
};
export const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) next(createError(404, 'Movie not found!'));
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};
export const getMovies = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
  };
  try {
    const movies = await Movie.find(filters).sort({ [q.sort]: -1 });
    if (!movies) next(createError(404, 'Movies not found!'));
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }

  // const q = req.query;
  // const filters = {
  //   ...(q.userId && { userId: q.userId }),
  //   ...(q.cat && { cat: q.cat }),
  //   ...((q.min || q.max) && {
  //     price: {
  //       ...(q.min && { $gt: q.min }),
  //       ...(q.max && { $lt: q.max }),
  //     },
  //   }),
  //   ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
  // };
  // try {
  //   const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
  //   res.status(200).send(gigs);
  // } catch (err) {
  //   next(err);
  // }
};
