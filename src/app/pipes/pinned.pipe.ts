import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../entities/Project';

@Pipe({
  name: 'pinned'
})
export class PinnedPipe implements PipeTransform {

  transform(projects: Project[], args?: any): Project[] {
    if (projects && projects.slice) {
      projects.sort((a, b) => {
        return a.pinned === b.pinned ? 0 : (a.pinned ? -1 : 0);
      });
      return projects;
    } else {
      return projects;
    }
  }

}
