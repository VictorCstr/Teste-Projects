import { IGetOneProjectDTO } from "./getOneProjectDTO";
import { IProjectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../../../entities/Project";

export class GetOneProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: IGetOneProjectDTO): Promise<Project> {
    const { projectId } = data;

    const existProject = await this.projectRepository.getOne(projectId);

    if (!existProject) throw new Error("Projeto não localizado!");

    return existProject;
  }
}
