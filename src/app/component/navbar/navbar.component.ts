import { Component, Input } from '@angular/core';
import { ArrowBackComponent } from '../button/arrow-back/arrow-back.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ArrowBackComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() navPosition:string="";

  rollNav(){
    if(this.navPosition=="back")
      this.navPosition="front"
    else
    this.navPosition="back";
  }
}
