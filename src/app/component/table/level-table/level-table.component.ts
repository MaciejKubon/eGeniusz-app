import { Component } from '@angular/core';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { level } from '../../../interface/interface';
import { CommonModule } from '@angular/common';
import { NewLevelComponent } from '../../form/level/new-level/new-level.component';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-level-table',
  standalone: true,
  imports: [
    CommonModule,
    NewLevelComponent,
    CloseButtonComponent,
    AddButtonComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './level-table.component.html',
  styleUrl: './level-table.component.scss',
})
export class LevelTableComponent {
  dataLevel: MatTableDataSource<level>;
  isLoadingResults: boolean = true;
  visableAddData: boolean = false;
  constructor(private httpLevel: LevelHttpService) {
    this.dataLevel = new MatTableDataSource([{ id: 0, name: '' }]);
  }
  showAddData(){
    this.visableAddData = !this.visableAddData;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLevel.filter = filterValue.trim().toLowerCase();

    this.dataLevel.filter;

    if (this.dataLevel.paginator) {
      this.dataLevel.paginator.firstPage();
    }
  }
  addLevel(subjectName: string) {
    this.isLoadingResults = true;
    // this.httpLevel.addSubject(subjectName).subscribe(() => {
    //   this.httpLevel.getSubjects().subscribe((data) => {
    //     this.dataLevel = new MatTableDataSource(data);
    //     this.isLoadingResults = false;
    //   });
    // });
  }
}
