import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/modules/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// root application route
app.use("/api", router);

// test routes
app.get("/", (req: Request, res: Response) => {
  const a = "hello world";

  res.send(a);
});

export default app;
