import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { CacheProvider } from "../providers/CacheProvider";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors";

const prisma = new PrismaClient();

export class PostgresUserRepository implements IUserRepository {
  constructor(private cache: CacheProvider) {
    this.cache = CacheProvider.getInstance();
  }

  async create(user: User): Promise<User> {
    try {
      const { id, name, password, username } = user;

      const passHash = await bcrypt.hash(password, 10);

      const userCreated = await prisma.user.create({
        data: {
          id,
          name,
          password: passHash,
          username,
        },
      });

      await this.cache.set(username, "username");

      return userCreated;
    } catch (error) {
      throw new Error("failed to save user on postgres");
    }
  }
  async existUser(username: string): Promise<Boolean> {
    try {
      const existInCache = await this.cache.get(username);

      if (existInCache != null) return true;

      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      return user ? true : false;
    } catch (error) {
      console.log(error);
      throw new Error("failed to find user on postgres");
    }
  }
  async login(username: string, password: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new ApiError(400, "Usuário não está cadastrado!");
      }

      if (await !bcrypt.compareSync(password, user.password)) {
        throw new ApiError(401, "Não autorizado!");
      }
      await this.cache.set(username, "username");
      return user.id;
    } catch (error) {
      throw new Error("failed to login on postgres");
    }
  }
}
