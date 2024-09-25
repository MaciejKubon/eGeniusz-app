import { Component } from '@angular/core';
import { subject } from '../../interface/interface';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [HeaderComponent],
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
