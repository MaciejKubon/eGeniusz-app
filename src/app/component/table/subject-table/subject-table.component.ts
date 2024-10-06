import { Component } from '@angular/core';
import { subject } from '../../../interface/interface';
import {MatTableModule} from '@angular/material/table';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';


@Component({
  selector: 'app-subject-table',
  standalone: true,
  imports: [MatTableModule, EditButtonComponent, DeleteButtonComponent],
  templateUrl: './subject-table.component.html',
  styleUrl: './subject-table.component.scss'
})
export class SubjectTableComponent {

  subject:subject[] = [
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
       {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
    {id: 0,name:'a'},
  ];
  displayedColumns: string[] = ['id', 'name', 'action'];

  removeElement(id:number){
    this.subject.splice(id,1);
    
  }

}
