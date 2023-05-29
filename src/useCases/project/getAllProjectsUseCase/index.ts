import { CacheProvider } from "../../../providers/CacheProvider";
import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { GetAllProjectUseCase } from "./getAllProjectsUseCase";

//Provider
const cacheProvider = new CacheProvider();

//Repo
const projectRepository = new PostgresProjectRepository();
const userRepository = new PostgresUserRepository(cacheProvider);

//Inicializa o useCase
const getAllProjectUseCase = new GetAllProjectUseCase(
  projectRepository,
  userRepository
);

export { getAllProjectUseCase };
