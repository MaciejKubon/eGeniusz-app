import { Component } from '@angular/core';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { DeleteButtonComponent } from '../../button/delete-button/delete-button.component';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CloseButtonComponent, DeleteButtonComponent],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {

}
