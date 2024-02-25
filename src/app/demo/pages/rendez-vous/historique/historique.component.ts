import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CLIENT_HISTORIQUE, USER_RESERVATION } from 'src/app/constants/api.constant';

import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { PaiementComponent } from '../paiement/paiement.component';

@Component({
  selector: 'app-historique-rendez-vous',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'] , 
  standalone:true , 
  imports: [CommonModule],
})
export default class HistoriqueReservationComponent implements OnInit  {
  data : any[] ; 
  paiementModalRef: MdbModalRef<any> | null = null;  
  constructor(private apiService : ApiService , private tokenService : TokenService , private modalService : MdbModalService){

  }
  ngOnInit(): void {
      this.getData() ; 
  }
  getData() : void
  {
      let decoded : any = jwtDecode(this.tokenService.getToken());
      let data = {
        idclient : decoded.user._id,
      } ; 
      this.apiService.postData(CLIENT_HISTORIQUE  , data).subscribe(
        data => {
            this.data = data.data
        } , 
        error => {
          
        }
      )
  } 

  
  openPaiementModal(reservation : any )
  {
    this.paiementModalRef = this.modalService.open(PaiementComponent , {
        data:{
          reservation : reservation
        }
    }) ; 
    this.paiementModalRef.component.paiementSuccess.subscribe(() => {
        this.getData() ; 
    });
  }
}
