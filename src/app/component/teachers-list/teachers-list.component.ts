import { Component } from '@angular/core';
import { TeacherLessonsHttpService } from '../../service/http/teacher-lessons-http.service';
import { teacherFiltr, teacherList } from '../../interface/interface';
import { TeachersListHttpService } from '../../service/http/teachers-list-http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeacherListFilterComponent } from '../form/teacher-list-filter/teacher-list-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [MatProgressSpinnerModule, TeacherListFilterComponent],
  templateUrl: './teachers-list.component.html',
  styleUrl: './teachers-list.component.scss',
})
export class TeachersListComponent {
  teacherList: teacherList[] = [];
  isLoadingResults = true;
  emptyList = false;
  teacherFiltr: teacherFiltr = {
    subjects_id: [],
    levels_id: [],
    minPrice: 0,
    maxPrice: 300,
  };

  constructor(
    private teachersList: TeachersListHttpService,
    private router: Router  ) {}
  ngOnInit() {
    this.teachersList.getTechersList(this.teacherFiltr).subscribe((data:teacherList[]) => {
      this.teacherList = data;
      data.forEach((e:teacherList) => {
        e.imageLink = this.setAvatar(e.imageLink);
      });
      console.log(this.teacherList);
      
      this.isLoadingResults = false;
    });
  }
  setAvatar(link:string):string{
    link = link.slice(16,link.length);
    link = 'http://localhost:8000'+link;
    console.log(link);
    
    return link;
    
    
  }

  useFilter(filtr: teacherFiltr) {
    this.teacherFiltr = filtr;
    this.isLoadingResults = true;
    this.teachersList.getTechersList(this.teacherFiltr).subscribe((data) => {
      this.teacherList = data;
      data.forEach((e:teacherList) => {
        e.imageLink = this.setAvatar(e.imageLink);
      });
      this.isLoadingResults = false;
    });
  }
  moveToTeacher(id: number) {
    this.router.navigate(['/student/teacher/'+id]);
  }
}
