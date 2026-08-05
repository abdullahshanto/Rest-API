import mongos, { mongo } from 'mongoose';
const bookSchema = new mongos.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
  },
  author: {
    type: mongos.Schema.Types.ObjectId,
    required: [true, 'author is required'],
    trim: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  {
    timestamps: true,
  },
});

export default mongos.model('Book', bookSchema);