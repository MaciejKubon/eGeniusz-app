import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { SubjectTableComponent } from '../../component/table/subject-table/subject-table.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, SubjectTableComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  
  navPosition:boolean = false;

  changeNavPosition(position:boolean){
    this.navPosition=position;
  }



}
