import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SERVICE_MANAGEMENT_DELETE, SERVICE_MANAGEMENT_LIST } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import DeleteConfirmationComponent from 'src/app/demo/ui-elements/modal/delete-confirmation/delete-confirmation.component';
import { ListBasePageComponent } from 'src/app/demo/ui-elements/page/list-base-page/list-base-page.component';
import { AjoutPopupComponent } from '../../personnel/ajout-popup/ajout-popup.component';
import { PersonnelEditPopupComponent } from '../../personnel/personnel-edit-popup/personnel-edit-popup.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AjoutServiceComponent } from './ajout-service/ajout-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'] , 
  standalone:true , 
  imports: [MatIconModule , CommonModule] 
})
export default class ManagementComponent extends ListBasePageComponent {
  constructor(public override apiService: ApiService , public override modalService : MdbModalService ,  
    public override toastrService : ToastrService
    ){
    super(apiService ,  modalService  ,  
      toastrService , 
      SERVICE_MANAGEMENT_LIST , 
      SERVICE_MANAGEMENT_DELETE , 
      DeleteConfirmationComponent , 
      EditServiceComponent  , 
      AjoutServiceComponent);
  }
}