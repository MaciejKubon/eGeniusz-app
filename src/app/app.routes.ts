import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { ServerErrorComponent } from './page/server-error/server-error.component';

export const routes: Routes = [
    { path: 'subject', component: SubjectComponent },
    {path: '404', component:NotFoundPageComponent},
    {path: '500', component:ServerErrorComponent},
    {path: '**', component:NotFoundPageComponent},

];
