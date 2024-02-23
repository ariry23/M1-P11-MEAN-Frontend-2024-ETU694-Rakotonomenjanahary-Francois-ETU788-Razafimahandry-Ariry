import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { TASK_LIST } from 'src/app/constants/api.constant';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [ CommonModule] 
})
export default class TaskListComponent implements OnInit{

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
    this.apiService.postData(TASK_LIST,apiData).subscribe(datas => {
      this.data = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }
}
