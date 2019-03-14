import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { ProjectsRepositoryService } from './projects-repository.service';
import { TasksRepositoryService } from './tasks-repository.service';
import {map, scan} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListObservableService {

  private projectsEvent$: Subject<TodoListEvent>;
  private currentProjectTasksEvent$: Subject<TodoListEvent>;

  public readonly projects$: Subject<Array<Project>>;
  public readonly currentProject$: Subject<Project>;
  public readonly currentProjectTasks$: Subject<Array<Task>>;

  constructor(private projectsRepository: ProjectsRepositoryService,
              private tasksRepository: TasksRepositoryService) {
    this.projects$ = new Subject<Array<Project>>();
    this.currentProject$ = new Subject<Project>();
    this.currentProjectTasks$ = new Subject<Array<Task>>();

    this.projectsEvent$ = new Subject();
    this.currentProjectTasksEvent$ = new Subject();
  }

  load() {
    this.projectsEvent$ = this.createEventer<Project>(this.projects$);
    this.currentProjectTasksEvent$ = this.createEventer<Task>(this.currentProjectTasks$);

    this.projectsRepository.getProjects()
      .pipe(
        map(projectDTOs => projectDTOs.map(Project.createFromDTO))
      ).subscribe(projects => {
        this.projectsEvent$.next(new TodoListEvent(
          'LOAD_ALL_PROJECT',
          projects,
          (acc, payload) => {
            return payload;
          }));
      }
    );
  }

  createEventer<T>(subject: Subject<T[]>): Subject<TodoListEvent> {
    const a =  new Subject<TodoListEvent>();
    a.pipe(
        scan((acc: T[], event: TodoListEvent): T[] => {
          console.log(event.type);
          return event.handler(acc, event.payload);
        }, [])
      ).subscribe(item => {
        subject.next(item);
      });
    return a;
  }

  selectProject(project: Project) {

  }
}

class TodoListEvent {
  type: string;
  payload: any;
  handler: (acc: any[], payload: any) => any;

  constructor(type: string, payload: any, handler: (acc: any[], payload: any) => any) {
    this.type = type;
    this.payload = payload;
    this.handler = handler;
  }
}
