import { Component, OnInit, Pipe } from '@angular/core';
import { TodoListObservableService } from '../../../services/todo-list-observable.service';
import { Project } from '../../../entities/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  constructor(private todoList: TodoListObservableService,
              private router: Router) { }

  ngOnInit() {
    this.todoList.loadProjectForPreview();
  }

  openProject(project: Project) {
    this.router.navigate([`projects/${project.id}`]);
  }

  pinnedProject(project: Project) {
    this.todoList.changeProjectPin(project, !project.pinned);
  }
}
