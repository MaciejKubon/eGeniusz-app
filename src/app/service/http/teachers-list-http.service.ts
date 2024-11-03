import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { teacherFiltr } from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersListHttpService {

  constructor() { }
  private apiUrl= 'http://127.0.0.1:8000/api/Teachers';

  http = inject(HttpClient);
  getTechersList(filtr:teacherFiltr){
    return this.http.post<any>(this.apiUrl, filtr);
  }

}
