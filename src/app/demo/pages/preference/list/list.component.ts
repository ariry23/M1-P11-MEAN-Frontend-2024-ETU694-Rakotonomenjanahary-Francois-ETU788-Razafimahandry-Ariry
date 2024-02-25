import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { PreferenceDeleteComponent } from '../preference-delete/preference-delete.component';
import { PreferenceAjoutComponent } from '../preference-ajout/preference-ajout.component';
import { PreferenceEditComponent } from '../preference-edit/preference-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] , 
  standalone:true , 
  imports: [CommonModule , MatIconModule, NgxSpinnerModule],
})
export default class ListComponent implements OnInit {
  editModalRef: MdbModalRef<any> | null = null;
deleteModalRef: MdbModalRef<any> | null = null;
ajoutModalRef: MdbModalRef<any> | null = null;  
data:any[] ; 

constructor(public apiService: ApiService , public modalService : MdbModalService ,  
  public toastrService : ToastrService){}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getData('user/list-pref-all').subscribe(datas => {
      this.data = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  onSubmit(id, status){
  this.apiService.postData('user/valid-pref',{_id:id, status: status}).subscribe(datas => {
    this.toastrService.success(datas.message);
    this.getData();
  }, err => {
    this.toastrService.error(err.message);
  })
  }
}
