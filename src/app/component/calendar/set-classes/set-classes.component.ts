import { Component, EventEmitter, Input, Output } from '@angular/core';
import { teacherData, term } from '../../../interface/interface';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailService } from '../../../service/http/teacher-detail.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { AcceptButtonComponent } from '../../button/accept-button/accept-button.component';
import { ClassesService } from '../../../service/http/classes.service';

@Component({
  selector: 'app-set-classes',
  standalone: true,
  imports: [
    CloseButtonComponent,
    AcceptButtonComponent,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './set-classes.component.html',
  styleUrl: './set-classes.component.scss',
})
export class SetClassesComponent {
  @Output() setTerm = new EventEmitter<boolean>();
  @Input() term: term = {
    id: 0,
    startTime: new Date('2024-11-09 11:00:00'),
    endTime: new Date('2024-11-09 12:00:00'),
    status: true,
    diffTime: null,
    posTop: null,
    classes: null,
  };
  SubjectId: number = 0;

  teacherData: teacherData = {
    id: 0,
    firstName: '',
    lastName: '',
    description: '',
    birthday: '',
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
  day: string = '';
  startTime: string = '';
  endTime: string = '';
  status: string = '';
  teacherID: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private teacherDetail: TeacherDetailService,
    private newClasses: ClassesService
  ) {}

  ngOnInit() {
    this.teacherID = this.route.snapshot.paramMap.get('id');
    this.teacherDetail.getTeacherDetail(this.teacherID).subscribe((data) => {
      this.teacherData = data;
    });
    this.day = this.convertDate();
    this.startTime = this.term.startTime.toString().split(' ')[4];
    this.endTime = this.term.endTime.toString().split(' ')[4];
    if (this.term.status == true) this.status = 'zarezerwowany';
    else this.status = 'Nie zarezerowan';
  }
  convertDate(): string {
    let day: string = '';
    let month: string = '';
    let year: string = this.term.startTime.getFullYear().toString();
    if (this.term.startTime.getDate() < 10)
      day = '0' + this.term.startTime.getDate().toString();
    else day = this.term.startTime.getDate().toString();
    if (this.term.startTime.getMonth() + 1 < 10)
      month = '0' + (this.term.startTime.getMonth() + 1).toString();
    else month = (this.term.startTime.getMonth() + 1).toString();

    return day + '-' + month + '-' + year;
  }

  close() {
    this.setTerm.emit(false);
  }

  setTermFunction() {
    if (this.SubjectId != 0) {
      this.newClasses
        .setLessons({
          terms_id: this.term.id,
          lesson_id: this.SubjectId,
        })
        .subscribe((data) => {
          console.log(data);
          this.setTerm.emit(false);
        });
    }
  }
}
