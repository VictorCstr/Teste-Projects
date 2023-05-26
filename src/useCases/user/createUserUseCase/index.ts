import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

//Repo
const userRepository = new PostgresUserRepository();

//Inicializa o useCase
const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
