import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-level',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-level.component.html',
  styleUrl: './new-level.component.scss'
})
export class NewLevelComponent {

  @Output() level = new EventEmitter<string>();
  myForm = new FormGroup({
    level: new FormControl(''),
  });
  levelName:string = '';

  
  onSubmit() {
    if(typeof(this.myForm.value.level)=== "string")
    {
      this.levelName = this.myForm.value.level;
      this.level.emit(this.levelName);
    }
      
  }
}
 