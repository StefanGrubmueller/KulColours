import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success', this.userLoggedIn);

      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
      });
  }
}


