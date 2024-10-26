import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginData } from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor() { }

  private apiUrl ='http://127.0.0.1:8000/api/login';
  http= inject(HttpClient);

  login(credential:loginData){
    return this.http.post<any>(this.apiUrl,credential);
  }

}
