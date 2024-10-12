import { Component, ViewChild } from '@angular/core';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { level } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { NewLevelComponent } from '../../form/level/new-level/new-level.component';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';

@Component({
  selector: 'app-level-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    AddButtonComponent,
    MatTableModule,
    EditButtonComponent,
    DeleteButtonComponent,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CloseButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent,
    NewLevelComponent,
  ],
  templateUrl: './level-table.component.html',
  styleUrl: './level-table.component.scss',
})
export class LevelTableComponent {
  dataLevel: MatTableDataSource<level>;
  isLoadingResults: boolean = true;
  visableAddData: boolean = false;
  activeForm: number | null = null;
  myForm = new FormGroup({
    level: new FormControl(''),
  });
  displayedColumns: string[] = ['id', 'name', 'action'];
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private httpLevel: LevelHttpService) {
    this.dataLevel = new MatTableDataSource([{ id: 0, level: '' }]);
  }
  ngOnInit() {
    this.httpLevel.getLevels().subscribe((data) => {
      this.dataLevel = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }

  showAddData() {
    this.visableAddData = !this.visableAddData;
  }
  closeElement() {
    this.activeForm = null;
    this.myForm.value.level = '';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLevel.filter = filterValue.trim().toLowerCase();

    this.dataLevel.filter;

    if (this.dataLevel.paginator) {
      this.dataLevel.paginator.firstPage();
    }
  }
  columnSort() {
    this.dataLevel.sort = this.sort;
  }
  onSubmit() {
    console.log('aa');
  }
  editElement(id: number) {
    this.activeForm = id;
  }
  removeElement(id: number) {
    this.isLoadingResults = true;
    this.httpLevel.delateLevel(id).subscribe(() => {
      this.httpLevel.getLevels().subscribe((data) => {
        this.dataLevel = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
  addLevel(levelName: string) {
    this.isLoadingResults = true;
    this.httpLevel.addLevel(levelName).subscribe(() => {
      this.httpLevel.getLevels().subscribe((data) => {
        this.dataLevel = new MatTableDataSource(data);
        this.isLoadingResults = false;
      });
    });
  }
  saveElement(id: number) {
    if (typeof this.myForm.value.level === 'string') {
      this.isLoadingResults = true;
      this.httpLevel.editLevel(id, this.myForm.value.level).subscribe(() => {
        this.httpLevel.getLevels().subscribe((data) => {
          this.dataLevel = new MatTableDataSource(data);
          this.closeElement();
          this.isLoadingResults = false;
        });
      });
    }
  }
}
