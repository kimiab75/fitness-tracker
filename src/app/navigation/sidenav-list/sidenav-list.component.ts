import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit  , OnDestroy{
  @Output() onCloseSidebnav = new EventEmitter<void>();
  
  isAuth: boolean;
  authSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onClose() {
    this.onCloseSidebnav.emit();
  }
  onLogout() {
    this.onClose();
    this.authService.logout();
    
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
