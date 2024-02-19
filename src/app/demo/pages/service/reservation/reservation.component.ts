import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export default class ReservationComponent {
  @Output() ajoutSuccess: EventEmitter<void> = new EventEmitter<void>();
  private form : FormGroup ;           
  constructor(public modalRef: MdbModalRef<ReservationComponent> , public apiService : ApiService , 
    public toastrService : ToastrService)
  {}                                      
                                        
  ngOnInit(): void {
    this.buildForm();
  }
  
  buildForm():void {
    this.form = new FormGroup({
      dateReservation: new FormControl(null, Validators.required),
      nombrePersonne: new FormControl(1, Validators.required),
  });

  }
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


