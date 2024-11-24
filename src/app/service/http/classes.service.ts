import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { classesRange, newClasses } from '../../interface/interface';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private token: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getToken()}`,
    });
  }

  private apiUrl = 'http://127.0.0.1:8000/api/Classes';
  private apiUrlGet = 'http://127.0.0.1:8000/api/StudentClasses';
  private apiUrlGetTeacher = 'http://127.0.0.1:8000/api/TeacherClasses';
  private http = inject(HttpClient);
  private headers: HttpHeaders;

  setLessons(newClasses: newClasses) {
    return this.http.post<any>(this.apiUrl, newClasses, {
      headers: this.headers,
    });
  }
  getDayStudentClasses(date: string) {
    return this.http.post<any>(
      this.apiUrlGet,
      { start_date: date },
      { headers: this.headers }
    );
  }
  deleteClasses(id: number) {
    return this.http.delete<any>(this.apiUrlGet + '/' + id, {
      headers: this.headers,
    });
  }
  getClasses(id: number) {
    return this.http.get<any>(this.apiUrl + '/' + id, {
      headers: this.headers,
    });
  }
  confirmClasses(id: number, confirmed: boolean) {
    return this.http.put<any>(
      this.apiUrl + '/' + id,
      { confirmed: confirmed },
      { headers: this.headers }
    );
  }
  getStudnetClasses(range:classesRange) {
    return this.http.post<any>(
      this.apiUrlGet,
      range,
      { headers: this.headers }
    );
  }
  getTeacherClasses(range:classesRange){
    return this.http.post<any>(
      this.apiUrlGetTeacher, range, {headers:this.headers}
    );
  }
}
