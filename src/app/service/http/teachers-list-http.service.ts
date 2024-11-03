import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersListHttpService {

  constructor() { }
  private apiUrl= 'http://127.0.0.1:8000/api/Teachers';

  http = inject(HttpClient);
  getTechersList(){
    return this.http.get<any>(this.apiUrl);
  }

}
