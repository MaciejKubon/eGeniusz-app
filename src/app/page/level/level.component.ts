import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss',
})
export class LevelComponent {
  navPosition: boolean = false;

  changeNavPosition(position: boolean) {
    this.navPosition = position;
  }
}
