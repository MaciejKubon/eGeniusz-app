import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-accept-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './accept-button.component.html',
  styleUrl: './accept-button.component.scss'
})
export class AcceptButtonComponent {

}
