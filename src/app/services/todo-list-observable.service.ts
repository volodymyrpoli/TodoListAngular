import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
import { ProjectsRepositoryService } from './projects-repository.service';
import { TasksRepositoryService } from './tasks-repository.service';
import {map, scan} from 'rxjs/operators';
import {TodoListEvent} from '../entities/TodoListEvent';

@Injectable({
  providedIn: 'root'
})
export class TodoListObservableService {

  private projectsEventHandler$ = new Subject<TodoListEvent>();
  private currentProjectTasksEventHandler$ = new Subject<TodoListEvent>();

  public readonly projects$ = new Subject<Array<Project>>();
  public readonly currentProject$ = new Subject<Project>();
  public readonly currentProjectTasks$ = new Subject<Array<Task>>();
  public readonly projectsWithUnresolvedTasks = new Subject<Array<Project>>();

  constructor(private projectsRepository: ProjectsRepositoryService,
              private tasksRepository: TasksRepositoryService) {
  }

  loadProjectForSplitView() {
    this.projectsEventHandler$ = this.createEventHandler<Project>(this.projects$);
    this.currentProjectTasksEventHandler$ = this.createEventHandler<Task>(this.currentProjectTasks$);

    this.projectsRepository.getProjects()
      .pipe(map(projectDTOs => projectDTOs.map(Project.createFromDTO)))
      .subscribe(projects => {
        this.projectsEventHandler$.next(new TodoListEvent(
          'LOAD_ALL_PROJECT', projects,
          (acc, payload) => payload));
      });

  }

  loadProjectForPreview() {
    this.projectsRepository.getProjects()
      .pipe(map(projectDTOs => projectDTOs.map(Project.createFromDTO)))
      .subscribe(projects => {
        const list$ = [];
        for (const project of projects) {
          const subject = new Subject();
          list$.push(subject);
          this.tasksRepository.getTasksForProject(project)
            .pipe(
              map(taskDTOs => taskDTOs.map(Task.createFromDTO)),
              map(tasks => tasks.filter(task => !task.mark))
            ).subscribe(tasks => {
            project.tasks = tasks.slice(0, 5);
            subject.complete();
          });
        }
        forkJoin(list$).subscribe({
          complete: () => this.projectsWithUnresolvedTasks.next(projects)
        });
      });
  }

  loadTaskForProject(projectId: number) {
    this.tasksRepository.getTasksForProjectById(projectId)
      .pipe(map(taskDTOs => taskDTOs.map(Task.createFromDTO)))
      .subscribe(tasks => {
        this.currentProjectTasksEventHandler$.next(new TodoListEvent(
          'LOAD_TASKS_FOR_PROJECT', tasks, (acc, payload) => payload)
        );
      });
  }

  selectProjectById(id: number) {
    const ob = this.tasksRepository.getTasksForProjectById(id);
    ob.pipe(map(taskDTOs => taskDTOs.map(Task.createFromDTO)))
      .subscribe(tasks => {
        this.projectsRepository.getProjectById(id)
          .pipe(map(Project.createFromDTO))
          .subscribe(project => {
            this.currentProject$.next(project);
            this.loadTaskForProject(project.id);
          });

        this.currentProjectTasksEventHandler$.next(new TodoListEvent(
          `SELECT_PROJECT [${id}]`,
          tasks,
          (acc, payload) => payload
        ));
      });
    return ob;
  }

  deleteProject(project: Project) {
    this.projectsRepository.deleteProject(project)
      .subscribe(() => {
        this.projectsEventHandler$.next(new TodoListEvent(
          'DELETE_PROJECT',
          project,
          (acc, payload) => acc.filter(item => item !== payload)
        ));
      });
  }

  createProject(name: string) {
    this.projectsRepository.createProject({id: null, name})
      .pipe(map(Project.createFromDTO))
      .subscribe(project => {
       this.projectsEventHandler$.next(new TodoListEvent(
         'CREATE_PROJECT',
         project,
         (acc, payload) => {
           acc.push(payload);
           return acc;
         }
       ));
    });
  }

  createTask(title: string, project: Project) {
    this.applyTaskHandler('CREATE_TASK',
      this.tasksRepository.createTask({id: null, title, mark: false, projectId: project.id}),
      (acc, payload) => {
        acc.push(payload);
        return acc;
      });
  }

  deleteTask(task: Task) {
    this.tasksRepository.deleteTask(task)
      .subscribe(() => {
        this.currentProjectTasksEventHandler$.next(new TodoListEvent(
          'DELETE_TASK',
          task,
          (acc, payload) => acc.filter(item => item !== payload)
        ));
      });
  }

  changeTaskTitle(currentTask: Task, title: string) {
    this.applyTaskHandler('CHANGE_TASK_TITLE',
      this.tasksRepository.changeTaskTitle(currentTask, title),
      (acc, payload) => {
        acc.filter(item => item.id === payload.id)
          .map((item: Task) => item.setTitle(payload.title));
        return acc;
      });
  }

  changeTaskMark(currentTask: Task, mark: boolean) {
    this.applyTaskHandler('CHANGE_TASK_MARK',
      this.tasksRepository.changeMarkForTask(currentTask, mark),
      (acc, payload) => {
        acc.filter(item => item.id === payload.id)
          .map((item: Task) => item.setMark(payload.mark));
        return acc;
      });
  }

  private applyTaskHandler(type: string, ob: Observable<any>, handler: (acc, payload) => any) {
    ob.pipe(map(Task.createFromDTO))
      .subscribe(task => this.currentProjectTasksEventHandler$.next(new TodoListEvent(type, task, handler)));
  }

  private createEventHandler<T>(subject: Subject<T[]>): Subject<TodoListEvent> {
    const observable = new Subject<TodoListEvent>();
    observable.pipe(
      scan((acc: T[], event: TodoListEvent): T[] => {
        console.log(event.type);
        return event.handler(acc, event.payload);
      }, [])
    ).subscribe(item => {
      subject.next(item);
    });
    return observable;
  }
}
