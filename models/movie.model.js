import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    vote_count: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Movie', movieSchema);
