import express from "express";
import Logger from "../config/logger";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
