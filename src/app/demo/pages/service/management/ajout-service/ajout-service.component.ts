import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SERVICE_MANAGEMENT_AJOUT } from 'src/app/constants/api.constant';
import { ApiService } from 'src/app/core/services/api.service';
import { AjoutComponent } from 'src/app/demo/ui-elements/modal/ajout/ajout.component';

@Component({
  selector: 'app-ajout-service',
  templateUrl: './ajout-service.component.html',
  styleUrls: ['./ajout-service.component.scss'] , 
  standalone: true, 
  imports: [MatIconModule, CommonModule , ReactiveFormsModule]
})
export class AjoutServiceComponent extends AjoutComponent {
  constructor(public override modalRef: MdbModalRef<AjoutServiceComponent> , public override apiService : ApiService , 
    public override toastrService : ToastrService , public formBuilder : FormBuilder)
  {
    super(modalRef , apiService , toastrService ,  SERVICE_MANAGEMENT_AJOUT) ; 
  }
  
  override buildForm(): void {
    this.form = new FormGroup({
          nom: new FormControl('', Validators.required),
          commission: new FormControl(null, Validators.required),
          duree: new FormControl(null, Validators.required),
          prix: new FormControl(null, Validators.required) 
    });
  }
}
