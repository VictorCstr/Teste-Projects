import express, { Request, Response } from "express";
import { createUserUseCase } from "../useCases/user/createUserUseCase/index";
import { loginUseCase } from "../useCases/user/loginUseCase/index";
import { createProjectUseCase } from "../useCases/project/createProjectUseCase/index";
import { getAllProjectUseCase } from "../useCases/project/getAllProjectsUseCase/index";
import { getOneProjectUseCase } from "../useCases/project/getOneProjectUseCase/index";
import { completeProjectUseCase } from "../useCases/project/completeProjectUseCase/index";
import { deleteProjectUseCase } from "../useCases/project/deleteProjectUseCase/index";
import { updateProjectUseCase } from "../useCases/project/updateProjectUseCase/index";
import { ApiError } from "../errors";
import auth from "../middlewares/auth";

const projectRoutes = express.Router();

projectRoutes.get("/", async (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

projectRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "Estão faltando dados para concluir a chamada");
    }

    const user = await loginUseCase.execute({ username, password });

    if (user != undefined) {
      req.session.user = {
        id: user,
        username: username,
      };
    }

    const projects = await getAllProjectUseCase.execute(username);
    res.render("projects", { projects, username });
  } catch (err) {
    console.log(err);
    return await res.render("home");
    return res.status(400).json({ message: err });
  }
});

projectRoutes.post("/logout", auth, async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
    console.log("Sessão excluida!");
  } catch (err) {
    console.log(err);
    return await res.redirect("/");
    return res.status(400).json({ message: err });
  }
});

projectRoutes.post("/user", async (req: Request, res: Response) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
      throw new ApiError(400, "Estão faltando dados para concluir a chamada");
    }

    const user = await createUserUseCase.execute({ name, username, password });

    const login = await loginUseCase.execute({ username, password });

    if (login) {
      req.session.user = {
        id: user,
        username: username,
      };
    }

    const projects = await getAllProjectUseCase.execute(username);

    return await res.render("projects", { projects, username });
  } catch (err) {
    console.log(err);
    return await res.render("home");
    return res.status(400).json({ message: err });
  }
});

projectRoutes.post("/project", auth, async (req: Request, res: Response) => {
  try {
    let username = req.body.username || req.headers.username;
    const { cost, deadline, title, zipCode } = req.body;

    if (!username || !cost || !deadline || !title || !zipCode)
      throw new ApiError(400, "Estão faltando dados para concluir a chamada");

    const user = await createProjectUseCase.execute({
      title,
      username,
      zipCode,
      deadline,
      cost,
    });

    const projects = await getAllProjectUseCase.execute(username);
    res.render("projects", { projects, username });
    // return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unexpected Error" });
  }
});

projectRoutes.get("/projects", auth, async (req: Request, res: Response) => {
  try {
    const username = req.headers.username as string;

    if (!username)
      throw new ApiError(400, "Estão faltando dados para concluir a chamada");

    const projects = await getAllProjectUseCase.execute({
      username,
    });
    return res.status(201).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

projectRoutes.get("/project/:id", auth, async (req: Request, res: Response) => {
  try {
    let projectId = req.params.id;

    if (!projectId) throw new ApiError(400, "Faltando o id do Projeto");

    const project = await getOneProjectUseCase.execute({
      projectId,
    });

    res.render("oneProject", { project });

    // return res.status(201).json(project);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

// Alterado de put para post para o html form entender
projectRoutes.post(
  "/projects/:id",
  auth,
  async (req: Request, res: Response) => {
    try {
      let projectId = req.params.id;
      const username = req.body.username || (req.headers.username as string);
      const { title, zipCode, deadline, cost } = req.body;

      if (!projectId || !username || !cost || !deadline || !title || !zipCode)
        throw new ApiError(400, "Estão faltando dados para concluir a chamada");

      const project = await updateProjectUseCase.execute({
        projectId,
        username,
        title,
        zipCode,
        deadline,
        cost,
      });

      const projects = await getAllProjectUseCase.execute({ username });
      res.render("projects", { projects, username });

      // return res.status(201).json(project);
    } catch (err) {
      console.log(err);
      res.render("projects");
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

// Alterado de patch para post para o html form entender
projectRoutes.post(
  "/projects/:id/done",
  auth,
  async (req: Request, res: Response) => {
    try {
      let projectId = req.params.id;
      const username = req.body.username || (req.headers.username as string);

      if (!username || !projectId)
        throw new ApiError(400, "Estão faltando dados para concluir a chamada");

      const project = await completeProjectUseCase.execute({
        projectId,
        username,
      });

      const projects = await getAllProjectUseCase.execute({ username });
      res.render("projects", { projects, username });

      // return res.status(201).json(project);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

// Alterado de delete para post para o html form entender
projectRoutes.post(
  "/projects/:id/delete",
  auth,
  async (req: Request, res: Response) => {
    try {
      let projectId = req.params.id;
      const username = (req.headers.username as string) || req.body.username;

      if (!username || !projectId)
        throw new ApiError(400, "Estão faltando dados para concluir a chamada");

      const project = await deleteProjectUseCase.execute({
        projectId,
        username,
      });

      const projects = await getAllProjectUseCase.execute(username);
      res.render("projects", { projects, username });

      // return res.status(201).json(project);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

export default projectRoutes;
