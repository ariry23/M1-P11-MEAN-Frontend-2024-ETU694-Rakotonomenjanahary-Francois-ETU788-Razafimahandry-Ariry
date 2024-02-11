import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {
  constructor(private routeService: RouteService)
  {
    console.log('init BasePageComponent') ; 
    console.log("last successful route :" + this.routeService.getLastSuccessfulRoute()) ; 
  }
  ngOnInit(): void {
    
  }

}
