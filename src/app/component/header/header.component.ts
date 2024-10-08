import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() position = new EventEmitter<boolean>();
  navPosition:boolean = false;
  constructor(){
  }
  menu(){
    this.navPosition=!this.navPosition;
    this.position.emit(this.navPosition); 
  }

}
