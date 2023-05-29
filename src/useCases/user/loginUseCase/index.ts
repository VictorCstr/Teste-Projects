import { CacheProvider } from "../../../providers/CacheProvider";
import { PostgresUserRepository } from "../../../repositories/PostgresUserRepository";
import { LoginUseCase } from "./loginUseCase";

//Provider
const cacheProvider = new CacheProvider();

//Repo
const userRepository = new PostgresUserRepository(cacheProvider);

//Inicializa o useCase
const loginUseCase = new LoginUseCase(userRepository);

export { loginUseCase };
