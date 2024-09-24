import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './close-button.component.html',
  styleUrl: './close-button.component.scss'
})
export class CloseButtonComponent {

}
