import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../session/auth.service';
import { userDetail } from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(private token:AuthService) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.getToken()}`
    }); 
  }
  private apiUrlStudent ='http://127.0.0.1:8000/api/studentProfile';
  private apiUrlTeacher = 'http://127.0.0.1:8000/api/teacherProfile';

  headers: HttpHeaders; 
  http = inject(HttpClient);
  getUserDetails(){
    return this.http.get<any>(this.apiUrlStudent,{headers: this.headers});
  }
  setUserDetails(userDetail:userDetail){
    return this.http.put<any>(this.apiUrlStudent, userDetail, {headers:this.headers})
  }
  getTeacherDetails(){
    return this.http.get<any>(this.apiUrlTeacher,{headers: this.headers});
  }
  setTeacherDetails(userDetail:userDetail){
    return this.http.put<any>(this.apiUrlTeacher, userDetail, {headers:this.headers})
  }

}
