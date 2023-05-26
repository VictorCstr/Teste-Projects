import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { GetOneProjectUseCase } from "./getOneProjectUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();

//Inicializa o useCase
const getOneProjectUseCase = new GetOneProjectUseCase(projectRepository);

export { getOneProjectUseCase };
