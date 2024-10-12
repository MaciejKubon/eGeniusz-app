import { Component } from '@angular/core';
import { LevelHttpService } from '../../../service/http/level-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { level } from '../../../interface/interface';

@Component({
  selector: 'app-level-table',
  standalone: true,
  imports: [],
  templateUrl: './level-table.component.html',
  styleUrl: './level-table.component.scss'
})
export class LevelTableComponent {
  dataLevel: MatTableDataSource<level>
  constructor(private httpLevel: LevelHttpService) {
    this.dataLevel= new MatTableDataSource([{ id: 0, name: '' }]);
  } 
}
