import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskDTO} from '../entities/TaskDTO';
import {Task} from '../entities/Task';
import {Project} from '../entities/Project';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  private readonly URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Array<TaskDTO>> {
    return this.httpClient.get<Array<TaskDTO>>(`${this.URL}/tasks`);
  }

  getTasksForProject(project: Project): Observable<Array<TaskDTO>> {
    return this.httpClient.get<Array<TaskDTO>>(`${this.URL}/tasks?projectId=${project.id}`);
  }

  createTask(task: TaskDTO): Observable<TaskDTO> {
    return this.httpClient.post<TaskDTO>(`${this.URL}/tasks`, task);
  }

  deleteTask(task: Task): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.URL}/tasks/${task.id}`);
  }

  changeMarkForTask(task: Task, mark: boolean): Observable<TaskDTO> {
    return this.httpClient.patch<TaskDTO>(`${this.URL}/tasks/${task.id}`, { mark });
  }

  changeTaskTitle(task: Task, title: string): Observable<TaskDTO> {
    return this.httpClient.patch<TaskDTO>(`${this.URL}/tasks/${task.id}`, { title });
  }

  getTasksForProjectById(id: number) {
    return this.httpClient.get<Array<TaskDTO>>(`${this.URL}/tasks?projectId=${id}`);
  }
}
