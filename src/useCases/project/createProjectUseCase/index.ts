import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { CreateProjectUseCase } from "./createProjectUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();
const userRepository = new PostgresUserRepository();

//Inicializa o useCase
const createProjectUseCase = new CreateProjectUseCase(
  projectRepository,
  userRepository
);

export { createProjectUseCase };
