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

  constructor(private httpSubject: SubjectHttpService) {
    this.dataSubject = new MatTableDataSource([{ id: 0, name: '' }]);
  }
  ngOnInit() {
    this.httpSubject.getSubjects().subscribe((config) => {
      this.dataSubject = new MatTableDataSource(config);
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit() {
    this.dataSubject.paginator
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubject.filter = filterValue.trim().toLowerCase();

    this.dataSubject.filter
    

    if (this.dataSubject.paginator) {
      this.dataSubject.paginator.firstPage();
    }
  }
  columnSort(){
    this.dataSubject.sort = this.sort;
  }
  pagination(){
    console.log('aa');
    
    this.dataSubject.paginator = this.paginator;
  }
  removeElement(id: number) {
    console.log(id);
    
  }
}
