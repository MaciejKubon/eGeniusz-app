import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectHttpService {

  constructor() { }

  private apiUrl ='http://127.0.0.1:8000/api/subject';

  http = inject(HttpClient);

  getSubjects(){
    return this.http.get<any>(this.apiUrl);
  }
  editSubject(id:number, subjcet:string){
    return this.http.put<any>(this.apiUrl+'/'+id,{'name':subjcet})
  }
  delateSubject(id:number){
    return this.http.delete<any>(this.apiUrl+'/'+id)
  }
  addSubject(name:string){
    return this.http.post<any>(this.apiUrl, {'name': name});

  }
}
