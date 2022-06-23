import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

type loginUserForm = {
  email: string;
  password: string;
};

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loggedIn: any = undefined;
  loginFailErrorMsg: string;
  loginForm: FormGroup;
  logInUser: loginUserForm;

  constructor(public dialogRef: MatDialogRef<LogInComponent>, private angularFireAuth: AngularFireAuth, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loggedIn = null;
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['' , [Validators.required]],
      },
    )

  }

  close() {
    this.dialogRef.close();
  }

  logIn() {
    // console.log('email: ', this.loginForm.get('email')?.value);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .then(() => {
        this.loggedIn = true;
        console.log('Logged in');
      })
      .catch((error) => {
        this.loggedIn = false;
        this.loginFailErrorMsg = error.message;
      });

  }

  logOut() {
    this.angularFireAuth.signOut();
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['password'].hasError('email') ? 'Not a valid password' : '';
  }

  isUserDataValid(): boolean {
    return !(this.loginForm.controls['password'].valid && this.loginForm.controls['email'].valid);
  }


}
