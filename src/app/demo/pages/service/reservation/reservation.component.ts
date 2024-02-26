import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { jwtDecode } from 'jwt-decode';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PERSONNEL_LIST, SERVICE_RESERVATION, USER_RESA } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule , DragDropModule , NgxFileDropModule , NgxSpinnerModule]
})
export class ReservationComponent {
  @Output() ajoutSuccess: EventEmitter<void> = new EventEmitter<void>();
  form : FormGroup ;      
  employes : any[] ;      
  service: any | null = null  ; 
  constructor(private tokenService : TokenService , public modalRef: MdbModalRef<ReservationComponent> , public apiService : ApiService , 
    public toastrService : ToastrService)
  {
    this.buildForm();
  }                                      
                                        
  ngOnInit(): void {
      this.getEmployeData() ; 
      console.log("service :" ) ; 
      console.log(this.service) ; 
  }
  
  buildForm():void {
    this.form = new FormGroup({
      dateReservation: new FormControl(new Date().toISOString().substring(0, 10) , Validators.required),
      nombrePersonne: new FormControl(1, [Validators.required , Validators.max(5)] ),
      heureDebut: new FormControl(null , Validators.required), 
      employe : new FormControl("")
  });

  }
  save() {
    let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
    console.log(decodedToken) ; 
    let reservationData = {
      idserv: this.service._id , 
      userid: decodedToken.user._id , 
      idemploye: this.form.value.employe , 
      dateReservation: this.form.value.dateReservation + " " + this.form.value.heureDebut  + ":00" ,
      nbPersonne : this.form.value.nombrePersonne
    } ; 



    this.apiService.postData(USER_RESA , reservationData).subscribe(
      res => {
        this.modalRef.close();
        this.ajoutSuccess.emit();
      },
      err => {
          this.toastrService.error(err.error ); 
      }
    );
  }
  getEmployeData():void
  {
    this.apiService.getData(PERSONNEL_LIST).subscribe(datas => {
      this.employes = datas.data ; 
    }, err => {
      this.toastrService.error(err.error) ; 
    })
  }

}


