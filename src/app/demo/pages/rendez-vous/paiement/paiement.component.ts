import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { jwtDecode } from 'jwt-decode';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { PAIEMENT_CREER } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'] , 
  standalone: true  , 
  imports: [MatIconModule , CommonModule , MatDialogModule ]
})
export class PaiementComponent {
  @Output() paiementSuccess: EventEmitter<void> = new EventEmitter<void>();
  employes : any[] ;      
  reservation: any | null = null  ; 
  constructor(private tokenService : TokenService , public modalRef: MdbModalRef<PaiementComponent> , public apiService : ApiService , 
    public toastrService : ToastrService)
  {
    
  }                                      
                                        
  ngOnInit(): void {
      console.log(this.reservation);
  }
  
  
  confirm() {
    this.apiService.postData(PAIEMENT_CREER , this.reservation).subscribe(
      res => {
        this.modalRef.close();
        this.paiementSuccess.emit();
      },
      err => {
          this.toastrService.error(err.message); 
      }
    );
  }

}
