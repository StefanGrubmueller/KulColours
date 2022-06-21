import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../auth-service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  logedIn: boolean;

  constructor(public dialogRef: MatDialogRef<LogInComponent>, private angularFireAuth: AngularFireAuth, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  logIn(email: string, password: string) {
    this.authService.loginUser('stefan.grubmueller@icloud.com', 'kul-colours-admin').then((result) => {
      if (result == null) {                               // null is success, false means there was an error
        console.log('logging in...');          // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid == false) {
        console.log('login error', result);
      }
      console.log(this.authService.userLoggedIn);
    });

  }

  logOut() {
    this.angularFireAuth.signOut();
  }

  async isLogedIn() {
    if (this.logedIn === undefined) {
      this.logedIn = false;
    }
    console.log('this.logedIn', this.logedIn);
    return this.logedIn;
  }


}
