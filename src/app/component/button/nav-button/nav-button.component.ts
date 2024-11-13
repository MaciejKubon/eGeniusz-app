import { Component, Input } from '@angular/core';
import { linkButton } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  @Input() navigation: linkButton = { path: '', text: '' };
  link:string ='';
  currentUrl: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {    
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
    this.link = '/'+this.navigation.path;
  }
}
