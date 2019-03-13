import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectDTO} from '../entities/ProjectDTO';
import {Observable} from 'rxjs';
import {Project} from '../entities/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsRepositoryService {

  private readonly URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Array<ProjectDTO>> {
    return this.httpClient.get<Array<ProjectDTO>>(`${this.URL}/projects`);
  }

  createProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.httpClient.post<ProjectDTO>(`${this.URL}/projects`, project);
  }

  deleteProject(project: Project): Observable<ProjectDTO> {
    return this.httpClient.delete<ProjectDTO>(`${this.URL}/projects/${project.id}`);
  }

}
