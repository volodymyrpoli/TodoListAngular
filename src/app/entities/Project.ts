import {Task} from './Task';
import {ProjectDTO} from './ProjectDTO';

export class Project {
  id: number;
  name: string;
  pinned: boolean;
  tasks: Array<Task>;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  static createFromDTO(projectDTO: ProjectDTO) {
    const project = new Project(projectDTO.id, projectDTO.name);
    project.pinned = projectDTO.pinned;
    return project;
  }
}
