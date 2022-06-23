import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {dbImage} from "../upload-pictures/upload-pictures.component";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  @Input()
  albums: dbImage[] = [];

  @Output()
  onAlbumIsSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  onSelectAlbum(selectedAlbumName: string) {
    this.onAlbumIsSelected.emit(selectedAlbumName);
  }

}
