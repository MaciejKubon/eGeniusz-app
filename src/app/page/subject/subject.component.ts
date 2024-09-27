import { Component } from '@angular/core';
import { subject } from '../../interface/interface';
import { HeaderComponent } from '../../component/header/header.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  
  navPosition:string = "back";

  subjects:subject[]=[{ 
    "id": 1,
    "name":"math"
  },{
        "id": 2,
    "name":"geography"
  }];
  changeNavPosition(position:string){
    this.navPosition=position;
  }



}
