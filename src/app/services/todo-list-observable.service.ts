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
    this.projectsEvent$ = this.createEventHandler<Project>(this.projects$);
    this.currentProjectTasksEvent$ = this.createEventHandler<Task>(this.currentProjectTasks$);

    this.projects$.subscribe(projects => {
      this.tasksRepository.getTasksForProject(projects.find(() => true))
        .pipe(map(taskDTOs => taskDTOs.map(Task.createFromDTO)))
        .subscribe(tasks => {
          this.currentProject$.next(projects.find(() => true));
          this.currentProjectTasksEvent$.next(new TodoListEvent(
            'LOAD_TASKS_FOR_PROJECT', tasks, (acc, payload) => payload)
          );
      });
    });

    this.projectsRepository.getProjects()
      .pipe(map(projectDTOs => projectDTOs.map(Project.createFromDTO)))
      .subscribe(projects => {
        this.projectsEvent$.next(new TodoListEvent(
          'LOAD_ALL_PROJECT', projects,
          (acc, payload) => {
            return payload;
          }));
      });

  }

  private createEventHandler<T>(subject: Subject<T[]>): Subject<TodoListEvent> {
    const a = new Subject<TodoListEvent>();
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
    this.tasksRepository.getTasksForProject(project)
      .pipe(map(taskDTOs => taskDTOs.map(Task.createFromDTO)))
      .subscribe(tasks => {
        this.currentProject$.next(project);
        this.currentProjectTasksEvent$.next(new TodoListEvent(
          'SELECT_PROJECT',
          tasks,
          (acc, payload) => payload
        ));
    });
  }

  deleteProject(project: Project) {
    this.projectsRepository.deleteProject(project)
      .subscribe(() => {
        this.projectsEvent$.next(new TodoListEvent(
          'DELETE_PROJECT',
          project,
          (acc, payload) => acc.filter(item => item !== payload)
        ));
      });
  }

  deleteTask(task: Task) {
    this.tasksRepository.deleteTask(task)
      .subscribe(() => {
        this.currentProjectTasksEvent$.next(new TodoListEvent(
          'DELETE_TASK',
          task,
          (acc, payload) => acc.filter(item => item !== payload)
        ));
      });
  }

  createTask(title: string, project: Project) {
    this.tasksRepository.createTask({id: null, title, mark: false, projectId: project.id})
      .pipe(map(Task.createFromDTO))
      .subscribe(task => {
        this.currentProjectTasksEvent$.next(new TodoListEvent(
          'CREATE_TASK',
          task,
          (acc, payload) => {
            acc.push(payload);
            return acc;
          }
        ));
      });
  }

  createProject(name: string) {
    this.projectsRepository.createProject({id: null, name})
      .pipe(map(Project.createFromDTO))
      .subscribe(project => {
       this.projectsEvent$.next(new TodoListEvent(
         'CREATE_PROJECT',
         project,
         (acc, payload) => {
           acc.push(payload);
           return acc;
         }
       ));
    });
  }

  changeTaskTitle(currentTask: Task, title: string) {
    this.tasksRepository.changeTaskTitle(currentTask, title)
      .pipe(map(Task.createFromDTO))
      .subscribe(task => {
        this.currentProjectTasksEvent$.next(new TodoListEvent(
          'CHANGE_TASK_TITLE',
          task,
          (acc, payload) => {
            acc.filter(item => item.id === payload.id)
               .map(item => item.setTitle(payload.title));
            return acc;
          }
        ));
      });
  }

  changeTaskMark(currentTask: Task, mark: boolean) {
    this.tasksRepository.changeMarkForTask(currentTask, mark)
      .pipe(map(Task.createFromDTO))
      .subscribe(task => {
        this.currentProjectTasksEvent$.next(new TodoListEvent(
          'CHANGE_TASK_MARK',
          task,
          (acc, payload) => {
            acc.filter(item => item.id === payload.id)
               .map(item => item.setMark(payload.mark));
            return acc;
          }
        ));
      });
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
