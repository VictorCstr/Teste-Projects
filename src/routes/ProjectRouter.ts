import express, { Request, Response } from "express";
import { createUserUseCase } from "../useCases/user/createUserUseCase/index";
import { createProjectUseCase } from "../useCases/project/createProjectUseCase/index";

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

routes.post("/project", async (req: Request, res: Response) => {
  try {
    const username = req.headers.username as string;
    const { cost, deadline, title, zipCode } = req.body;
    const user = await createProjectUseCase.execute({
      title,
      username,
      zipCode,
      deadline,
      cost,
    });
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

export default routes;
