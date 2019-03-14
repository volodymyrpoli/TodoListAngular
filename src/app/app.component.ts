import {Component, OnInit} from '@angular/core';
import {TodoListService} from './services/todo-list.service';
import {TodoListObservableService} from './services/todo-list-observable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public todoList: TodoListService, public todoListObservable: TodoListObservableService) { }

  ngOnInit(): void {
    this.todoListObservable.load();
  }

}
