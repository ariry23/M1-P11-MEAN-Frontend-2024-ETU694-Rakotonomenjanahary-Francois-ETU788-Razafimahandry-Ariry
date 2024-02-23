import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-preference-edit',
  templateUrl: './preference-edit.component.html',
  styleUrls: ['./preference-edit.component.scss'] , 
  standalone: true , 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export class PreferenceEditComponent implements OnInit {
  @Output() editSuccess: EventEmitter<void> = new EventEmitter<void>();
  data: any | null = null  ; 
  public editForm : FormGroup ; 
  constructor(public modalRef: MdbModalRef<PreferenceEditComponent> , public apiService : ApiService , public toastrService : ToastrService)
  {
    this.buildForm();
  }
  
  ngOnInit(): void {
    console.log(this.data); 
   
  }
  buildForm():void {

  }

  save() {
    let editData = this.editForm.value ; 
   
    this.apiService.postData("" , editData).subscribe(
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
