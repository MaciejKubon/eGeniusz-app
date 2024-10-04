import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-arrow-back',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './arrow-back.component.html',
  styleUrl: './arrow-back.component.scss'
})
export class ArrowBackComponent {
  @Input() position:boolean=true;

}
