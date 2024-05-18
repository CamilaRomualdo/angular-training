const express = require("express");
const bookRoute = express.Router();

const Book = require("../models/book");

// CREATE
bookRoute.post("/create-book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ data: book, message: "Book successfully added!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
bookRoute.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ data: books, message: "All books successfully fetched." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ SINGLE
bookRoute.get("/read-book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ data: book, message: "Book successfully fetched." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
bookRoute.put("/update-book/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ data: updatedBook, message: "Book successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
bookRoute.delete("/delete-book/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ALL
bookRoute.post("/delete-books", async (req, res) => {
  try {
    // Ensure that there is a body and it contains 'ids' array
    if (!req.body.ids || !Array.isArray(req.body.ids)) {
      return res.status(400).json({ message: "Invalid or no 'ids' provided" });
    }

    const results = await Book.deleteMany({
      _id: { $in: req.body.ids }
    });

    if (results.deletedCount === 0) {
      return res.status(404).json({ message: "No books found to delete" });
    }

    res.status(200).json({ message: `Successfully deleted ${results.deletedCount} books.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

bookRoute.post('/import', async (req, res) => {
  try {
    const books = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).send('Invalid data format or empty data');
    }

    // Remover o campo _id de cada livro para evitar duplicações
    const booksToInsert = books.map(book => {
      const { _id, ...rest } = book;
      return rest;
    });

    const insertedBooks = await Book.insertMany(booksToInsert);
    res.status(200).send(insertedBooks);
  } catch (error) {
    console.error('Error importing books:', error);
    res.status(500).send('Error importing books: ' + error.message);
  }
})

module.exports = bookRoute;
