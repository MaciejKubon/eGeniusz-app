import { Component } from '@angular/core';
import { subject } from '../../interface/interface';
import { AddButtonComponent } from '../../component/button/add-button/add-button.component';
import { DeleteButtonComponent } from '../../component/button/delete-button/delete-button.component';
import { EditButtonComponent } from '../../component/button/edit-button/edit-button.component';
import { SaveButtonComponent } from '../../component/button/save-button/save-button.component';
import { HomeButtonComponent } from '../../component/button/home-button/home-button.component';
import { AcceptButtonComponent } from '../../component/button/accept-button/accept-button.component';


@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [AddButtonComponent, DeleteButtonComponent, EditButtonComponent, SaveButtonComponent,HomeButtonComponent, AcceptButtonComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {

  subjects:subject[]=[{ 
    "id": 1,
    "name":"math"
  },{
        "id": 2,
    "name":"geography"
  }];



}
