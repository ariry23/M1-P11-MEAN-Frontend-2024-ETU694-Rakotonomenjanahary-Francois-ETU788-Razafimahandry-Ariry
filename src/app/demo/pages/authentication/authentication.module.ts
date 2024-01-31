import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import AuthSigninComponent from './auth-signin/auth-signin.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule , ReactiveFormsModule , FormsModule],
})
export class AuthenticationModule {}
