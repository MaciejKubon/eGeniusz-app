import { Component } from '@angular/core';
import { subject } from '../../interface/interface';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
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
