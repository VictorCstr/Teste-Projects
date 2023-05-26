import { ICreateUserDTO } from "./createUserDTO";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { User } from "../../../entities/User";
import { ApiError } from "../../../errors";

export class CreateUserUseCase {
  constructor(private projectRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const { name, password, username } = data;

    const existUser = await this.projectRepository.existUser(username);

    if (existUser == true) {
      throw new ApiError(400, "O usuario já existe");
    }

    const newUser = new User({
      name,
      password,
      username,
    });

    return await this.projectRepository.create(newUser);
  }
}
