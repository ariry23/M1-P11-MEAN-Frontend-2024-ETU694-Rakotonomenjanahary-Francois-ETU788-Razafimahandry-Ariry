import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { USER_ACCOUNT_ADMIN } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.scss'] , 
  standalone: true , 
  imports: [ CommonModule , SharedModule]
})
export default class AccountAdminComponent implements OnInit {
  solde : number ; 
  data : any ; 
  
  constructor(private toastrService : ToastrService , private tokenService: TokenService , private apiService : ApiService){
  }
  ngOnInit(): void {  
    this.getData() ; 
  }
  getData(): void{
    let data = {
    } ; 
      this.apiService.postData(USER_ACCOUNT_ADMIN , data ).subscribe(datas => {
          this.data = datas.data ; 
        }, err => {
        this.toastrService.error(err);
      })
    
  }
}
