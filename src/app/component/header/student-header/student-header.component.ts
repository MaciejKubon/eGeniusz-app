import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { linkButton } from '../../../interface/interface';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { HomeButtonComponent } from '../../button/home-button/home-button.component';
import { LogoutButtonComponent } from '../../button/logout-button/logout-button.component';
import { NavButtonComponent } from '../../button/nav-button/nav-button.component';

@Component({
  selector: 'app-student-header',
  standalone: true,
  imports: [CommonModule,LogoutButtonComponent, NavButtonComponent,CloseButtonComponent, HomeButtonComponent],
  templateUrl: './student-header.component.html',
  styleUrl: './student-header.component.scss'
})
export class StudentHeaderComponent {
  nav:linkButton[] = [
    {path:'student', text: 'home'},
    {path:'student/calendar',text:'kalendarz'},
    {path:'student/teacher', text: 'nauczyciele'},
    {path:'student/details', text: 'ustawienia'}
  ];
  activeMenu = false;
  changeMenu(){
    this.activeMenu = !this.activeMenu;
  }
}
