import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginData } from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterHttpService {

  constructor() { }



  private apiUrl ='http://127.0.0.1:8000/api/register';
  http= inject(HttpClient);
  register(credential:loginData){
    return this.http.post<any>(this.apiUrl,credential);
  }
}
