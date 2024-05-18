const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'], // Make title a required field with a custom error message.
    trim: true // Automatically trim whitespace.
  },
  subtitle: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  publisher: {
    type: String,
    trim: true
  }
}, {
  collection: 'books',
  timestamps: true // Add createdAt and updatedAt timestamps automatically.
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
