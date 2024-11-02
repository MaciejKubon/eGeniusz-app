import { Component, OnInit, ViewChild } from '@angular/core';
import { subject } from '../../../interface/interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubjectHttpService } from '../../../service/http/subject-http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewSubjectComponent } from '../../form/subject/new-subject/new-subject.component';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { MatIconModule } from '@angular/material/icon';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-table',
  standalone: true,
  imports: [ 
    CommonModule,
    MatIconModule,
    AddButtonComponent,
    MatTableModule,
    EditButtonComponent,
    DeleteButtonComponent,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NewSubjectComponent,
    CloseButtonComponent,
    SaveButtonComponent,
  ],
  templateUrl: './subject-table.component.html',
  styleUrl: './subject-table.component.scss',
})
export class SubjectTableComponent implements OnInit {
  dataSubject: MatTableDataSource<subject>;
  displayedColumns: string[] = ['id', 'name', 'action'];
  isLoadingResults = true;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  destroy$: any;
  activeForm:number|null=null;
  visableAddData:boolean=false;
  myForm = new FormGroup({
    subject: new FormControl(''),
  });
  constructor(private httpSubject: SubjectHttpService) {
    this.dataSubject = new MatTableDataSource([{ id: 0, name: '' }]);
  }
  ngOnInit() {
    this.httpSubject.getSubjects().subscribe((data) => {
      this.dataSubject = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit() {
    this.dataSubject.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubject.filter = filterValue.trim().toLowerCase();

    this.dataSubject.filter;

    if (this.dataSubject.paginator) {
      this.dataSubject.paginator.firstPage();
    }
  }
  columnSort() {
    this.dataSubject.sort = this.sort;
  }
  pagination() {
    console.log('aa');

    this.dataSubject.paginator = this.paginator;
  }
  showAddData(){
    this.visableAddData = !this.visableAddData;

    
  }
  onSubmit(){
    console.log('aa');
    
  }
  removeElement(id: number) {
    this.isLoadingResults = true;
    this.httpSubject.delateSubject(id).subscribe(() => {
      this.httpSubject.getSubjects().subscribe((data) => {
        this.dataSubject = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
  editElement(id:number){
    this.activeForm = id;
  }
  closeElement(){
    this.activeForm = null;
    this.myForm.value.subject='';
  }
  saveElement(id:number){
    if(typeof(this.myForm.value.subject)==="string")
    {
      this.isLoadingResults = true;
      this.httpSubject.editSubject(id,this.myForm.value.subject).subscribe(
        () => {
          this.httpSubject.getSubjects().subscribe((data) => {
            this.dataSubject = new MatTableDataSource(data);
            this.closeElement()
            this.isLoadingResults = false;
          });}
      )
    }
      
    
  }
  addSubject(subjectName:string) {
    this.isLoadingResults = true;
    this.httpSubject.addSubject(subjectName).subscribe(() => {
      this.httpSubject.getSubjects().subscribe((data) => {
        this.dataSubject = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
}
