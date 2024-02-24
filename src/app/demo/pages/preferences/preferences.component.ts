import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListBasePageComponent } from '../../ui-elements/page/list-base-page/list-base-page.component';
import { ApiService } from 'src/app/core/services/api.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AddPreferencesComponent } from './add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './edit-preferences/edit-preferences.component';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'], 
  standalone: true,
  imports: [MatIconModule , CommonModule] 
})
export default class PreferencesComponent implements OnInit{
  ajoutModalRef: MdbModalRef<any> | null = null; 
  editModalRef: MdbModalRef<any> | null = null;
  data:any;
  dataServ: any;
  dataPers: any ;
  


  constructor(private ref: ChangeDetectorRef,public  apiService: ApiService , public  modalService : MdbModalService ,  public  toastrService : ToastrService, private tokenService: TokenService){
    this.ref.detectChanges;
  }
  ngOnInit(): void {
    this.getData()
    this.getListService()
    this.getListPersonel()
  }

  getData(): void {
    let userConnected : any = jwtDecode(this.tokenService.getToken());
    let apiData = {
      idclient: userConnected.user._id,
    }
    this.apiService.postData('user/list-pref',apiData).subscribe(datas => {
      this.data = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  getListService(){
    this.apiService.getData('service/list').subscribe(datas => {
      this.dataServ = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  getListPersonel(){
    this.apiService.getData('personnel/list').subscribe(datas => {
      this.dataPers = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  openAjoutModal(dataServ) {
    this.ajoutModalRef = this.modalService.open(AddPreferencesComponent) ; 
    this.ajoutModalRef.component.ajoutSuccess.subscribe(() => {
      this.getData()
    });
  }

  openEditModal(dataServ : any, dataSingle: any) {
    this.editModalRef = this.modalService.open(EditPreferencesComponent ,{data : {dataServ :dataServ, dataSingle}}) ; 
    this.editModalRef.component.editSuccess.subscribe(() => {
      this.getData()
    });
  }
}
