import { Component } from '@angular/core';
import { UpcomingClassesComponent } from './component/upcoming-classes/upcoming-classes.component';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [UpcomingClassesComponent],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss'
})
export class HomeStudentComponent {

}
