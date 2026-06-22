import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import errorHandler from "./middleware/error.middleware.js";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./docs/swagger.js";

const app = express();

app.use(helmet());

app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Query Master API Running",
  });
});

app.use(
  "/api/docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

app.use("/api", routes);

app.use(errorHandler);

export default app;
