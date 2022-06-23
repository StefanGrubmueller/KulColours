import {Component, Input, OnInit} from '@angular/core';
import {dbImage} from "../upload-pictures/upload-pictures.component";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input()
  albumName: string;

  albumImages: dbImage[] = [];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.db.list('imageInformations').valueChanges().subscribe((albumImages) => {
        // @ts-ignore
        this.albumImages = albumImages.filter(elem => elem.album === this.albumName);
      // console.log('albumName: ', this.albumName);
      //   console.log(albums);
    })

  }

}
