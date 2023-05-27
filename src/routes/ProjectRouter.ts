import express, { Request, Response } from "express";
import { createUserUseCase } from "../useCases/user/createUserUseCase/index";
import { createProjectUseCase } from "../useCases/project/createProjectUseCase/index";
import { getAllProjectUseCase } from "../useCases/project/getAllProjectsUseCase/index";
import { getOneProjectUseCase } from "../useCases/project/getOneProjectUseCase/index";
import { completeProjectUseCase } from "../useCases/project/completeProjectUseCase/index";
import { deleteProjectUseCase } from "../useCases/project/deleteProjectUseCase/index";

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

routes.get("/projects", async (req: Request, res: Response) => {
  try {
    const username = req.headers.username as string;

    const projects = await getAllProjectUseCase.execute({
      username,
    });
    return res.status(201).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

routes.get("/project/:id", async (req: Request, res: Response) => {
  try {
    let projectId = req.params.id;

    const project = await getOneProjectUseCase.execute({
      projectId,
    });
    return res.status(201).json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

routes.patch("/projects/:id/done", async (req: Request, res: Response) => {
  try {
    let projectId = req.params.id;
    const username = req.headers.username as string;

    const project = await completeProjectUseCase.execute({
      projectId,
      username,
    });
    return res.status(201).json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

routes.delete("/projects/:id", async (req: Request, res: Response) => {
  try {
    let projectId = req.params.id;
    const username = req.headers.username as string;

    const project = await deleteProjectUseCase.execute({
      projectId,
      username,
    });
    return res.status(201).json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

export default routes;
