import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { dataRange } from '../../../interface/interface';

@Component({
  selector: 'app-add-term',
  standalone: true,
  imports: [
    CloseButtonComponent,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    SaveButtonComponent,
  ],
  templateUrl: './add-term.component.html',
  styleUrl: './add-term.component.scss',
})
export class AddTermComponent {
  @Output() newTerm = new EventEmitter<boolean>();
  @Input() times: string = '';

  time = this.times.split(' ')[1];
  dayName: string = '';
  readonly start_time = new FormControl('');
  readonly end_time = new FormControl('');

  constructor(private httpTerms: TeacherTermsService) {}

  closeForm() {
    this.newTerm.emit(false);
    console.log(this.start_time.value);
    console.log(this.end_time.value);
  }
  saveForm() {
    this.dayName = this.times.split(' ')[0];
    let startDate: string = this.dayName + ' ' + this.start_time.value + ':00';
    let endDate: string = this.dayName + ' ' + this.end_time.value + ':00';
    let dataRange: dataRange = {
      start_date: startDate,
      end_date: endDate,
    };
    this.httpTerms.addTechersTerms(dataRange).subscribe((data) => {
      this.newTerm.emit(true);
    });
  }
}
