import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ref: AngularFireStorageReference;
  title = "cloudsSorage";
  selectedFile: File;
  downloadURL: Observable<string>;
  fb: any;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }



  ngOnInit(): void {
  }

  saveTestDataToDB(fileInputEvent: any) {
    const ref = this.db.list('items');
    ref.push(fileInputEvent).then((resp) => console.log(resp)).catch((error) => console.log('error', error));
  }

  upload(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
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
