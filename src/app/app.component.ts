import {Component, OnInit} from '@angular/core';
import {TodoList} from './entities/TodoList';
import {Project} from './entities/Project';
import {Task} from './entities/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TodoListAngular';

  todoList: TodoList;

  createProject(event: string): void {
    alert(event + 'project');
  }


  addTask(event: string): void {
    alert(event);
  }

  ngOnInit(): void {
    this.todoList = new TodoList();

    const project1 = new Project(1, 'Default');
    project1.addTask(new Task(1, 'First task #1', false));
    project1.addTask(new Task(2, 'Second task #2', false));
    project1.addTask(new Task(3, 'Third task #3 - checked', true));
    this.todoList.addProject(project1);

    const project2 = new Project(2, 'Default');
    project2.addTask(new Task(4, 'First task #4', false));
    project2.addTask(new Task(5, 'Second task #5', false));
    project2.addTask(new Task(6, 'Third task #6 - checked', true));
    this.todoList.addProject(project2);

  }
}
