import { Request, Response } from "express";
import { readReservationWithFilters } from "./actions/read.reservation.action";
import { createReservation } from "./actions/create.reservation.action";

interface CustomRequest extends Request {
  userId?: string;
}

export async function GetBookReservationsController(req: Request, res: Response) {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      res.status(400).json({ msg: "The bookId parameter is required." });
    };

    const searchResults = await readReservationWithFilters(req.query);

    if (Array.isArray(searchResults) && searchResults.length === 0) {
      res.status(404).json({
        msg: "No reservations found for the specified bookId.",
      });
    };

    const formattedResults = searchResults.reduce((acc, reservation) => {
      const { title: bookTitle, author: bookAuthor } = reservation.bookId as unknown as {
        title: string;
        author: string;
      };
      const { name: userName, email: userEmail } = reservation.userId as unknown as {
        name: string;
        email: string;
      };

      let book = acc.find((item) => item.bookTitle === bookTitle);

      if (!book) {
        book = { bookTitle, bookAuthor, users: [] };
        acc.push(book);
      };

      book.users.push({
        userName,
        userEmail,
      });

      return acc;
    }, [] as { bookTitle: string; bookAuthor: string; users: { userName: string; userEmail: string }[] }[]);

    res.json(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  };
};

export async function GetUserReservationsController(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ msg: "The userId parameter is required." });
    };

    const searchResults = await readReservationWithFilters(req.query);
    if (Array.isArray(searchResults) && searchResults.length === 0) {
      res.status(404).json({
        msg: "No reservations found for the specified userId.",
      });
    };

    const formattedResults = searchResults.reduce((acc, reservation) => {
      const { name: userName } = reservation.userId as unknown as { name: string };
      const { title: bookTitle, author: bookAuthor } = reservation.bookId as unknown as {
        title: string;
        author: string;
      };

      let user = acc.find((item) => item.userName === userName);

      if (!user) {
        user = { userName, books: [] };
        acc.push(user);
      };

      user.books.push({
        bookTitle,
        bookAuthor,
        reservationDate: reservation.reservationDate,
        deliveryDate: reservation.deliveryDate,
      });

      return acc;
    }, [] as { userName: string; books: { bookTitle: string; bookAuthor: string; reservationDate: Date; deliveryDate: Date }[] }[]);

    res.status(200).json(formattedResults);
  } catch (e) {
    res.status(500).json({
      msg: "Error retrieving reservations",
      error: (e as Error).message,
    });
  };
};

export async function PostReservationController(req: CustomRequest, res: Response) {
  try {
    req.body.reserver = req.userId;
    await createReservation(req.body);

    res.status(200).json({
      msg: "Success",
    });
  } catch (e) {
    res
      .status(500)
      .json({ msg: "Error creating reservation", error: (e as Error).message });
  };
};
