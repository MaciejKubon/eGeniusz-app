import { Component } from '@angular/core';
import { LinkButtonComponent } from '../../component/button/link-button/link-button.component';
import { linkButton } from '../../interface/interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [LinkButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  navStudent: linkButton= { path: 'studentLogin', text: 'Jesteś uczniem? Zaloguj się.' };
  navTeacher: linkButton= { path: 'teacherLogin', text: 'Jesteś nauczycielem? Zaloguj się.' };

}
