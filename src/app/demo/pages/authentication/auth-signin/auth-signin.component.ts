import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { Api } from 'src/app/core/models/api';
import { AlertService } from 'src/app/core/services/alert.service';
import { UtilCookieService } from 'src/app/core/services/util-cookie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  apiBaseUrl: string;
  constructor(private apiService: ApiService , private alertService: AlertService , private utilCookieService:UtilCookieService , private toastr : ToastrService , private router : Router) {
    this.apiBaseUrl = environment.apiBaseUrl;
    this.buildLoginForm();

    console.log(this.utilCookieService.hasToken()) ; 
  }

  ngOnInit(): void {
  }

  buildLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('' , Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    console.log(this.loginForm.value);
    let loginData: any = this.loginForm.value;
    let apiData = {
      username: loginData.username,
      password: loginData.password
    }
    this.apiService.postData('user/signin', apiData).subscribe(
      data => {
        this.utilCookieService.setToken(data.token); 
        this.router.navigate(["/dashboard"]) ; 
      } , 
      error => {
          this.toastr.error(error.error);
      }
    );
  }
}
