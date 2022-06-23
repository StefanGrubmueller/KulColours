import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {

  downloadUrl: any;

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/kul-colours.appspot.com/o/RoomsImages%2F572c4830-721d-11eb-bb63-96959c3b62f2%20(1).jpg?alt=media&token=2a880c0b-5c85-4ac7-b6c2-d973731a42a0';
  }

}
