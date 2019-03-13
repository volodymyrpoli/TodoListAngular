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

  static last = 10;

  todoList: TodoList;
  static generateId() {
    return this.last++;
  }

  ngOnInit(): void {
    this.todoList = new TodoList();

    const project1 = new Project(1, 'Default');
    project1.addTask(new Task(1, 'Default - First task #1', false));
    project1.addTask(new Task(2, 'Default - Second task #2', false));
    project1.addTask(new Task(3, 'Default - Third task #3 - checked', true));
    this.todoList.addProject(project1);

    const project2 = new Project(2, 'Other');
    project2.addTask(new Task(4, 'Other - First task - #4', false));
    project2.addTask(new Task(5, 'Other - Second task #5', false));
    project2.addTask(new Task(6, 'Other - Third task #6 - checked', true));
    this.todoList.addProject(project2);

  }

  createProject(projectName: string): void {
    this.todoList.addProject(new Project(AppComponent.generateId(), projectName));
  }

  addTask(taskTitle: string): void {
    this.todoList.currentSelected.addTask(new Task(AppComponent.generateId(), taskTitle, false));
  }

  selectProject(project: Project): void {
    if (!this.todoList.select(project)) {
      alert('No one project found');
    }
  }

  removeProject(project: Project): void {
    this.todoList.removeProject(project);
  }

  removeTask(task: Task) {
    this.todoList.currentSelected.removeTask(task);
  }
}
