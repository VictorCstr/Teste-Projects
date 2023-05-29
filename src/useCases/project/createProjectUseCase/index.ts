import { CacheProvider } from "../../../providers/CacheProvider";
import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { CreateProjectUseCase } from "./createProjectUseCase";

//Provider
const cacheProvider = new CacheProvider();

//Repo
const projectRepository = new PostgresProjectRepository();
const userRepository = new PostgresUserRepository(cacheProvider);

//Inicializa o useCase
const createProjectUseCase = new CreateProjectUseCase(
  projectRepository,
  userRepository
);

export { createProjectUseCase };
