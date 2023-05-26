import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PostgresUserRepository implements IUserRepository {
  constructor() {}

  async create(user: User): Promise<User> {
    try {
      const { id, name, password, username } = user;
      const passHash = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: {
          id,
          name,
          password: passHash,
          username,
        },
      });
    } catch (error) {
      throw new Error("failed to save user on postgres");
    }
  }
  async existUser(username: string): Promise<Boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      return user ? true : false;
    } catch (error) {
      throw new Error("failed to find user on postgres");
    }
  }
}
