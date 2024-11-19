import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { newClasses } from '../../interface/interface';
import { AuthService } from '../session/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private token: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.getToken()}`,
    });
  }

  private apiUrl ='http://127.0.0.1:8000/api/Classes';
  private apiUrlGet='http://127.0.0.1:8000/api/StudentClasses'
  http = inject(HttpClient);
  headers: HttpHeaders;


  setLessons(newClasses:newClasses){
    return this.http.post<any>(this.apiUrl,newClasses,{headers: this.headers})
  }
  getDayStudentClasses(date:string){
    return this.http.post<any>(this.apiUrlGet,{"start_date": date},{headers: this.headers});
  }



}
 