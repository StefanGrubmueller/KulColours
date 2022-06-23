import {Component, Input, OnInit} from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
;
  }

}
