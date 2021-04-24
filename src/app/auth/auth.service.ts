import { AuthData } from './auth-data.modal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})

export class AuthService {
    private user: User;
    authChange =  new Subject<boolean>();
     
    constructor(private router: Router) { }
    
    registerUser(authData : AuthData) {
        this.user = {
            email: authData.email,
            userId : Math.round(Math.random() *1000).toString()
        }
        this.authChange.next(true);
        this.navigate();
    }
    login(authData : AuthData) {
        this.user = {
            email: authData.email,
            userId : Math.round(Math.random() *1000).toString()
        }
        this.authChange.next(true);
        this.navigate();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
       
    }
    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private navigate() {
        this.router.navigate(['/training']);
    }
}
