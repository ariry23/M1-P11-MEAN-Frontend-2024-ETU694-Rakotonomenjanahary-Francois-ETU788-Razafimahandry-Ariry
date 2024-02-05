import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone : true , 
  imports: [CommonModule, SharedModule  , NgOptimizedImage],
})
export default class ListComponent {
  constructor(private router : Router){}
  isMouseOver: boolean = false;
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
}
