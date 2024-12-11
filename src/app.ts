import express from "express";

import config from "./config";

const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("Hello from TypeScript and Node.js!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
