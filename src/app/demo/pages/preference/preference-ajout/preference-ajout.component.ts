import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-preference-ajout',
  templateUrl: './preference-ajout.component.html',
  styleUrls: ['./preference-ajout.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export class PreferenceAjoutComponent implements OnInit {
  @Output() ajoutSuccess: EventEmitter<void> = new EventEmitter<void>();
  public form : FormGroup ;           
  constructor(public modalRef: MdbModalRef<PreferenceAjoutComponent> , public apiService : ApiService ,
     public toastrService : ToastrService )
  {}                                      
                                        
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm():void 
  {

  };

  save() {
    this.apiService.postData("" , this.form.value).subscribe(
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
