import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:4000/api/projects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProject(id: string, project: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.put(`http://localhost:4000/api/projects/${id}`, project, { headers });
  }
  

  addProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project, { headers: this.getAuthHeaders() });
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
