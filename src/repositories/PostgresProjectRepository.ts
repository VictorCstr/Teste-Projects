import { PrismaClient } from "@prisma/client";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { Project } from "../entities/Project";

const prisma = new PrismaClient();

export class PostgresProjectRepository implements IProjectRepository {
  constructor() {}

  async create(project: Project): Promise<Project> {
    try {
      const { id, cost, deadline, title, username, zipCode } = project;
      return await prisma.project.create({
        data: {
          id,
          title,
          username,
          zipCode,
          deadline,
          cost,
        },
      });
    } catch (error) {
      throw new Error("failed to save a new project on postgres");
    }
  }
  async getAll(username: string): Promise<Project[]> {
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
  async getOne(projectId: string): Promise<Project> {
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
  async updateProject(
    username: string,
    title: string,
    zipCode: string,
    deadline: Date
  ): Promise<Project> {
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
  async completeProject(username: string, projectId: string): Promise<Project> {
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
  async delete(username: string, projectId: string): Promise<Project> {
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
