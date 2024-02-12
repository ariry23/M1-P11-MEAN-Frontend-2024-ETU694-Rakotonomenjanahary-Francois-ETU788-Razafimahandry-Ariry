import { Component, Inject, OnInit } from '@angular/core';
import DeleteConfirmationComponent from '../delete-confirmation/delete-confirmation.component';
import { ApiService } from 'src/app/core/services/api.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'] , 
  standalone: true , 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export default class EditComponent implements OnInit {
  modalData: any | null = null  ; 
  public editForm : FormGroup ; 
  constructor(public modalRef: MdbModalRef<EditComponent> , public apiService : ApiService , public toastrService : ToastrService ,  @Inject('apiUrl') public apiUrl: string)
  {

  }
  
  ngOnInit(): void {
  }

  save() {
    console.log(this.apiUrl) ;
    console.log(this.editForm.value) ;
   
    /*this.apiService.deleteData("test").subscribe(
      res => {
        this.modalRef.close();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );*/
  }








}
