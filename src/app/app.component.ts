import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoListAngular';

  createProject(event: string): void {
    alert(event + 'project');
  }


  addTask(event: string): void {
    alert(event);
  }
}
