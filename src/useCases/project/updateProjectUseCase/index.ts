import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { UpdateProjectUseCase } from "./updateProjectUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();

//Inicializa o useCase
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);

export { updateProjectUseCase };
