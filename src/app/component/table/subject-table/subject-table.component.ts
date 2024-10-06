import { Component, ViewChild } from '@angular/core';
import { subject } from '../../../interface/interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const subject: subject[] = [
  { id: 0, name: 'a' },
  { id: 1, name: 'a' },
  { id: 2, name: 'a' },
  { id: 3, name: 'a' },
  { id: 4, name: 'a' },
  { id: 5, name: 'a' },
  { id: 6, name: 'a' },
  { id: 7, name: 'a' },
  { id: 8, name: 'a' },
  { id: 9, name: 'a' },
  { id: 10, name: 'a' },
  { id: 0, name: 'a' },
  { id: 0, name: 'a' },
  { id: 0, name: 'a' },
  { id: 0, name: 'a' },
  { id: 0, name: 'a' },
];

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
    MatFormFieldModule
  ],
  templateUrl: './subject-table.component.html',
  styleUrl: './subject-table.component.scss',
})
export class SubjectTableComponent {
  dataSubject: MatTableDataSource<subject>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor() {
    this.dataSubject = new MatTableDataSource(subject);
  }

  displayedColumns: string[] = ['id', 'name', 'action'];

  ngAfterViewInit() {
    this.dataSubject.paginator = this.paginator;
    this.dataSubject.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubject.filter = filterValue.trim().toLowerCase();

    if (this.dataSubject.paginator) {
      this.dataSubject.paginator.firstPage();
    }
  }

  removeElement(id: number) {}
}
