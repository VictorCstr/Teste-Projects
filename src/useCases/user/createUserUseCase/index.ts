import { CacheProvider } from "../../../providers/CacheProvider";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

//Provider
const cacheProvider = new CacheProvider();

//Repo
const userRepository = new PostgresUserRepository(cacheProvider);

//Inicializa o useCase
const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
