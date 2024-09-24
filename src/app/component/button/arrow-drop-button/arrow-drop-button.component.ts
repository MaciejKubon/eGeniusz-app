import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-arrow-drop-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './arrow-drop-button.component.html',
  styleUrl: './arrow-drop-button.component.scss'
})
export class ArrowDropButtonComponent {
  position:string = "arrowDown";
  changPostition(){
    if(this.position=="arrowDown")
      this.position = "arrowUp";
    else
      this.position="arrowDown";
  }
}
