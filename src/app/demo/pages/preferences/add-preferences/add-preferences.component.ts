import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddPreferencesComponent implements OnInit {

  @Output() ajoutSuccess: EventEmitter<void> = new EventEmitter<void>();
  dataServAdd: any[] | null = null;
  dataPersAdd: any[] | null = null;
  formAdd: FormGroup;
  servAdd = '';
  persAdd = '';
  constructor(private ref: ChangeDetectorRef, public modalRef: MdbModalRef<AddPreferencesComponent>, public apiService: ApiService, public toastrService: ToastrService, public formBuilder: FormBuilder, private tokenService: TokenService) {
    
  }

  ngOnInit(): void {
    this.getListServiceAdd()
    this.getListPersonelAdd()
    this.buildForm();
    console.log(this.dataPersAdd);
  }

  buildForm(): void {
    
    // if (this.dataServAdd.length != 0) {
    //   this.servAdd = this.dataServAdd[0]._id+'__'+this.dataServAdd[0].commission;
    // }
    // if (this.dataPersAdd.length != 0) {
    //   this.persAdd = this.dataPersAdd[0];
    // }
    this.formAdd = new FormGroup({
      serviceAdd: new FormControl(this.servAdd, Validators.required),
      personnelAdd: new FormControl(this.persAdd, Validators.required),
      prixAdd: new FormControl(0),
      dureeAdd: new FormControl(0)
    });
  }

  getListServiceAdd() {
    this.apiService.getData('service/list').subscribe(datas => {
      this.dataServAdd = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  getListPersonelAdd() {
    this.apiService.getData('personnel/list').subscribe(datas => {
      this.dataPersAdd = datas.data;
    }, err => {
      this.toastrService.error(err);
    })
  }

  onChangeService($event){
    this.servAdd = $event.target.value;
  }

  onChangePersonel($event){
    this.persAdd = $event.target.value;
  }

  saveAdd() {
    let userConnected: any = jwtDecode(this.tokenService.getToken());
    var serviceSelect  = this.servAdd;
    let serviceSelectId = serviceSelect.split('__');
    console.log("Selected : "+serviceSelectId[0] )
    console.log(  this.formAdd.value.personnel);
    let apiData = {
      _id: null,
      iduser: userConnected.user._id,
      idserv: serviceSelectId[0],
      idempl: this.persAdd,
      prix: this.formAdd.value.prixAdd,
      duree: this.formAdd.value.dureeAdd,
      commission: serviceSelectId[1],
      status: 'E'
    }
    this.apiService.postData('user/edit-pref', apiData).subscribe(datas => {
      this.toastrService.success(datas.message);
      this.modalRef.close()
      this.ajoutSuccess.emit();
    }, err => {
      this.toastrService.error(err.error);
    })

  }

}
