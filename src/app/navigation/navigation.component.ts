import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogInComponent} from "../log-in/log-in.component";
import {dbImage, UploadPicturesComponent} from "../upload-pictures/upload-pictures.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {first, tap} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getStorage, ref} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";


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

  isHome = true;
  isAlbums = false;

  albums: dbImage[] = [];

  constructor(private matDialog: MatDialog, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.afAuth.authState.pipe(first()).pipe(
      tap(user => {
        this.isLoggedIn = !!user;
      })
    ).subscribe()

    this.db.list('imageInformations').valueChanges().subscribe((albums) => {
      albums.forEach(album => {
        // @ts-ignore
        if (this.albums.find(elem => elem.album  !== album.album) || this.albums.length === 0) {
          this.albums.push(<dbImage>album);
        }
      })
    })
  }

  goToAlbums() {
    this.isHome = false;
    this.isAlbums = true;
    //this.router.navigate([`albums`]);
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

  goToHome() {
    this.isAlbums = false;
    this.isHome = true;
  }

}
