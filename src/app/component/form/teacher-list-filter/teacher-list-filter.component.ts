import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { select, teacherFiltr } from '../../../interface/interface';
import { SubjectHttpService } from '../../../service/http/subject-http.service';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-teacher-list-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    SaveButtonComponent,
    MatSliderModule,
  ],
  templateUrl: './teacher-list-filter.component.html',
  styleUrl: './teacher-list-filter.component.scss',
})
export class TeacherListFilterComponent {
  @Output() filter = new EventEmitter<teacherFiltr>();
  subjectValue = new FormControl('');
  levelValue = new FormControl('');
  priceValue = new FormControl('');

  subject: select[] = [{ name: '', id: 0 }];
  level: select[] = [{ name: '', id: 0 }];
  teacherFiltr: teacherFiltr = {
    subjects_id: [],
    levels_id: [],
    minPrice: 0,
    maxPrice: 300,
  };

  disabled = false;
  max = 300;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  value2 = 300;

  constructor(
    private subjcetList: SubjectHttpService,
    private levelList: LevelHttpService
  ) {}
  ngOnInit() {
    this.subjcetList.getSubjects().subscribe((data) => {
      this.subject = data;
    });
    this.levelList.getLevels().subscribe((data) => {
      this.level = data;
    });
  }

  sendFilter() {
    if (this.subjectValue.value != '') {
      let sublist = this.subjectValue.value?.toString();
      this.teacherFiltr.subjects_id.pop();
      this.teacherFiltr.subjects_id = sublist!.split(',');
    } else {
      this.teacherFiltr.subjects_id = [];
    }
    if (this.levelValue.value != '') {
      let levellist = this.levelValue.value?.toString();
      this.teacherFiltr.levels_id?.pop();
      this.teacherFiltr.levels_id = levellist!.split(',');
    } else {
      this.teacherFiltr.levels_id = [];
    }
    this.teacherFiltr.minPrice = this.value;
    this.teacherFiltr.maxPrice = this.value2;

    this.filter.emit(this.teacherFiltr);
  }
}
