import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { GetAllProjectUseCase } from "./getAllProjectsUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();
const userRepository = new PostgresUserRepository();

//Inicializa o useCase
const getAllProjectUseCase = new GetAllProjectUseCase(
  projectRepository,
  userRepository
);

export { getAllProjectUseCase };
