import {Component, OnInit} from '@angular/core';
import {TodoListService} from './services/todo-list.service';
import {TodoListObservableService} from './services/todo-list-observable.service';
import {Project} from './entities/Project';
import {Task} from './entities/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentProject: Project;

  constructor(public todoList: TodoListService, public todoListObservable: TodoListObservableService) { }

  ngOnInit(): void {
    this.todoListObservable.load();
    this.todoListObservable.currentProject$
      .subscribe(project => {
        this.currentProject = project;
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
    this.todoListObservable.selectProject(project);
  }

  deleteProject(project: Project) {
    this.todoListObservable.deleteProject(project);
  }
}
