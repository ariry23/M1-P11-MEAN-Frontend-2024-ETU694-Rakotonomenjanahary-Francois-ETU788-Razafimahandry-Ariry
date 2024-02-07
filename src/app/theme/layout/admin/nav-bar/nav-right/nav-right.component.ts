import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

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
  tokenService : TokenService;
  constructor(config: NgbDropdownConfig , tokenService: TokenService , router :  Router) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.tokenService = tokenService ;
    this.router = router ;
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }


  logout()
  {
    this.tokenService.removeToken() ; 
    this.router.navigate(['/auth/signin']); 
  }

  redirectToAccount()
  {
    this.router.navigate(['/account']); 
  }
}
