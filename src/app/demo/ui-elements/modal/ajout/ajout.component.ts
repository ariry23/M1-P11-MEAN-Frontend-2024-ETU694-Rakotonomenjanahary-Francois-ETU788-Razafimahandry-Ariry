import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export abstract class AjoutComponent {
  @Output() ajoutSuccess: EventEmitter<void> = new EventEmitter<void>();
  public ajoutForm : FormGroup ; 
  constructor(public modalRef: MdbModalRef<AjoutComponent> , public apiService : ApiService , public toastrService : ToastrService ,  @Inject('apiUrl') public apiUrl: string)
  {}
  
  ngOnInit(): void {
    this.buildForm();
  }
  abstract buildForm():void ;

  save() {
    let ajoutData = this.ajoutForm.value ; 
    this.apiService.postData(this.apiUrl , this.ajoutForm.value).subscribe(
      res => {
        this.modalRef.close();
        this.ajoutSuccess.emit();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );
  }
}
