import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { serviceConstant } from 'src/app/constants/service.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { apiConstant } from 'src/app/constants/api.constant';
import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [CommonModule, RouterModule , ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent implements OnInit {
  apiBaseUrl: string;
  registerForm: FormGroup;
  constructor(private apiService: ApiService , private alertService: AlertService , private router : Router , private toastr : ToastrService) {
    this.apiBaseUrl = environment.apiBaseUrl;
    this.buildRegisterForm() ; 
  }
  ngOnInit(): void {} 
  
  buildRegisterForm(): void {
      this.registerForm = new FormGroup(
        {
          username: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required , Validators.email]),
          password: new FormControl('', [Validators.required , Validators.pattern(serviceConstant.passwordRegex)]),
          confirmPassword: new FormControl('', [Validators.required , Validators.pattern(serviceConstant.passwordRegex)]) 
        }
      )
  }
  register()
  {
    if(this.registerForm.valid)
    {
      let registerData = this.registerForm.value ; 
      this.apiService.postData('user/signup', registerData)
      .subscribe(
        res => {
        console.log(res);
        this.toastr.success(res.message) ;
        this.router.navigate(["/auth/signin"]) ; 
      } , 
      error =>{
          this.toastr.error(error.error) ; 
      }
      )
    }
  }
}
