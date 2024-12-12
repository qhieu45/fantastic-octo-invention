import { Router } from "express";
import { getUserById, getUsers } from "../../services/userService";

const route = Router();

export default (app: Router): void => {
  app.use("/users", route);

  route.get("/", async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error in / route: ", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  route.get("/:id", async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    try {
      const user = await getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error("Error in /:id route: ", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
};
