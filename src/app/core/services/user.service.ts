import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PERSONNEL_LIST } from 'src/app/constants/api.constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService : ApiService) {}
  lisPersonnel(): Observable<any> {
    return this.apiService.getData(PERSONNEL_LIST);
  }
}
