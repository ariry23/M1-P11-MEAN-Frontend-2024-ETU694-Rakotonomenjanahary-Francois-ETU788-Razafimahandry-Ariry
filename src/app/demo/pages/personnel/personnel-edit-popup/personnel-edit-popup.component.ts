import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import EditComponent from 'src/app/demo/ui-elements/modal/edit/edit.component';

@Component({
  selector: 'app-personnel-edit-popup',
  templateUrl: './personnel-edit-popup.component.html',
  styleUrls: ['./personnel-edit-popup.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class PersonnelEditPopupComponent extends EditComponent {
  constructor(private userService : UserService, public override modalRef: MdbModalRef<PersonnelEditPopupComponent> , public override apiService : ApiService , public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  "apiUrl") ; 
  }
  
  override buildForm(): void {
    let formData = this.data ; 
    this.editForm = new FormGroup({
      username: new FormControl(formData.username , Validators.required),
      email : new FormControl(formData.email , [Validators.required , Validators.email] ) 
    });
  }


  override save() {
    let editData = { ...this.data };
    editData["username"] = this.editForm.value.username ;
    editData["email"] = this.editForm.value.email ;
    if (!(JSON.stringify(editData) === JSON.stringify(this.data)))
    {
     // console.log(editData) ; 
      this.userService.updatePersonnel(editData).subscribe(
        res => {
          this.modalRef.close();
          this.editSuccess.emit();
        },
        err => {
            this.toastrService.error(err.message); 
        }
      );
    }
    else{
        this.toastrService.error("veuillez modifier les données"); 
    }
  }
}
