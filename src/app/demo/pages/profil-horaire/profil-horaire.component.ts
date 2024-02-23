import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { HORAIRE_USER, ADDORUPDATE_HORAIRE } from 'src/app/constants/api.constant';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from 'src/app/core/services/token.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-horaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil-horaire.component.html',
  styleUrls: ['./profil-horaire.component.scss']
})
export default class ProfilHoraireComponent implements OnInit {

  hourDebut = 0;
  minuteDebut = 0;
  hourFin = 0;
  minuteFin = 0;
  _id = null;
  jour = '';
  jour_ = '';
  horaireForm: FormGroup;

  lundi: boolean;
  mardi: boolean;
  mercredi: boolean;
  jeudi: boolean;
  vendredi: boolean;
  samedi: boolean;


  constructor(private apiService: ApiService, private toastrService: ToastrService, private tokenService: TokenService, private fb: FormBuilder) {

  }


  ngOnInit(): void {
    this.getData();
    this.buildHoraireForm();
  }

  buildHoraireForm(): void {
    this.horaireForm = new FormGroup({
      hourDebut: new FormControl(0, Validators.required),
      minuteDebut: new FormControl(0, Validators.required),
      hourFin: new FormControl(0, Validators.required),
      minuteFin: new FormControl(0, Validators.required),
      lundi: new FormControl(),
      mardi: new FormControl(),
      mercredi: new FormControl(),
      jeudi: new FormControl(),
      vendredi: new FormControl(),
      samedi: new FormControl()
    });
  }

  getData(): void {
    let userConnected: any = jwtDecode(this.tokenService.getToken());
    let apiData = {
      iduser: userConnected.user._id
    }
    this.apiService.postData(HORAIRE_USER, apiData).subscribe(datas => {
      if (datas.data._id != undefined) {
        this.jour = datas.data.jour;
        this.jour_ = datas.data.jour;
        this._id = datas.data._id;
        let hourD = datas.data.heureDebut.split(':');
        let hourFin = datas.data.heureFin.split(':');
        this.hourDebut = hourD[0];
        this.minuteDebut = hourD[1];
        this.hourFin = hourFin[0];
        this.minuteFin = hourFin[1];

      }

    }, err => {
      this.toastrService.error(err);
    })
  }
  fieldsChange(values: any): void {
    console.log(this._id);
    if (values.currentTarget.checked) {
      this.jour_ = this.jour_ + ',' + values.target.value;
      this.jour_ = this.jour_.replace(',,', ',');
      console.log(this.jour_)
    } else {
      this.jour_ = this.jour_.replace(values.target.value, '');
      this.jour_ = this.jour_.replace(',,', ',');
      console.log(this.jour_)
    }
    this.jour_ = this.jour_.replace(/^,/, '');
    console.log(values.currentTarget.checked);
  }

  fliedsChangehourDebut(values: any){
    this.hourDebut = values.target.value;
  }
  fliedsChangeminuteDebut(values: any){
    this.minuteDebut = values.target.value;
  }
  fliedsChangehourFin(values: any){
    this.hourFin = values.target.value;
  }
  fliedsChangeminuteFin(values: any){
    this.minuteFin = values.target.value;
  }
  public save(): void {
    let loginData: any = this.horaireForm.value;
    if (this.jour_.startsWith(',')) {
      this.jour_ = this.jour_.slice(0, 1);
    } else if (this.jour_.endsWith(',')) {
      this.jour_ = this.jour_.slice(0, -1);
    }
    let userConnected: any = jwtDecode(this.tokenService.getToken());
    let apiData = {
      _id: this._id,
      iduser: userConnected.user._id,
      heureDebut: this.hourDebut + ':' + this.minuteDebut,
      heureFin: this.hourFin + ':' + this.minuteFin,
      jour: this.jour_
    }
    this.apiService.postData(ADDORUPDATE_HORAIRE, apiData).subscribe(datas => {
      this.toastrService.success(datas.message);
    }, err => {
      this.toastrService.error(err);
    })
  }


}
