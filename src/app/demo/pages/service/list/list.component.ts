import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RouteService } from 'src/app/core/services/route.service';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import ReservationComponent from '../reservation/reservation.component';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage],
})
export default class ListComponent implements OnInit {    
  data : any[] ;    
  reservationModalRef: MdbModalRef<any> | null = null;  
  constructor(private router : Router , public modalService : MdbModalService , public reservationComponent : ReservationComponent){}
  ngOnInit(): void {
    console.log("last successfull route : "); 
    //console.log(this.routerService.getLastSuccessfulRoute()); 
    this.getData();
  }
  isMouseOver: boolean = false;
  
  getData(): void{
      this
  }

  onMouseOver(): void {
    this.isMouseOver = true;
  
  }

  onMouseLeave(): void {
    this.isMouseOver = false;
  }

  getDetail(id)
  {
    console.log("get details") ; 
      this.router.navigate(['/service/detail', id]);
  }
  openReservationModal(id)
  {
    this.reservationModalRef = this.modalService.open(this.reservationComponent) ; 
    this.reservationModalRef.component.ajoutSuccess.subscribe(() => {
    
  });
  }

}
