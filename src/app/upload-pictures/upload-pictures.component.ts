import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {finalize, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.css']
})
export class UploadPicturesComponent implements OnInit {

  ref: AngularFireStorageReference;
  selectedFiles: File[];
  downloadURL: Observable<string>;
  fb: any;

  fileUploadQueue: any;

  constructor(public dialogRef: MatDialogRef<UploadPicturesComponent>, private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  // savePictureDataToDB(fileInputEvent: any) {
  //   const ref = this.db.list('items');
  //   ref.push(fileInputEvent).then((resp) => console.log(resp)).catch((error) => console.log('error', error));
  // }

  upload(event: any) {
    console.log('event',event);
    var n = Date.now();
    const file = event.file;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    }



}
