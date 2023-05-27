import { IDeleteProjectDTO } from "./deleteProjectDTO";
import { IProjectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../../../entities/Project";
import { ApiError } from "../../../errors";

export class DeleteProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: IDeleteProjectDTO): Promise<Project> {
    const { projectId, username } = data;

    const existProject = await this.projectRepository.getOne(projectId);

    if (!existProject) throw new ApiError(400, "Projeto não localizado!");

    const owner = await this.projectRepository.isProjectOwner(
      username,
      projectId
    );

    if (owner == false)
      throw new ApiError(400, "A pessoa solicitante não é a dona do Projeto!");

    return await this.projectRepository.delete(projectId);
  }
}
