import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logedIn: boolean;

  constructor(public dialogRef: MatDialogRef<LogInComponent>, private angularFireAuth: AngularFireAuth) {

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  logIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'stefan.grubmueller@icloud.com', 'kul-colours-admin')
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in');
      })
      .catch((error) => {
        console.log(error.message);
      });

  }

  logOut() {
    this.angularFireAuth.signOut();
  }


}
