import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { dataRange } from '../../interface/interface';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherTermsService {
  constructor(private token: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getToken()}`,
    });
  }

  private apiUrl = 'http://127.0.0.1:8000/api/TeacherTerms';
  private apiUrlDetails = 'http://127.0.0.1:8000/api/TeacharDetialTerms';
  headers: HttpHeaders;
  http = inject(HttpClient);
  getTechersTerms(dateRange: dataRange) {
    return this.http.post<any>(this.apiUrl + 'Get', dateRange, {
      headers: this.headers,
    });
  }
  addTechersTerms(dateRange: dataRange) {
    return this.http.post<any>(this.apiUrl, dateRange, {
      headers: this.headers,
    });
  }
  deleteTeacherTerm(id: number) {
    return this.http.delete<any>(this.apiUrl + '/' + id, {
      headers: this.headers,
    });
  }
  getTeachersDetailTerms(dateRange: dataRange, id: string|null) {
    return this.http.post<any>(this.apiUrlDetails, {
      start_date: dateRange.start_date,
      end_date: dateRange.end_date,
      teacher_id: id,
    });
  }
}
