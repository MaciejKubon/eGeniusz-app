import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-subject',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-subject.component.html',
  styleUrl: './new-subject.component.scss'
})
export class NewSubjectComponent {
  @Output() subject = new EventEmitter<string>();
  myForm = new FormGroup({
    subject: new FormControl(''),
  });
  subjectName:string = '';

  
  onSubmit() {
    if(typeof(this.myForm.value.subject)=== "string")
      this.subjectName = this.myForm.value.subject;
    this.subject.emit(this.subjectName);
  }
}
 