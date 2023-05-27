import { IUpdateProjectDTO } from "./updateProjectDTO";
import { IProjectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../../../entities/Project";
import { ApiError } from "../../../errors";

export class UpdateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: IUpdateProjectDTO): Promise<Project> {
    const { username, deadline, title, zipCode, projectId, cost } = data;

    const existProject = await this.projectRepository.getOne(projectId);

    if (!existProject) throw new ApiError(400, "Projeto não localizado!");

    const owner = await this.projectRepository.isProjectOwner(
      username,
      projectId
    );

    if (owner == false)
      throw new ApiError(400, "A pessoa solicitante não é a dona do Projeto!");

    return await this.projectRepository.updateProject(
      projectId,
      title,
      zipCode,
      cost,
      deadline
    );
  }
}
