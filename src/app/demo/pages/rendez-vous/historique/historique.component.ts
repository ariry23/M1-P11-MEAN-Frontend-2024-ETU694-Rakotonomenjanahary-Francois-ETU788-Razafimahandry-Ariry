import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { USER_RESERVATION } from 'src/app/constants/api.constant';

import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-historique-rendez-vous',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'] , 
  standalone:true , 
  imports: [CommonModule],
})
export default class HistoriqueReservationComponent implements OnInit  {
  data : any[] ; 
  constructor(private apiService : ApiService , private tokenService : TokenService){

  }
  ngOnInit(): void {
      this.getData() ; 
  }
  getData() : void
  {
      let decoded : any = jwtDecode(this.tokenService.getToken());
      let data = {
          userid : decoded.user._id,
      } ; 
      this.apiService.postData(USER_RESERVATION  , data).subscribe(
        data => {
            this.data = data.data
        } , 
        error => {

        }
      )
  }
}
