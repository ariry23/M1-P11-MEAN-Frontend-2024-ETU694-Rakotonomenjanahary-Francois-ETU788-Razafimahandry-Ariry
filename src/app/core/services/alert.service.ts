import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  simpleErrorAlert(error:Error)
  {
      alert(error.message);
  }
  
}
