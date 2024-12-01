import { Component } from '@angular/core';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { imageLink, userDetail } from '../../../interface/interface';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { UserDetailsService } from '../../../service/http/user-details.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
  avatarLink:string = '';
  selectedFile:File|null = null;
  constructor(private httpuserDetail: UserDetailsService) {}
  ngOnInit() {
    this.changetoDetail();
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
    this.userDetails = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthday: this.birthday.value,
    };
    this.httpuserDetail.setUserDetails(this.userDetails).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('Error fetching data'));
      })
    ).subscribe((data)=>{
      this.changetoDetail();
    });
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
      this.httpuserDetail.getStudentImage().subscribe((data:imageLink)=>{        
        this.setAvatar(data.imageUrl);
        this.isLoadingResults = false;
      })
    });
  }
  setAvatar(link:string){
    link = link.slice(16,link.length);
    link = 'http://localhost:8000'+link;
    this.avatarLink=link;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
  }
  przslij(){
    if(this.selectedFile!=null){
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.httpuserDetail.uploadStudentAvatar(formData).subscribe((data)=>{
        this.changetoDetail();
        
      });
    }
  }
  onSubmit(){
    if(this.selectedFile!=null){
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      this.httpuserDetail.uploadTeacherAvatar(formData).subscribe((data)=>{
        console.log(data);
        
      });
    }
  }
}
