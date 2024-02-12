import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
  @Output() editSuccess: EventEmitter<void> = new EventEmitter<void>();
  data: any | null = null  ; 
  public editForm : FormGroup ; 
  constructor(public modalRef: MdbModalRef<EditComponent> , public apiService : ApiService , public toastrService : ToastrService ,  @Inject('apiUrl') public apiUrl: string)
  {

  }
  
  ngOnInit(): void {
    console.log(this.data); 
    this.buildForm();
  }
  buildForm() : void{
    throw new Error('Method not implemented.');
  }

  save() {
    this.apiService.postData(this.apiUrl , this.editForm.value).subscribe(
      res => {
        this.modalRef.close();
        this.editSuccess.emit();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );
  }








}
