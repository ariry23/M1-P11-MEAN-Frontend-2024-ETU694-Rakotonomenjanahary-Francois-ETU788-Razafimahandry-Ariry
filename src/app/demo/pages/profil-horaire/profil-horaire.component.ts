import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-profil-horaire',
  templateUrl: './profil-horaire.component.html',
  styleUrls: ['./profil-horaire.component.scss']
})
export default class ProfilHoraireComponent implements OnInit{

    constructor(private apiService: ApiService){

    }

    ngOnInit(): void {
      
    }
}
