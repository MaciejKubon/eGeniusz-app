import { Component } from '@angular/core';
import { LinkButtonComponent } from '../../component/button/link-button/link-button.component';
import { linkButton } from '../../interface/interface';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ArrowDropButtonComponent } from '../../component/button/arrow-drop-button/arrow-drop-button.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [LinkButtonComponent, ArrowDropButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  navStudent: linkButton= { path: 'studentLogin', text: 'Jesteś uczniem? Zaloguj się.' };
  navTeacher: linkButton= { path: 'teacherLogin', text: 'Jesteś nauczycielem? Zaloguj się.' };

  constructor(private scroller: ViewportScroller, private router: Router) {}

  navigateTo(value:string){
  this.scroller.scrollToAnchor(value);

  }
}
