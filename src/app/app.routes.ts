import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { ServerErrorComponent } from './page/server-error/server-error.component';
import { LevelComponent } from './page/level/level.component';


export const routes: Routes = [
    { path: 'subject', component: SubjectComponent },
    {path:'level', component: LevelComponent},
    {path: '404', component:NotFoundPageComponent},
    {path: '500', component:ServerErrorComponent},
    {path: '**', component:NotFoundPageComponent},

];
