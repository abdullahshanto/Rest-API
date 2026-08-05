import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'author is required'],
    },
    genre: {
      type: String,
      required: [true, 'genre is required'],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, 'cover image is required'],
    },
    file: {
      type: String,
      required: [true, 'file is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Book', bookSchema);
