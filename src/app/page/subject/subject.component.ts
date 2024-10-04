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
  
  navPosition:boolean = false;

  changeNavPosition(position:boolean){
    this.navPosition=position;
  }



}
