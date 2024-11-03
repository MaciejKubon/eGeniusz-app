import { Component } from '@angular/core';
import { TeacherLessonsHttpService } from '../../service/http/teacher-lessons-http.service';
import { teacherList } from '../../interface/interface';
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

  constructor(
    private teachersList:TeachersListHttpService
  ){}
  ngOnInit() {
    this.teachersList.getTechersList().subscribe((data) => {    
      this.teacherList =data
      this.isLoadingResults = false;
      console.log(this.teacherList);
      
    });
  }

}


