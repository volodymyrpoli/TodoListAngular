import {Task} from './Task';

export class Project {
  id: number;
  name: string;
  tasks: Array<Task>;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
  }

  public removeTask(task: Task): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }

  public findTaskById(id: number): Task {
    return this.tasks.find(task => task.id === id);
  }
}
