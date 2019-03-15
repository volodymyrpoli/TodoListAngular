import { Component, OnInit } from '@angular/core';
import { Project } from '../../../entities/Project';
import { Router } from '@angular/router';
import { ProjectPreviewService } from '../../../services/project-preview.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  constructor(private previewService: ProjectPreviewService,
              private router: Router) { }

  ngOnInit() {
    this.previewService.loadProjectForPreview();
  }

  openProject(project: Project) {
    this.router.navigate([`projects/${project.id}`]);
  }

  pinnedProject(project: Project) {
    this.previewService.changeProjectPin(project, !project.pinned);
  }
}
