import { PrismaClient } from "@prisma/client";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { Project } from "../entities/Project";
import Axios from "axios";
import { ApiError } from "../errors";

const prisma = new PrismaClient();

export class PostgresProjectRepository implements IProjectRepository {
  constructor() {}

  async create(project: Project): Promise<Project> {
    try {
      let { id, cost, deadline, title, username, zipCode } = project;
      deadline = new Date(deadline);
      cost = parseFloat(cost as any);
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
      console.log(error);
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
      return await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("failed searching a project on postgres");
    }
  }
  async validZipCode(zipCode: any): Promise<string> {
    try {
      const { data } = await Axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );

      return `${data.localidade}/${data.uf}`;
    } catch (error) {
      console.log(error);
      throw new Error("failed searching if zip code is valid");
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
      deadline = new Date(deadline);
      cost = parseFloat(cost as any);
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
      console.log(error);
      throw new Error("failed trying to delete a project on postgres");
    }
  }
}
