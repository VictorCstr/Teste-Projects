import { PostgresProjectRepository } from "../../../repositories/PostgresProjectRepository";
import { CompleteProjectUseCase } from "./completeProjectUseCase";

//Repo
const projectRepository = new PostgresProjectRepository();

//Inicializa o useCase
const completeProjectUseCase = new CompleteProjectUseCase(projectRepository);

export { completeProjectUseCase };
