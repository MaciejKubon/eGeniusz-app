import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { LevelTableComponent } from '../../component/table/level-table/level-table.component';

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, LevelTableComponent],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss',
})
export class LevelComponent {
  navPosition: boolean = false;

  changeNavPosition(position: boolean) {
    this.navPosition = position;
  }
}
