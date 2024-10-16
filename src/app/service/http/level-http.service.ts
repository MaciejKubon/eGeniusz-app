import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelHttpService {

  constructor() { }

  private apiUrl ='http://127.0.0.1:8000/api/subjectLevel';

  http = inject(HttpClient);

  getLevels(){
    return this.http.get<any>(this.apiUrl);
  }
  editLevel(id:number, level:string){
    return this.http.put<any>(this.apiUrl+'/'+id,{'level':level})
  }
  delateLevel(id:number){
    return this.http.delete<any>(this.apiUrl+'/'+id)
  }
  addLevel(name:string){
    return this.http.post<any>(this.apiUrl, {'level': name});
  }
}
