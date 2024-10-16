import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { linkButton } from '../../../interface/interface';

@Component({
  selector: 'app-link-withoutbackground-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './link-withoutbackground-button.component.html',
  styleUrl: './link-withoutbackground-button.component.scss'
})
export class LinkWithoutbackgroundButtonComponent {
  @Input() navigation: linkButton = { path: '', text: ''};
  constructor(private route: ActivatedRoute) {}
}
