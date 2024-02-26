import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
@Component({
  selector: 'app-edit-preferences',
  templateUrl: './edit-preferences.component.html',
  styleUrls: ['./edit-preferences.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditPreferencesComponent implements OnInit {
  @Output() editSuccess: EventEmitter<void> = new EventEmitter<void>();
  dataServ: any[] | null = null;
  dataPers: any[] | null = null;
  dataSingle: any;
  dataToUpdate: any;
  form: FormGroup;
  serv = '';
  pers = '';
  constructor(public modalRef: MdbModalRef<EditPreferencesComponent>, public apiService: ApiService, public toastrService: ToastrService, public formBuilder: FormBuilder, private tokenService: TokenService) {

  }

  ngOnInit(): void {
    //this.getListService()
    this.dataToUpdate = this.dataSingle;
    this.getListPersonel()
    this.buildForm();
  }

  buildForm(): void {
    this.serv = this.dataToUpdate.idserv+'__'+this.dataToUpdate.commission;
    this.pers = this.dataToUpdate.idempl;
    this.form = new FormGroup({
      prixEdit: new FormControl(this.dataToUpdate.prix),
      dureeEdit: new FormControl(this.dataToUpdate.duree),
      personnelEdit: new FormControl(this.pers, Validators.required),
      serviceEdit: new FormControl(this.serv , Validators.required),
      
    });
  }

  getListService() {
    this.apiService.getData('service/list').subscribe(datas => {
      this.dataServ = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  getListPersonel() {
    this.apiService.getData('personnel/list').subscribe(datas => {
      this.dataPers = datas.data;

    }, err => {
      this.toastrService.error(err);
    })
  }

  onChangeService($event) {
    this.serv = $event.target.value;
  }

  onChangePersonel($event) {
    this.pers = $event.target.value;
  }

  save() {
    let userConnected: any = jwtDecode(this.tokenService.getToken());
    var serviceSelect = this.serv;
    let serviceSelectId = serviceSelect.split('__');
    console.log("Selected : " + serviceSelectId[0])
    console.log(this.form.value.personnelEdit);
    let apiData = {
      _id: this.dataToUpdate._id,
      iduser: userConnected.user._id,
      idserv: serviceSelectId[0],
      idempl: this.pers,
      prix: this.form.value.prixEdit,
      duree: this.form.value.dureeEdit,
      commission: serviceSelectId[1],
      status: 'E'
    }
    this.apiService.postData('user/edit-pref', apiData).subscribe(datas => {
      this.toastrService.success(datas.message);
      this.modalRef.close()
      this.editSuccess.emit();
    }, err => {
      this.toastrService.error(err.error);
    })

  }
}
