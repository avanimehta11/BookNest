import express from "express";
import { Book } from "../models/bookModel.js";

export const router = express.Router();
export default router;

//Route for saving a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author and publish year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send({
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route for getting all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send({
      count: books.length,
      books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message,
    });
  }
});

//Route for getting a book
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message,
    });
  }
});

//Route for updating a book details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author and publish year",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(400).send({
        message: "Book not found",
      });
    }
    res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

//Route for Deleting a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({
        message: "Book not found",
      });
    }
    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});
