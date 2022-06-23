import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogInComponent} from "../log-in/log-in.component";
import {UploadPicturesComponent} from "../upload-pictures/upload-pictures.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first, tap} from "rxjs";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input()
  shouldRun: boolean;

  @Input()
  isLoggedIn = false;

  constructor(private matDialog: MatDialog, private afAuth: AngularFireAuth,) {
  }

  ngOnInit(): void {
    this.afAuth.authState.pipe(first()).pipe(
      tap(user => {
        this.isLoggedIn = !!user;
      })
    ).subscribe()
  }

  openLogInDialog() {
    this.matDialog.open(LogInComponent, {
      width: '50em'
    });
  }

  openUploadDialog() {
    this.matDialog.open(UploadPicturesComponent, {
      width: '50em'
    });
  }

}
