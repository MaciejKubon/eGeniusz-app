import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailService } from '../../service/http/teacher-detail.service';
import { TeacherDetailComponent } from '../calendar/teacher-detail/teacher-detail.component';
import { teacherData } from '../../interface/interface';

@Component({
  selector: 'app-select-teacher',
  standalone: true,
  imports: [TeacherDetailComponent],
  templateUrl: './select-teacher.component.html',
  styleUrl: './select-teacher.component.scss',
})
export class SelectTeacherComponent implements OnInit {
  teacherID: string | null = null;
  teacherData: teacherData = {
    id: 0,
    firstName: '',
    lastName: '',
    description: '',
    birthday: '',
    imgPath:'',
    lesson: [
      {
        id: 0,
        subject_id: 0,
        subject_level_id: 0,
        teacher_id: 0,
        price: 0,
        subject: {
          id: 0,
          name: '',
        },
        subject_level: {
          id: 0,
          name: '',
        },
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private teacherDetail: TeacherDetailService
  ) {}
  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id');
    this.teacherDetail.getTeacherDetail(this.teacherID).subscribe((data:teacherData) => {
      this.teacherData = data;
      data.imgPath = this.setAvatar(data.imgPath);
     
    });
  }
  setAvatar(link:string):string{

    
    link = link.slice(16,link.length);
    link = 'http://localhost:8000/storage/images/'+link;
    console.log(link);
    return link;
    
    
    
  }
}
