import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-arrow-drop-down',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './arrow-drop-down.component.html',
  styleUrl: './arrow-drop-down.component.scss'
})
export class ArrowDropDownComponent {

}
