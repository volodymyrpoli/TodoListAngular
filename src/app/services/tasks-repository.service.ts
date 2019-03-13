import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskDTO} from '../entities/TaskDTO';
import {Task} from '../entities/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  private readonly URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Array<TaskDTO>> {
    return this.httpClient.get<Array<TaskDTO>>(`${this.URL}/tasks`);
  }

  createTask(task: TaskDTO): Observable<TaskDTO> {
    return this.httpClient.post<TaskDTO>(`${this.URL}/tasks`, task);
  }

  deleteTask(task: Task): Observable<TaskDTO> {
    return this.httpClient.delete<TaskDTO>(`${this.URL}/tasks/${task.id}`);
  }

  changeMarkForTask(task: Task, mark: boolean): Observable<TaskDTO> {
    return this.httpClient.patch<TaskDTO>(`${this.URL}/tasks/${task.id}`, { mark });
  }

  changeTaskTitle(task: Task, title: string): Observable<TaskDTO> {
    return this.httpClient.patch<TaskDTO>(`${this.URL}/tasks/${task.id}`, { title });
  }
}
