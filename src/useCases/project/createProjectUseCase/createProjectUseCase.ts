import { ICreateProjectDTO } from "./createProjectDTO";
import { IProjectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../../../entities/Project";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { ApiError } from "../../../errors";

export class CreateProjectUseCase {
  constructor(
    private projectRepository: IProjectRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateProjectDTO): Promise<Project> {
    const { username, title, deadline, cost, zipCode } = data;

    const existUser = await this.userRepository.existUser(username);

    if (existUser == false) {
      throw new ApiError(400, "O usuario informado não existe");
    }

    const project = new Project({
      deadline,
      title,
      cost,
      zipCode,
      username,
    });

    return await this.projectRepository.create(project);
  }
}
