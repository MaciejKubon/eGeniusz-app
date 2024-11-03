import { Component } from '@angular/core';
import { TeacherLessonsHttpService } from '../../service/http/teacher-lessons-http.service';
import { teacherFiltr, teacherList } from '../../interface/interface';
import { TeachersListHttpService } from '../../service/http/teachers-list-http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.scss'
})
export class TeachersListComponent {
  teacherList:teacherList[]=[];
  isLoadingResults = true;
  teacherFiltr:teacherFiltr = {
    "subjects_id":[],
    "levels_id":[],
    "minPrice":0,
    "maxPrice":10000
}

  constructor(
    private teachersList:TeachersListHttpService
  ){}
  ngOnInit() {
    this.teachersList.getTechersList(this.teacherFiltr).subscribe((data) => {    
      this.teacherList =data
      this.isLoadingResults = false;
      console.log(this.teacherList);
      
    });
  }

}


