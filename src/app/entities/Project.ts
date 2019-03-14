import {Task} from './Task';
import {ProjectDTO} from './ProjectDTO';

export class Project {
  id: number;
  name: string;
  tasks: Array<Task>;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  static createFromDTO(projectDTO: ProjectDTO) {
    return new Project(projectDTO.id, projectDTO.name);
  }
}
