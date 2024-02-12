import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import EditComponent from 'src/app/demo/ui-elements/modal/edit/edit.component';

@Component({
  selector: 'app-personnel-edit-popup',
  templateUrl: './personnel-edit-popup.component.html',
  styleUrls: ['./personnel-edit-popup.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class PersonnelEditPopupComponent extends EditComponent implements OnInit {
  
  constructor(public override modalRef: MdbModalRef<PersonnelEditPopupComponent> , public override apiService : ApiService , public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  "apiUrl") ; 
    this.buildEditForm();
  }
  
  buildEditForm(): void {
    this.editForm = new FormGroup({
      username: new FormControl('' , Validators.required),
      role: this.formBuilder.group({
        name: 'ariry',
        description: '',
      }),
    });
  }

  override save()
  {

  }
}
