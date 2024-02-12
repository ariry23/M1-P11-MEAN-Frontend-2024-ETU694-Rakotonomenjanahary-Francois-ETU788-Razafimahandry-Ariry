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
@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'] , 
  standalone: true,
  imports: [MatIconModule , CommonModule] 
})
export default class PersonnelComponent implements OnInit {
editModalRef: MdbModalRef<PersonnelEditPopupComponent> | null = null;
deleteModalRef: MdbModalRef<DeleteConfirmationComponent> | null = null;
datas : any[] ; 
constructor(private apiService : ApiService , private modalService: MdbModalService , private userService : UserService , private toastrService : ToastrService) {}
  ngOnInit(): void {
      this.getData();
      
  }

  getData():void
  {
    this.userService.lisPersonnel().subscribe(data => {
      this.datas = data.personnelList;
    }, err => {
      this.toastrService.error(err) ; 
    })
  }
  openEditModal() {
    this.editModalRef = this.modalService.open(PersonnelEditPopupComponent , {data : {
        modalData : "modalData"
    }}) ; 
  }

  openDeleteModal() {
    this.deleteModalRef = this.modalService.open(DeleteConfirmationComponent , {
      //modalClass : "modal-sm" , 
      data : {
          apiUrl : 'testDelete' 
      }
    }) ; 
  }




}
