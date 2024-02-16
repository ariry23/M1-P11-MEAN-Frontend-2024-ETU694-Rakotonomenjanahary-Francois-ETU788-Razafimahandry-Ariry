import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SERVICE_MANAGEMENT_UPDATE } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import EditComponent from 'src/app/demo/ui-elements/modal/edit/edit.component';


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'] , 
  standalone: true , 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class EditServiceComponent extends EditComponent {
  constructor(public override modalRef: MdbModalRef<EditServiceComponent> , public override apiService : ApiService , public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  SERVICE_MANAGEMENT_UPDATE) ; 
  }
  
  buildForm(): void {
    let formData = this.data ; 
    this.editForm = new FormGroup({
      nom: new FormControl(formData.nom , Validators.required),
      prix : new FormControl(formData.prix , Validators.required  ) , 
      commission: new FormControl(formData.commission , Validators.required),
      duree : new FormControl(formData.duree , Validators.required  ) ,
    });
  }


  override save() {
    let editData = { ...this.data };
    editData["nom"] = this.editForm.value.nom ;
    editData["prix"] = this.editForm.value.prix ;
    editData["commission"] = this.editForm.value.commission ;
    editData["duree"] = this.editForm.value.duree ;
    if (!(JSON.stringify(editData) === JSON.stringify(this.data)))
    {
     // console.log(editData) ; 
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
