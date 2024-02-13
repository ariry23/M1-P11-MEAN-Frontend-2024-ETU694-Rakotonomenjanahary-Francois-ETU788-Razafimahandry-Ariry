import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import EditComponent from 'src/app/demo/ui-elements/modal/edit/edit.component';

@Component({
  selector: 'app-personnel-edit-popup',
  templateUrl: './personnel-edit-popup.component.html',
  styleUrls: ['./personnel-edit-popup.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class PersonnelEditPopupComponent extends EditComponent {
  constructor(public override modalRef: MdbModalRef<PersonnelEditPopupComponent> , public override apiService : ApiService , public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  "apiUrl") ; 
  }
  
  override buildForm(): void {
    console.log(this.data.formData) ; 
    let formDatas = this.data.formData ; 
    this.editForm = new FormGroup({
      username: new FormControl(formDatas.username , Validators.required),
      email : new FormControl(formDatas.email , [Validators.required , Validators.email] ) 
    });
  }


  override save() {
    let editData = this.data.formData ; 
    let dt = this.data.formData ; 
   // this.data.formData = "tay" ; 
   this.data.formData["username"] = "testeb" ; 
    console.log(JSON.stringify(editData));
    console.log(const jsonObject = JSON.parse(jsonString);)
   //console.log(this.data.formData) ; 
    
    if ((JSON.stringify(editData) === JSON.stringify(this.data.formData)))
    {
      console.log("ato ee");
      this.apiService.postData(this.apiUrl , editData).subscribe(
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
