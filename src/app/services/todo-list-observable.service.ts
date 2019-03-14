import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { ProjectsRepositoryService } from './projects-repository.service';
import { TasksRepositoryService } from './tasks-repository.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListObservableService {

  public readonly projects$: Subject<Array<Project>>;
  public readonly currentProject$: Subject<Project>;
  public readonly currentProjectTasks$: Subject<Array<Task>>;

  constructor(private projectsRepository: ProjectsRepositoryService,
              private tasksRepository: TasksRepositoryService) {
    this.projects$ = new Subject<Array<Project>>();
    this.currentProject$ = new Subject<Project>();
    this.currentProjectTasks$ = new Subject<Array<Task>>();
  }

  load() {
    this.currentProject$.subscribe(project => {
      this.tasksRepository.getTasksForProject(project)
        .pipe(
          map(taskDTOs => taskDTOs.map(Task.createFromDTO))
        ).subscribe(tasks => this.currentProjectTasks$.next(tasks));
    });

    this.projectsRepository.getProjects()
      .pipe(
        map(projectDTO => projectDTO.map(Project.createFromDTO))
      ).subscribe(project => {
          this.projects$.next(project);
          this.currentProject$.next(project[0]);
        }
      );
  }

  selectProject(project: Project) {
    this.tasksRepository.getTasksForProject(project)
      .pipe(
        map(taskDTOs => taskDTOs.map(Task.createFromDTO))
      ).subscribe(tasks => {
        this.currentProject$.next(project);
        this.currentProjectTasks$.next(tasks);
      }
    );
  }

  // removeProject(project: Project) {
    // this.projectsRepository.deleteProject(project)
    //   .pipe(
    //     map(Project.createFromDTO)
    //   ).subscribe(project => {
    // });
  // }

}
