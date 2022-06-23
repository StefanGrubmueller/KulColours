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
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";

interface AlbumsNode {
  name: string;
  children?: AlbumsNode[];
}

interface AlbumsFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  private _transformer = (node: AlbumsNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }


  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);


  treeControl = new FlatTreeControl<AlbumsFlatNode>(
    node => node.level, node => node.expandable)
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  albumsNav: AlbumsNode[] = [];

  isHome = true;
  isAlbums = false;
  isAlbum = false;

  albums: dbImage[] = [];
  albumName: string;

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
        // this.albums.forEach(albums => this.albumsNav.push({name: this.albums.find(elem => elem?.album  !== albums.album).album}));
        // this.dataSource.data = [
        //   {
        //     name: 'Albums',
        //     children: this.albumsNav,
        //   },
        // ];
      })
    })
  }

  goToAlbums() {
    this.isHome = false;
    this.isAlbum = false;
    this.isAlbums = true;
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
    this.isAlbum = false;
    this.isAlbums = false;
    this.isHome = true;
  }

  goToSelectedAlbum(selectedAlbum: string) {
    this.albumName = selectedAlbum;
    this.isAlbums = false;
    this.isHome = false;
    this.isAlbum = true;
  }

  hasChild = (_: number, node: AlbumsFlatNode) => node.expandable;

}
