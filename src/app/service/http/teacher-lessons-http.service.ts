import { HttpHeaders, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherLessonsHttpService {
  constructor(private token: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getToken()}`,
    });
  }
  private apiUrl= 'http://127.0.0.1:8000/api/TeacherLesson';

  headers: HttpHeaders;
  http = inject(HttpClient);
  getLessons(){
    return this.http.get<any>(this.apiUrl,{headers: this.headers});
  }
}
