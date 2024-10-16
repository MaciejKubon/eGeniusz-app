import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { linkButton } from '../../../interface/interface';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss',
})
export class LinkButtonComponent {
  @Input() navigation: linkButton = { path: '', text: ''};
  constructor(private route: ActivatedRoute) {}
}
