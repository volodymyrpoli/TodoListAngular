import {Project} from './Project';

export class TodoList {
  projects: Array<Project>;
  currentSelected: Project;

  constructor() {
    this.projects = [];
  }

  public addProject(project: Project): void {
    this.projects.push(project);
    this.currentSelected = project;
  }

  public removeProject(project: Project): void {
    this.projects = this.projects.filter(item => item !== project);
    this.selectOtherProject(project);
  }

  public findProjectById(id: number): Project {
    return this.projects.find(project => project.id === id);
  }

  public select(project: Project): boolean {
    if (this.projects.find(value => value.id === project.id)) {
      this.currentSelected = project;
      return true;
    }
    return false;
  }

  selectOtherProject(project: Project) {
    if (this.currentSelected === project) {
      if (this.projects[0]) {
        this.currentSelected = this.projects[0];
      } else {
        this.currentSelected = null;
      }
    }
  }


}
