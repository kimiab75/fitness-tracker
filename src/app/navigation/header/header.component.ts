import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  , OnDestroy{

 @Output() sidenavToggle = new EventEmitter<void>();
  
  isAuth: boolean;
  authSub: Subscription;

  constructor( private authService : AuthService) { }

  ngOnInit(): void {
   this.authSub =  this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
    
  }
}
