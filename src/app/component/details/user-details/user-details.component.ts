import { Component } from '@angular/core';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { userDetail } from '../../../interface/interface';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { UserDetailsService } from '../../../service/http/user-details.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    EditButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  isLoadingResults: boolean = true;
  userDetails: userDetail = {
    firstName: '-',
    lastName: '-',
    birthday: '-',
  };
  showDetail: boolean = true;

  readonly firstName = new FormControl();
  readonly lastName = new FormControl();
  readonly birthday = new FormControl();


  constructor(private httpuserDetail: UserDetailsService) {}
  ngOnInit() {
    this.httpuserDetail.getUserDetails().subscribe((data) => {
      if (data.firstName != null && data.firstName != '')
        this.userDetails.firstName = data.firstName;
      if (data.lastName != null && data.lastName != '')
        this.userDetails.lastName = data.lastName;
      if (data.birthday != null && data.birthday != '')
        this.userDetails.birthday = data.birthday;
      this.isLoadingResults = false;
    });
  }

  setDefoult() {
    this.userDetails = {
      firstName: '-',
      lastName: '-',
      birthday: '-',
    };
  }
  saveEdit() {
    this.isLoadingResults = true;
  }
  changeToEdit() {
    this.showDetail = false;
    this.firstName.setValue(this.userDetails.firstName);
    this.lastName.setValue(this.userDetails.lastName);
    this.birthday.setValue(this.userDetails.birthday);

  }
  changetoDetail() {
    this.showDetail = true;
    this.setDefoult();
    this.isLoadingResults = true;
    this.httpuserDetail.getUserDetails().subscribe((data) => {
      if (data.firstName != null && data.firstName != '')
        this.userDetails.firstName = data.firstName;
      if (data.lastName != null && data.lastName != '')
        this.userDetails.lastName = data.lastName;
      if (data.birthday != null && data.birthday != '')
        this.userDetails.birthday = data.birthday;
      this.isLoadingResults = false;
    });
  }
}
