import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public login(login: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.BASE_URL}/auth`, { username: login, password });
  }
}
