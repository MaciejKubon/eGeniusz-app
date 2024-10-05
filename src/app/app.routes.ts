import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: 'subject', component: SubjectComponent },
    {path: '404', component:NotFoundPageComponent},
    {path: '**', component:NotFoundPageComponent}
];
