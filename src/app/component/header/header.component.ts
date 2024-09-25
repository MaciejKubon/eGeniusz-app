import { Component } from '@angular/core';
import { HomeButtonComponent } from '../button/home-button/home-button.component';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '../button/close-button/close-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomeButtonComponent, CommonModule, CloseButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  activeMenu:boolean;
  constructor(){
    this.activeMenu=false;
  }
  menu(){
    if(this.activeMenu)
      this.activeMenu=false;
    else
    this.activeMenu=true;
  }

}
