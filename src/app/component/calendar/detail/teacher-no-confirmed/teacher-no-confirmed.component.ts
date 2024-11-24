import { Component, EventEmitter, Input, Output } from '@angular/core';
import { classesDetal, studentClasses } from '../../../../interface/interface';
import { CloseButtonComponent } from '../../../button/close-button/close-button.component';
import { ClassesService } from '../../../../service/http/classes.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AcceptButtonComponent } from '../../../button/accept-button/accept-button.component';
import { DeleteButtonComponent } from '../../../button/delete-button/delete-button.component';

@Component({
  selector: 'app-teacher-no-confirmed',
  standalone: true,
  imports: [CloseButtonComponent, MatProgressSpinnerModule, AcceptButtonComponent, DeleteButtonComponent],
  templateUrl: './teacher-no-confirmed.component.html',
  styleUrl: './teacher-no-confirmed.component.scss'
})
export class TeacherNoConfirmedComponent {
  @Output() DetailClasses = new EventEmitter<boolean>();

  @Input() classesID: number = 0;
  isLoadingResults: boolean = true;
  classesDetail: classesDetal = { 
    id: 0,
    confirmed: false,
    terms: {
      id: 0,
      teacher_id: 0,
      start_date: new Date('2024-11-20 11:00:00'),
      end_date: new Date('2024-11-20 11:45:00'),
    },
    lesson: {
      id: 0,
      subject: {
        id: 0,
        name: '',
      },
      subject_level: {
        id: 0,
        name: '',
      },
      price: 0,
    },
    student: {
      id: 0,
      firstName: '',
      lastName: '',
    },
  };

  day: string = '';
  startTime: string = '';
  endTime: string = '';
  constructor(private classesDetails: ClassesService) {}
  ngOnInit() {
    this.classesDetails.getClasses(this.classesID).subscribe((data:classesDetal) => {
      this.classesDetail = {
        id: data.id,
        confirmed: data.confirmed,
        terms: {
          id: data.terms.id,
          teacher_id: data.terms.teacher_id,
          start_date: new Date(data.terms.start_date),
          end_date: new Date(data.terms.end_date),
        },
        lesson: {
          id: data.lesson.id,
          subject: {
            id: data.lesson.subject.id,
            name: data.lesson.subject.name,
          },
          subject_level: {
            id: data.lesson.subject_level.id,
            name: data.lesson.subject_level.name,
          },
          price: data.lesson.price,
        },
        student: {
          id: data.student.id,
          firstName: data.student.firstName,
          lastName: data.student.lastName,
        },
      };
      this.isLoadingResults=false;
      this.day = this.convertDate();
      this.startTime =this.classesDetail.terms.start_date.toString().split(' ')[4];
      this.endTime = this.classesDetail.terms.end_date.toString().split(' ')[4];
    });
  }

  convertDate(): string {
    let date: Date = this.classesDetail.terms.start_date
    let day: string = '';
    let month: string = '';
    let year: string = date.getFullYear().toString();
    if (date.getDate() < 10) day = '0' + date.getDate().toString();
    else day = date.getDate().toString();
    if (date.getMonth() + 1 < 10)
      month = '0' + (date.getMonth() + 1).toString();
    else month = (date.getMonth() + 1).toString();

    return day + '-' + month + '-' + year;
  }

  close() {
    this.DetailClasses.emit(false);
  }
  deleteClasses(){
    this.classesDetails.deleteClasses(this.classesDetail.id).subscribe((data)=>{
      console.log(data);
      this.DetailClasses.emit(true);

    })
  }
  confirmedClasses(){
    this.classesDetails.confirmClasses(this.classesDetail.id,true).subscribe((data)=>{
      console.log(data);
      this.DetailClasses.emit(true);

    })
  }
}
