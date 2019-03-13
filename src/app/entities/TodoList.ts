import {Project} from './Project';

export class TodoList {
  projects: Array<Project>;

  constructor() {
    this.projects = [];
  }

  public addProject(project: Project): void {
    this.projects.push(project);
  }

  public removeProject(project: Project): void {
    this.projects = this.projects.filter(item => item !== project);
  }

  public findProjectById(id: number): Project {
    return this.projects.find(project => project.id === id);
  }

}
