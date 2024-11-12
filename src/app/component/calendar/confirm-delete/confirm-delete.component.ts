import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';
import { term } from '../../../interface/interface';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CloseButtonComponent, DeleteButtonComponent],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
})
export class ConfirmDeleteComponent {
  @Output() deleteTerm = new EventEmitter<boolean>();
  @Input() term: term = {
    id: 0,
    startTime: new Date('2024-11-09 11:00:00'),
    endTime: new Date('2024-11-09 12:00:00'),
    status: true,
    diffTime: null,
    posTop: null,
  };
  day: string = '';
  startTime: string = '';
  endTime: string = '';
  status: string = '';

  constructor(private httpTerms: TeacherTermsService) {}

  ngOnInit() {
    this.day = this.convertDate();
    this.startTime = this.term.startTime.toString().split(' ')[4];
    this.endTime = this.term.endTime.toString().split(' ')[4];
    if (this.term.status == true) this.status = 'zarezerwowany';
    else this.status = 'Nie zarezerowan';
  }
  convertDate(): string {
    let day: string = '';
    let month: string = '';
    let year: string = this.term.startTime.getFullYear().toString();
    if (this.term.startTime.getDate() < 10)
      day = '0' + this.term.startTime.getDate().toString();
    else day = this.term.startTime.getDate().toString();
    if (this.term.startTime.getMonth() + 1 < 10)
      month = '0' + (this.term.startTime.getMonth() + 1).toString();
    else month = (this.term.startTime.getMonth() + 1).toString();

    return day + '-' + month + '-' + year;
  }

  close() {
    this.deleteTerm.emit(false);
  }

  deleteTermFunction(){
    this.httpTerms.deleteTeacherTerm(this.term.id).subscribe((data)=>{
      this.deleteTerm.emit(true);
    })
  }
}
