import { Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/", (req, res) => {
    res.send("Getting users");
  });
};
