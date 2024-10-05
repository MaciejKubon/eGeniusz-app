import { Routes } from '@angular/router';
import { SubjectComponent } from './page/subject/subject.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'subject', component: SubjectComponent },
    {path: '**', component:AppComponent}

];
