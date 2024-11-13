import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../../button/logout-button/logout-button.component';
import { linkButton } from '../../../interface/interface';
import { NavButtonComponent } from '../../button/nav-button/nav-button.component';
import { HomeButtonComponent } from '../../button/home-button/home-button.component';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';

@Component({
  selector: 'app-teachar-header',
  standalone: true,
  imports: [CommonModule,LogoutButtonComponent, NavButtonComponent,CloseButtonComponent, HomeButtonComponent],
  templateUrl: './teachar-header.component.html',
  styleUrl: './teachar-header.component.scss'
})
export class TeacharHeaderComponent {
  nav:linkButton[] = [
    {path:'teacher', text: 'home'},
    {path:'teacher/subject', text: 'przedmioty'},
    {path:'teacher/calender', text: 'kalendarz'},
    {path:'teacher/details', text: 'ustawienia'}
  ];
  activeMenu = false;
  changeMenu(){
    this.activeMenu = !this.activeMenu;
  }
}
