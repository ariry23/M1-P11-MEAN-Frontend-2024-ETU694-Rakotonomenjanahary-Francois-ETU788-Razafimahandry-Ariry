import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { UtilCookieService } from 'src/app/core/services/util-cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent {
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId: boolean;
  router : Router;
  utilCookieService : UtilCookieService;
  constructor(config: NgbDropdownConfig , utilCookieService: UtilCookieService , router :  Router) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.utilCookieService = utilCookieService ;
    this.router = router ;
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }


  logout()
  {
    this.utilCookieService.removeToken() ; 
    this.router.navigate(['/auth/signin']); 
  }
}
