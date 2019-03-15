import { Component, OnInit } from '@angular/core';
import { Project } from '../../../entities/Project';
import { TodoListObservableService } from '../../../services/todo-list-observable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../entities/Task';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.css']
})
export class SplitViewComponent implements OnInit {

  currentProject: Project;

  constructor(private todoListObservable: TodoListObservableService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.todoListObservable.loadProjectForSplitView();
    this.todoListObservable.currentProject$
      .subscribe(project => this.currentProject = project);
    this.activatedRouter.params
      .pipe(pluck('projectId'))
      .subscribe((value: number) => {
        if (value) {
          localStorage.setItem('lastLoadProjectId', `${value}`);
          this.todoListObservable.selectProjectById(value)
            .subscribe({
              error: () => this.router.navigate(['projects/']).catch(console.log)
            });
        } else if (localStorage.getItem('lastLoadProjectId')) {
          this.todoListObservable.selectProjectById(+localStorage.getItem('lastLoadProjectId'));
        }
      });
  }

  addTask(title: string) {
    this.todoListObservable.createTask(title, this.currentProject);
  }

  addProject(name: string) {
    this.todoListObservable.createProject(name);
  }

  changeTaskTitle(task: Task, title: string) {
    this.todoListObservable.changeTaskTitle(task, title);
  }

  changeTaskMark(task: Task, mark: boolean) {
    this.todoListObservable.changeTaskMark(task, mark);
  }

  deleteTask(task: Task) {
    this.todoListObservable.deleteTask(task);
  }

  selectProject(project: Project) {
    this.router.navigate([`projects/${project.id}`]);
  }

  deleteProject(project: Project) {
    this.todoListObservable.deleteProject(project, this.currentProject);
  }
}
