import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { PreferenceDeleteComponent } from '../preference-delete/preference-delete.component';
import { PreferenceAjoutComponent } from '../preference-ajout/preference-ajout.component';
import { PreferenceEditComponent } from '../preference-edit/preference-edit.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] , 
  standalone:true , 
  imports: [CommonModule , MatIconModule],
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
 

  getData():void
  {
    this.apiService.getData("").subscribe(datas => {
      this.data = datas.data ; 
    }, err => {
      this.toastrService.error(err) ; 
    })
  }
  openEditModal(data: any) {
    this.editModalRef = this.modalService.open(PreferenceEditComponent , {data : {data:data}}) ; 
    this.editModalRef.component.editSuccess.subscribe(() => {
      this.getData(); 
    });
  }

  openAjoutModal() {
    this.ajoutModalRef = this.modalService.open(PreferenceAjoutComponent ) ; 
    this.ajoutModalRef.component.ajoutSuccess.subscribe(() => {
      this.getData(); 
    });
  }

  openDeleteModal(id: any , data?: any) {
    this.deleteModalRef = this.modalService.open(PreferenceDeleteComponent , {
      data : {
          data : {
          
            data : data !== null && data !== undefined ? data : null  
          }
      }
    }) ; 
    this.deleteModalRef.component.deleteSuccess.subscribe(() => {
      this.getData(); 
    });
  } 
}
