import { Router, Request, Response } from "express";
import {
  readBookWithFilters,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";
import { verifyToken } from "../auth/auth.jwt";
import { permissions } from "../middlewares/permissions.middleware";

const bookRoutes = Router();

async function GetBooks(req: Request, res: Response) {
  try {
    const searchResults = await readBookWithFilters(req.params, req.query);

    if (Array.isArray(searchResults) && searchResults.length === 0) {
      res.status(404).json({
        msg: "No books found with the specified criteria.",
      });
    }

    res.status(200).json(searchResults);
  } catch (e) {
    res
      .status(500)
      .json({
        msg: "Error retrieving books",
        error: (e as Error).message,
      });
  };
};

async function PostBook(req: Request, res: Response) {
  try {
    await createBookController(req.body);

    res.status(200).json({
      msg: "Success",
    });
  } catch (e) {
    res
      .status(500)
      .json({
        msg: "Error creating the book",
        error: (e as Error).message,
      });
  };
};

async function PatchBooks(req: Request, res: Response) {
  try {
    const bookId = req.params.bookId;
    await updateBookController(req, res);
  } catch (e) {
    res
      .status(500)
      .json({
        msg: "Error updating the book",
        error: (e as Error).message,
      });
  };
};

async function DeleteBooks(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await deleteBookController(req, res);
  } catch (e) {
    res
      .status(500)
      .json({
        msg: "Error deleting the book",
        error: (e as Error).message,
      });
  }
};

bookRoutes.get("/:bookId?", GetBooks);
bookRoutes.post("/", verifyToken, permissions.canCreateBook, PostBook);
bookRoutes.patch("/:bookId?", verifyToken, permissions.canEditBook, PatchBooks);
bookRoutes.delete("/:id", verifyToken, permissions.canDeleteBook, DeleteBooks);

export default bookRoutes;