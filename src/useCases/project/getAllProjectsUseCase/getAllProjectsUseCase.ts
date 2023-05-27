import { IGetAllProjectsDTO } from "./getAllProjectsDTO";
import { IProjectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../../../entities/Project";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { ApiError } from "../../../errors";

export class GetAllProjectUseCase {
  constructor(
    private projectRepository: IProjectRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: IGetAllProjectsDTO): Promise<Project[]> {
    const { username } = data;

    const existUser = await this.userRepository.existUser(username);

    if (existUser == false) {
      throw new ApiError(400, "O usuario informado não existe");
    }

    return await this.projectRepository.getAll(username);
  }
}
