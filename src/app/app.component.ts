import {Component, OnInit} from '@angular/core';
import {TodoListService} from './services/todo-list.service';
import {TodoListObservableService} from './services/todo-list-observable.service';
import {Project} from './entities/Project';

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

}
