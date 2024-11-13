import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { ServerErrorComponent } from './page/server-error/server-error.component';
import { LevelComponent } from './page/level/level.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { LoginTeacherComponent } from './page/login-teacher/login-teacher.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { StudentPageComponent } from './page/student-page/student-page.component';
import { TeacherPageComponent } from './page/teacher-page/teacher-page.component';
import { StudentComponent } from './page/regiester/student/student.component';
import { TeacherComponent } from './page/regiester/teacher/teacher.component';
import { TeacherDetailsComponent } from './component/details/teacher-details/teacher-details.component';
import { TeacherCalendarComponent } from './component/calendar/teacher-calendar/teacher-calendar.component';
import { TeachersListComponent } from './component/teachers-list/teachers-list.component';
import { LessonsComponent } from './component/teacher/lessons/lessons.component';

export const routes: Routes = [
  { path: 'mainpage', component: MainPageComponent },
  { path: 'studentLogin', component: LoginPageComponent },
  { path: 'teacherLogin', component: LoginTeacherComponent },
  { path: 'studentRegister', component: StudentComponent },
  { path: 'teacherRegister', component: TeacherComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'level', component: LevelComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'teacher', component: TeacherPageComponent, children: [
    {path: 'details', component:TeacherDetailsComponent},
    {path: 'calender', component:TeacherCalendarComponent},
    {path: 'subject', component:LessonsComponent}
  ]},
  { path: '404', component: NotFoundPageComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: NotFoundPageComponent },
];
