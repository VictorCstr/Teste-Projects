import { ILoginDTO } from "./loginDTO";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { ApiError } from "../../../errors";

export class LoginUseCase {
  constructor(private projectRepository: IUserRepository) {}

  async execute(data: ILoginDTO): Promise<string> {
    const { password, username } = data;

    const existUser = await this.projectRepository.existUser(username);

    if (existUser == false) {
      throw new ApiError(400, "O usuario não existe");
    }

    return await this.projectRepository.login(username, password);
  }
}
