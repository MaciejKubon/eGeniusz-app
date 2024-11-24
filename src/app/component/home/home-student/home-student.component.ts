import { Component } from '@angular/core';
import { UpcomingClassesComponent } from './component/upcoming-classes/upcoming-classes.component';
import { NoConfirmedClassesComponent } from './component/no-confirmed-classes/no-confirmed-classes.component';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [UpcomingClassesComponent, NoConfirmedClassesComponent],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss'
})
export class HomeStudentComponent {

}
