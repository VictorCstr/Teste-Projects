import { User } from "../entities/User";

export interface IUserRepository {
  create(
    name: string,
    username: string,
    password: string
  ): Promise<Partial<User>>;
}
