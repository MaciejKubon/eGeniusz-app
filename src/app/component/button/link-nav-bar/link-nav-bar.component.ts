import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-link-nav-bar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule,RouterModule ],
  templateUrl: './link-nav-bar.component.html',
  styleUrl: './link-nav-bar.component.scss'
})
export class LinkNavBarComponent {
  @Input() navigation:{path:string, navPosition:boolean}={path:'',navPosition:true};
  link:string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.link = segments.map(segment => segment.path).join('/');
    });
  }
}
