import { Component } from '@angular/core';
import { subject } from '../../interface/interface';
import { AddButtonComponent } from '../../component/button/add-button/add-button.component';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [AddButtonComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {

  subjects:subject[]=[{
    "id": 1,
    "name":"math"
  },{
        "id": 2,
    "name":"geography"
  }];



}
