import { Component, Input } from '@angular/core';
import { ArrowBackComponent } from '../button/arrow-back/arrow-back.component';
import { CommonModule } from '@angular/common';
import { LinkNavBarComponent } from '../button/link-nav-bar/link-nav-bar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ArrowBackComponent, CommonModule, LinkNavBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() navPosition:boolean=false;

  navigation:{path:string, navPosition:boolean}[]=
  [
    {path:'subject',navPosition:this.navPosition},
    {path:'level',navPosition:this.navPosition},
  ]

  rollNav(){
    this.navPosition=!this.navPosition;
    this.navigation.forEach(e => { e.navPosition=this.navPosition   
    });
  }
}
