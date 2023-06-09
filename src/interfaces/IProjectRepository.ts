import { Project } from "../entities/Project";

export interface IProjectRepository {
  create(project: Project): Promise<Project>;
  validZipCode(zipCode): Promise<string>;
  getAll(username: string): Promise<Project[]>;
  getOne(projectId: string): Promise<Project>;
  updateProject(
    projectId: string,
    title: string,
    zipCode: string,
    cost: number,
    deadline: Date
  ): Promise<Project>;
  completeProject(username: string, projectId: string): Promise<Project>;
  delete(projectId: string): Promise<Project>;
  isProjectOwner(username: string, projectId: string): Promise<Boolean>;
}
