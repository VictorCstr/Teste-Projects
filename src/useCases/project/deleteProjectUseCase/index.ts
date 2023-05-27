import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { DeleteProjectUseCase } from "./deleteProjectUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();

//Inicializa o useCase
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

export { deleteProjectUseCase };
