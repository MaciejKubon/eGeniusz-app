import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { lessonSet, select } from '../../../interface/interface';
import { SubjectHttpService } from '../../../service/http/subject-http.service';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { MatInput } from '@angular/material/input';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { TeacherLessonsHttpService } from '../../../service/http/teacher-lessons-http.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lessons-teacher-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    SaveButtonComponent,
  ],
  templateUrl: './lessons-teacher-form.component.html',
  styleUrl: './lessons-teacher-form.component.scss',
})
export class LessonsTeacherFormComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<boolean>()
  subjectValue = new FormControl('');
  levelValue = new FormControl('');
  priceValue = new FormControl('');
  errorSubjectValueMessage = signal('');
  errorLevelValueMessage = signal('');
  errorPriceValueMessage = signal('');
  subject: select[] = [{ name: '', id: 0 }];
  level: select[] = [{ name: '', id: 0 }];
  constructor(
    private subjcetList: SubjectHttpService,
    private levelList: LevelHttpService,
    private lessonsTecher: TeacherLessonsHttpService
  ) {}
  ngOnInit() {
    this.subjcetList.getSubjects().subscribe((data) => {
      this.subject = data;
    });
    this.levelList.getLevels().subscribe((data) => {
      this.level = data;
    });
  }
  // updateSubjectValueMessage() {
  //   if (this.subjectValue.hasError('required')) {
  //     this.errorSubjectValueMessage.set('You must enter a value');
  //   } else {
  //     this.errorSubjectValueMessage.set('');
  //   }
  // }
  // updateLevelValueMessage() {
  //   if (this.levelValue.hasError('required')) {
  //     this.errorLevelValueMessage.set('You must enter a value');
  //   } else {
  //     this.errorLevelValueMessage.set('');
  //   }
  // }
  // updatePriceValueMessage() {
  //   if (this.priceValue.hasError('required')) {
  //     this.errorPriceValueMessage.set('You must enter a value');
  //   } else if (this.priceValue.hasError('min')) {
  //     this.errorPriceValueMessage.set('Cena musi być wieksza od 0');
  //   } else {
  //     this.errorPriceValueMessage.set('');
  //   }
  // }
  saveLesson() {
    let lessonTeacher: lessonSet = {
      subject_id: this.subjectValue.value,
      subject_level_id: this.levelValue.value,
      price: this.priceValue.value,
    };
    this.lessonsTecher
      .setLessons(lessonTeacher)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error.error);
          return throwError(() => new Error('Error fetching data'));
        })
      )
      .subscribe(()=> {
       this.selectItem(true)
      });
  }
  selectItem(item: boolean) {
    this.selectedItem.emit(item);
  }
}
