import express, { Request, Response } from "express";
import { createUserUseCase } from "../useCases/user/createUserUseCase/index";

const routes = express.Router();

routes.post("/user", async (req: Request, res: Response) => {
  try {
    const { username, name, password } = req.body;
    const user = await createUserUseCase.execute({ name, username, password });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

export default routes;
