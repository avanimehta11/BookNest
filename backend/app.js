import express from "express";
import cors from "cors";
import booksRouter from "./routes/booksRoute.js";

export const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log(req.url);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRouter);
