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

@Component({
  selector: 'app-subject-table',
  standalone: true,
  imports: [
    MatTableModule,
    EditButtonComponent,
    DeleteButtonComponent,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
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
  subjectName:string = '';
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
  removeElement(id: number) {
    this.isLoadingResults = true;
    this.httpSubject.delateSubject(id).subscribe(() => {
      this.httpSubject.getSubjects().subscribe((data) => {
        this.dataSubject = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
  onSubmit() {
    this.isLoadingResults = true;
    if(typeof(this.myForm.value.subject)=== "string")
      this.subjectName = this.myForm.value.subject;
    this.httpSubject.addSubject(this.subjectName).subscribe(() => {
      this.httpSubject.getSubjects().subscribe((data) => {
        this.dataSubject = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
}
