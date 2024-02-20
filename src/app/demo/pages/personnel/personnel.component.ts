import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'
import { EditComponent } from '../edit/edit.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import DeleteConfirmationComponent from '../../ui-elements/modal/delete-confirmation/delete-confirmation.component';
import { PersonnelEditPopupComponent } from './personnel-edit-popup/personnel-edit-popup.component';
import { AjoutPopupComponent } from './ajout-popup/ajout-popup.component';
import { PERSONNEL_AJOUT, PERSONNEL_DELETE, PERSONNEL_LIST, PERSONNEL_UPDATE } from 'src/app/constants/api.constant';
import { ListBasePageComponent } from '../../ui-elements/page/list-base-page/list-base-page.component';
@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'] , 
  standalone: true,
  imports: [MatIconModule , CommonModule] 
})
export default class PersonnelComponent extends ListBasePageComponent {
  constructor(public override apiService: ApiService , public override modalService : MdbModalService ,  
    public override toastrService : ToastrService
    ){    
    super(apiService ,  modalService  ,   
      toastrService ,       
      PERSONNEL_LIST ,      
      PERSONNEL_DELETE ,    
      DeleteConfirmationComponent  ,   
      PersonnelEditPopupComponent  , 
      AjoutPopupComponent);
    }

/*editModalRef: MdbModalRef<PersonnelEditPopupComponent> | null = null;
deleteModalRef: MdbModalRef<DeleteConfirmationComponent> | null = null;
ajoutModalRef: MdbModalRef<AjoutPopupComponent> | null = null;  
datas : any[] ; 
constructor(private apiService : ApiService , private modalService: MdbModalService , private userService : UserService , private toastrService : ToastrService) {}
  ngOnInit(): void {
      this.getData();
  }

  getData():void
  {
    console.log('get data');
    this.userService.lisPersonnel().subscribe(data => {
      this.datas = data.data;
    }, err => {
      this.toastrService.error(err) ; 
    })
  }
  openEditModal(data) {
    this.editModalRef = this.modalService.open(PersonnelEditPopupComponent , {data : {
       data : {
          formData : data
       }
    }}) ; 
    this.editModalRef.component.editSuccess.subscribe(() => {
      this.getData(); 
    });
  }

  openAjoutModal() {
    this.ajoutModalRef = this.modalService.open(AjoutPopupComponent ) ; 
    this.ajoutModalRef.component.ajoutSuccess.subscribe(() => {
      this.getData(); 
    });
  }

  openDeleteModal(id : any) {
    this.deleteModalRef = this.modalService.open(DeleteConfirmationComponent , {
      //modalClass : "modal-sm" , 
      data : {
          apiUrl : PERSONNEL_DELETE + '/' + id,
          message : "another message" , 
          icon : "<mat-icon>delete</mat-icon>"
      }
    }) ; 
    this.deleteModalRef.component.deleteSuccess.subscribe(() => {
      this.getData(); 
    });
  }
  */



}
