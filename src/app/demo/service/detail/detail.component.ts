import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'service-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'] , 
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage],
})
export default class DetailComponent {


  openReservationPopup()
  {
      console.log('openReservationPopup');
  }

}
