import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListBasePageComponent } from '../../ui-elements/page/list-base-page/list-base-page.component';
import { ApiService } from 'src/app/core/services/api.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AddPreferencesComponent } from './add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './edit-preferences/edit-preferences.component';
import DeleteConfirmationComponent from '../../ui-elements/modal/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'], 
  standalone: true,
  imports: [MatIconModule , CommonModule] 
})
export default class PreferencesComponent extends ListBasePageComponent{
  constructor(public override apiService: ApiService , public override modalService : MdbModalService ,  
    public override toastrService : ToastrService
    ){
    super(apiService ,  modalService  ,  
      toastrService , 
      'user/list-pref' , 
      'user/del-pref' , 
      DeleteConfirmationComponent   , 
      EditPreferencesComponent  , 
      AddPreferencesComponent);
  }
}
