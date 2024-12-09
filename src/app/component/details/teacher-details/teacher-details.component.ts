import { Component } from '@angular/core';
import { imageLink, teacherDetail } from '../../../interface/interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsService } from '../../../service/http/user-details.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CloseButtonComponent } from '../../button/close-button/close-button.component';
import { EditButtonComponent } from '../../button/edit-button/edit-button.component';
import { SaveButtonComponent } from '../../button/save-button/save-button.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [    ReactiveFormsModule,
    SpinnerComponent,
    MatFormFieldModule,
    MatInputModule,
    EditButtonComponent,
    SaveButtonComponent,
    CloseButtonComponent,
    MatButtonModule],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.scss'
})
export class TeacherDetailsComponent {
  avatarLink:string = '';
  isLoadingResults: boolean = true;
  showDetail: boolean = true;
  userDetails: teacherDetail = {
    firstName: '-',
    lastName: '-',
    birthday: '-',
    description: '-',
  };
  readonly firstName = new FormControl();
  readonly lastName = new FormControl();
  readonly birthday = new FormControl();
  readonly description = new FormControl();
  selectedFile:File|null = null;
  constructor(private httpuserDetail: UserDetailsService) {}
  ngOnInit() {
    this.loadData();

  }
  loadData()
  {
    this.isLoadingResults = true;
    this.httpuserDetail.getTeacherDetails().subscribe((data) => {
      if (data.firstName != null && data.firstName != '')
        this.userDetails.firstName = data.firstName;
      if (data.lastName != null && data.lastName != '')
        this.userDetails.lastName = data.lastName;
      if (data.birthday != null && data.birthday != '')
        this.userDetails.birthday = data.birthday;
      if (data.description != null && data.description != '')
        this.userDetails.description = data.description;
      this.httpuserDetail.getTeacherImage().subscribe((data:imageLink)=>{
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
      this.httpuserDetail.uploadTeacherAvatar(formData).subscribe((data)=>{
        this.loadData();
        
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
  setDefoult() {
    this.userDetails = {
      firstName: '-',
      lastName: '-',
      birthday: '-',
      description: '-',
    };
  }
  saveEdit() {
    this.isLoadingResults = true;
    this.userDetails = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthday: this.birthday.value,
      description: this.description.value
    };
    this.httpuserDetail.setTeacherDetails(this.userDetails).pipe(
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
    this.description.setValue(this.userDetails.description);
  }
  changetoDetail() {
    this.showDetail = true;
    this.setDefoult();
    this.isLoadingResults = true;
    this.httpuserDetail.getTeacherDetails().subscribe((data) => {
      if (data.firstName != null && data.firstName != '')
        this.userDetails.firstName = data.firstName;
      if (data.lastName != null && data.lastName != '')
        this.userDetails.lastName = data.lastName;
      if (data.birthday != null && data.birthday != '')
        this.userDetails.birthday = data.birthday;
      if (data.description != null && data.description != '')
        this.userDetails.description = data.description;
      this.isLoadingResults = false;
    });
  }
}
