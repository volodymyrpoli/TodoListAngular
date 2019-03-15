import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../entities/Project';
import { Task } from 'src/app/entities/Task';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  @Input() tasks: Array<Task>;
  @Output() projectClick = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() {
  }

  openProject(event: MouseEvent) {
    this.projectClick.emit(this.project);
  }
}
