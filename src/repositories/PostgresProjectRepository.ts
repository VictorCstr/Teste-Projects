import { PrismaClient } from "@prisma/client";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { Project } from "../entities/Project";
import Axios from "axios";

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
      return await prisma.project.findMany({
        where: {
          username,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(
        "failed searching all projects from an user on on postgres"
      );
    }
  }
  async getOne(projectId: string): Promise<Project> {
    try {
      const project = (await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      })) as Project;

      const { data } = await Axios.get(
        `https://viacep.com.br/ws/${project?.zipCode}/json/`
      );

      project.zipCode = `${data.localidade}/${data.uf}`;

      return project as Project;
    } catch (error) {
      console.log(error);
      throw new Error("failed searching a project on postgres");
    }
  }
  async updateProject(
    projectId: string,
    title: string,
    zipCode: string,
    cost: number,
    deadline: Date
  ): Promise<Project> {
    try {
      return await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          title,
          zipCode,
          deadline,
          cost,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("failed to update a project on postgres");
    }
  }
  async completeProject(username: string, projectId: string): Promise<Project> {
    try {
      return await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          done: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("failed to finish a project on postgres");
    }
  }
  async isProjectOwner(username: string, projectId: string): Promise<Boolean> {
    try {
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          username,
        },
      });
      return project ? true : false;
    } catch (error) {
      console.log(error);
      throw new Error(
        "failed searching if a person is the owner of a project on postgres"
      );
    }
  }
  async delete(projectId: string): Promise<Project> {
    try {
      return await prisma.project.delete({
        where: {
          id: projectId,
        },
      });
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
