import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { PERSONNEL_AJOUT } from 'src/app/constants/api.constant';
import { PASSWORD_REGEX } from 'src/app/constants/service.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { AjoutComponent } from 'src/app/demo/ui-elements/modal/ajout/ajout.component';

@Component({
  selector: 'app-ajout-popup',
  templateUrl: './ajout-popup.component.html',
  styleUrls: ['./ajout-popup.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class AjoutPopupComponent extends AjoutComponent {
  constructor(public override modalRef: MdbModalRef<AjoutPopupComponent> , public override apiService : ApiService , public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  PERSONNEL_AJOUT) ; 
  }
  
  override buildForm(): void {
    this.form = new FormGroup({
          username: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required , Validators.email]),
          password: new FormControl('', [Validators.required , Validators.pattern(PASSWORD_REGEX)]),
          confirmPassword: new FormControl('', [Validators.required , Validators.pattern(PASSWORD_REGEX)]) 
    });
  }
}
