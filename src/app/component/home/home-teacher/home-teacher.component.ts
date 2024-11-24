import { Component } from '@angular/core';
import { NoConfirmedClassesComponent } from './component/no-confirmed-classes/no-confirmed-classes.component';
import { ConfirmedClassesComponent } from './component/confirmed-classes/confirmed-classes.component';

@Component({
  selector: 'app-home-teacher',
  standalone: true,
  imports: [NoConfirmedClassesComponent, ConfirmedClassesComponent],
  templateUrl: './home-teacher.component.html',
  styleUrl: './home-teacher.component.scss'
})
export class HomeTeacherComponent {

}
