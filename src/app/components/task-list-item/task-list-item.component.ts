import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../entities/Task';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  @Input() task: Task;
  @Input() removeButtonTitle: string;
  @Output() removeTask = new EventEmitter<Task>();
  checkboxIfNull: false;

  constructor() { }

  ngOnInit() {
  }

  remove(event) {
    this.removeTask.emit(this.task);
  }

}
