import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CloseButtonComponent } from '../../../button/close-button/close-button.component';
import {
  studentClasses,
} from '../../../../interface/interface';
import { DeleteButtonComponent } from '../../../button/delete-button/delete-button.component';
import { ClassesService } from '../../../../service/http/classes.service';

@Component({
  selector: 'app-student-no-confirmed-classes',
  standalone: true,
  imports: [CloseButtonComponent, DeleteButtonComponent],
  templateUrl: './student-no-confirmed-classes.component.html',
  styleUrl: './student-no-confirmed-classes.component.scss',
})
export class StudentNoConfirmedClassesComponent implements OnInit {
  @Output() deleteClasses = new EventEmitter<boolean>();

  @Input() classes: studentClasses = {
    id: 0,
    lesson: {
      id: 0,
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
    term: {
      id: 0,
      teacher: {
        id: 1,
        firstName: '',
        lastName: '',
      },
      start_date: new Date('2024-11-09 11:00:00'),
      end_date: new Date('2024-11-09 11:00:00'),
      diffTime: null,
      posTop: null,
    },
    confirmed: false,
  };
  day: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(private StudentClasses: ClassesService) {}
  ngOnInit() {
    this.day = this.convertDate();
    this.startTime = this.classes.term.start_date.toString().split(' ')[4];
    this.endTime = this.classes.term.end_date.toString().split(' ')[4];
  }

  convertDate(): string {
    let date: Date = this.classes.term.start_date;
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
    this.deleteClasses.emit(false);
  }

  deleteClassesFunction() {
    this.StudentClasses.deleteClasses(this.classes.id).subscribe((data) => {
      console.log(data);

      this.deleteClasses.emit(true);
    });
  }
}
