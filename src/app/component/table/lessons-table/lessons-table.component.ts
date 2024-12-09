import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { lessonSet, select, teacherLesson } from '../../../interface/interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeacherLessonsHttpService } from '../../../service/http/teacher-lessons-http.service';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { LessonsTeacherFormComponent } from '../../form/lessons-teacher-form/lessons-teacher-form.component';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { SubjectHttpService } from '../../../service/http/subject-http.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CloseButtonComponent,
    AddButtonComponent,
    LessonsTeacherFormComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    SaveButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormFieldModule,MatSelectModule
  ],
  templateUrl: './lessons-table.component.html',
  styleUrl: './lessons-table.component.scss',
})
export class LessonsTableComponent {
  isLoadingResults = true;
  visableForm: boolean = false;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena', 'action'];
  activeForm: number | null = null;
  dataLessons: MatTableDataSource<teacherLesson>;
  subject: select[] = [{ name: '', id: 0 }];
  level: select[] = [{ name: '', id: 0 }];
  priceValue = new FormControl('');
  subjectValue = new FormControl('');
  levelValue = new FormControl('');
  constructor(
    private httpSubject: TeacherLessonsHttpService,
    private subjcetList: SubjectHttpService,
    private levelList: LevelHttpService
  ) {
    this.dataLessons = new MatTableDataSource([
      {
        id: 0,
        teacher_id: 0,
        subject_id: 0,
        subject_level_id: 0,
        subject: { id: 0, name: 'string' },
        subject_level: { id: 0, name: 'string' },
        price: 0,
      },
    ]);
    this.subjcetList.getSubjects().subscribe((data) => {
      this.subject = data;
    });
    this.levelList.getLevels().subscribe((data) => {
      this.level = data;
    });
  }

  ngOnInit() {
    this.httpSubject.getLessons().subscribe((data) => {
      this.dataLessons = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }
  handleSelectedItem(item: boolean) {
    this.isLoadingResults = true;
    this.httpSubject.getLessons().subscribe((data) => {
      this.dataLessons = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }

  toggleForm() {
    this.visableForm = !this.visableForm;
  }
  closeElement() {
    this.activeForm = null;
    this.priceValue = new FormControl('');
    this.subjectValue = new FormControl('');
    this.levelValue = new FormControl('');
    // this.myForm.value.level = '';
  }
  editElement(id: number) {
    this.activeForm = id;
  }
  removeElement(id: number) {
    this.isLoadingResults = true;
    this.httpSubject.delateLevel(id).subscribe(() => {
      this.httpSubject.getLessons().subscribe((data) => {
        this.dataLessons = new MatTableDataSource(data);
        this.closeElement();
        this.isLoadingResults = false;
      });
    });
  }
  saveElement(id: number) {
    let lessonTeacher: lessonSet = {
      subject_id: this.subjectValue.value,
      subject_level_id: this.levelValue.value,
      price: this.priceValue.value,
    };
      this.isLoadingResults = true;
      this.httpSubject.updateLessons(lessonTeacher , id).subscribe(() => {
        this.httpSubject.getLessons().subscribe((data) => {
          this.dataLessons = new MatTableDataSource(data);
          this.closeElement();
          this.isLoadingResults = false;
        });
      });
  }
}
