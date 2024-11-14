import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailService } from '../../service/http/teacher-detail.service';

@Component({
  selector: 'app-select-teacher',
  standalone: true,
  imports: [],
  templateUrl: './select-teacher.component.html',
  styleUrl: './select-teacher.component.scss',
})
export class SelectTeacherComponent implements OnInit {
  teacherData:{
    id:number;
    firstName:string;
    lastName:string;
    description:string;
    birthday:string;
    lesson: {
      id:number;
      subject_id:number;
      subject_level_id:number;
      teacher_id:number;
      price:number,
      subject:{
        id:number;
        name:string;
      }
      subject_level:{
        id:number;
        name:string;
      }
    }[];
  }={
    id:0,
    firstName:'',
    lastName:'',
    description:'',
    birthday:'',
    lesson: [{
      id:0,
      subject_id:0,
      subject_level_id:0,
      teacher_id:0,
      price:0,
      subject:{
        id:0,
        name:'',
      },
      subject_level:{
        id:0,
        name:'',
      }
    }]
  }
  constructor(
    private route: ActivatedRoute,
    private teacherDetail: TeacherDetailService
  ) {}
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.teacherDetail.getTeacherDetail(productId).subscribe((data) => {
      this.teacherData=data;
    });
  }
}
