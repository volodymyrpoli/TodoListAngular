import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { Project } from '../entities/Project';
import { ProjectsRepositoryService } from './projects-repository.service';
import { TasksRepositoryService } from './tasks-repository.service';
import { map, scan } from 'rxjs/operators';
import { Task } from '../entities/Task';
import { TodoListEvent } from '../entities/TodoListEvent';

@Injectable({
  providedIn: 'root'
})
export class ProjectPreviewService {

  public readonly projectsWithUnresolvedTasks$ = new Subject<Array<Project>>();
  private projectsEventHandler$: Subject<TodoListEvent>;

  constructor(private projectsRepository: ProjectsRepositoryService,
              private tasksRepository: TasksRepositoryService) {
    this.projectsWithUnresolvedTasks$ = new Subject<Array<Project>>();
  }

  loadProjectForPreview() {
    this.projectsEventHandler$ = this.createEventHandler<Project>(this.projectsWithUnresolvedTasks$);

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
              map(tasks => tasks.filter(task => !task.mark)),
              map(tasks => tasks.slice(0, 5))
            ).subscribe(tasks => {
            project.tasks = tasks;
            subject.complete();
          });
        }
        forkJoin(list$).subscribe({
          complete: () => this.projectsEventHandler$.next(new TodoListEvent(
            'LOAD_UNRESOLVED_TASK_FOR_PROJECT',
            projects,
            (acc, payload) => payload
          ))
        });
      });
  }

  changeProjectPin(project: Project, newPin: boolean) {
    this.projectsRepository.changeProjectPin(project.id, newPin)
      .pipe(map(Project.createFromDTO))
      .subscribe(newProject => {
        this.projectsEventHandler$.next(new TodoListEvent(
          `UPDATE_PROJECT_PIN[${newProject.id}->pinned=${newProject.pinned}]`,
          newProject,
          (acc, payload) => {
            acc.filter(value => value.id === payload.id)
                .map(value => value.pinned = payload.pinned);
            acc.sort((a: Project, b: Project) => {
              if (a.pinned === b.pinned) {
                return a.id === b.id ? 0 : (a.id > b.id ? 1 : -1);
              }
              return (a.pinned ? -1 : 0);
            });
            return acc;
          }
        ));
      });
  }

  public createEventHandler<T>(subject: Subject<T[]>): Subject<TodoListEvent> {
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
