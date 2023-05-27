import { Project } from "../entities/Project";

export interface IProjectRepository {
  create(project: Project): Promise<Project>;
  getAll(username: string): Promise<Project[]>;
  getOne(projectId: string): Promise<Project>;
  updateProject(
    username: string,
    title: string,
    zipCode: string,
    deadline: Date
  ): Promise<Project>;
  completeProject(username: string, projectId: string): Promise<Project>;
  delete(username: string, projectId: string): Promise<Project>;
  isProjectOwner(username: string, projectId: string): Promise<Boolean>;
}
