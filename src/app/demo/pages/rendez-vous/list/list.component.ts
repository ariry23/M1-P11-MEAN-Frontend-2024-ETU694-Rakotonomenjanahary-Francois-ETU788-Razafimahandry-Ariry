import { Component, OnInit } from '@angular/core';

import { ListBasePageComponent } from '../../../ui-elements/page/list-base-page/list-base-page.component';
import { ApiService } from 'src/app/core/services/api.service';

import { ToastrService } from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RENDEZ_VOUS_LIST } from 'src/app/constants/api.constant';

import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/core/services/token.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [ CommonModule] 
})
export default class ListComponent implements OnInit{

  data: any;

  constructor(private apiService: ApiService, private toastrService: ToastrService, private tokenService: TokenService) {
    
  }

  ngOnInit(): void {
    this.getData(); 
  }

  getData(): void {
    let userConnected : any = jwtDecode(this.tokenService.getToken());
    let apiData = {
      idempl: userConnected.user._id,
    }
    this.apiService.postData(RENDEZ_VOUS_LIST,apiData).subscribe(datas => {
      this.data = datas.data;
      console.log(this.data);
    }, err => {
      this.toastrService.error(err);
    })
  }
}
