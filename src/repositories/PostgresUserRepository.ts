import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";

const prisma = new PrismaClient();

export class PostgresUserRepository implements IUserRepository {
  constructor() {}

  async create(
    name: string,
    username: string,
    password: string
  ): Promise<Partial<User>> {
    try {
      throw new Error("Method not implemented yet");
    } catch (error) {
      console.error({
        action: "save",
        message: "error trying to save transaction on postgres",
        data: error,
      });
      throw new Error("failed to save transaction on postgres");
    }
  }
}
