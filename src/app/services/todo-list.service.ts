import { Injectable } from '@angular/core';
import {TodoList} from '../entities/TodoList';
import {Project} from '../entities/Project';
import {Task} from '../entities/Task';
import {ProjectsRepositoryService} from './projects-repository.service';
import {TasksRepositoryService} from './tasks-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private readonly todoList: TodoList;

  constructor(private projectsRepository: ProjectsRepositoryService,
              private tasksRepository: TasksRepositoryService) {
    this.todoList = new TodoList();

    projectsRepository.getProjects().subscribe(projectDTOs => {
        this.tasksRepository.getTasks().subscribe(taskDTOs => {
          for (const projectDTO of projectDTOs) {
            const newProject = Project.createFromDTO(projectDTO);
            for (const taskDTO of taskDTOs) {
              if (taskDTO.projectId === newProject.id) {
                newProject.tasks.push(Task.createFromDTO(taskDTO));
              }
            }
            this.todoList.projects.push(newProject);
          }
          if (this.todoList.projects[0]) {
            this.todoList.currentSelected = this.todoList.projects[0];
          }
        });
      });
  }

  createProject(projectName: string): void {
    this.projectsRepository.createProject({ id: null, name: projectName })
      .subscribe(projectDTO => {
        this.todoList.addProject(Project.createFromDTO(projectDTO));
      });
  }

  addTask(taskTitle: string): void {
    this.tasksRepository.createTask({ id: null, title: taskTitle, mark: false, projectId: this.getSelected().id })
      .subscribe(taskDTO => {
        this.todoList.currentSelected.addTask(Task.createFromDTO(taskDTO));
      });
  }

  selectProject(project: Project): void {
    if (!this.todoList.select(project)) {
      alert('No one project found');
    }
  }

  removeProject(project: Project): void {
    this.projectsRepository.deleteProject(project)
      .subscribe(() => {
        this.todoList.removeProject(project);
      });
  }

  removeTask(task: Task) {
    this.tasksRepository.deleteTask(task)
      .subscribe(() => {
        this.todoList.currentSelected.removeTask(task);
      });
  }

  getProjects(): Array<Project> {
    return this.todoList.projects;
  }

  getSelected(): Project {
    return this.todoList.currentSelected;
  }

  isAnySelected(): boolean {
    return !!this.todoList.currentSelected;
  }

  changeTaskMark(task: Task, mark: boolean) {
    this.tasksRepository.changeMarkForTask(task, mark)
      .subscribe(taskDTO => {
        task.setMark(taskDTO.mark);
      });
  }

  changeTaskTitle(task: Task, title: string) {
    this.tasksRepository.changeTaskTitle(task, title)
      .subscribe(taskDTO => {
        task.setTitle(taskDTO.title);
      });
  }
}
