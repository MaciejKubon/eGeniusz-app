import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherDetailService {
  constructor() {}

  private apiUrl = 'http://127.0.0.1:8000/api/TeacherDetail';
  http = inject(HttpClient);

  getTeacherDetail(id:any) {
    return this.http.post<any>(this.apiUrl, { teacherID: id });
  }
}
