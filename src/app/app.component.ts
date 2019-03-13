import {Component} from '@angular/core';
import {TodoListService} from './services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public todoList: TodoListService) { }

}
