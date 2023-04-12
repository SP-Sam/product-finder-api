import express from "express";
import cors, { CorsOptions } from "cors";

import Logger from "../config/logger";
import router from "./router";

const app = express();

const PORT = process.env.PORT;

const corsOptions: CorsOptions = {
  allowedHeaders: ["*"],
  credentials: true,
  methods: "POST,GET,PUT,PATCH,DELETE,OPTIONS,HEAD",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
