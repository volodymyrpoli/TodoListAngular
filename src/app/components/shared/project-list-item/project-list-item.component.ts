import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../entities/Project';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project: Project;
  @Input() removeButtonTitle: string;
  @Output() remove = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() {
  }

  removeClick(event): void {
    this.remove.emit(this.project);
  }

}
