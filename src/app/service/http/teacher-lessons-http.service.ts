import { HttpHeaders, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../session/auth.service';
import { lessonSet } from '../../interface/interface';

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
  setLessons(lessonTeacher:lessonSet){
    return this.http.post<any>(this.apiUrl,lessonTeacher,{headers: this.headers})
  }
  updateLessons(lessonTeacher:lessonSet, id:number){
    return this.http.put<any>(this.apiUrl+"/"+id,lessonTeacher,{headers: this.headers})
  }
  delateLevel(id:number){
    return this.http.delete<any>(this.apiUrl+"/"+id,{headers: this.headers});
  }
}
