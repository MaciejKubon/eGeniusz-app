import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { ServerErrorComponent } from './page/server-error/server-error.component';
import { LevelComponent } from './page/level/level.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { LoginTeacherComponent } from './page/login-teacher/login-teacher.component';


export const routes: Routes = [
    {path: 'studentLogin', component:LoginPageComponent},
    {path: 'teacherLogin', component:LoginTeacherComponent},
    { path: 'subject', component: SubjectComponent },
    {path:'level', component: LevelComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: '404', component:NotFoundPageComponent},
    {path: '500', component:ServerErrorComponent},
    {path: '**', component:NotFoundPageComponent},

];
