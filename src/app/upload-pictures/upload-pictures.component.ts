import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {finalize, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Author {
  name: string;
}

export interface dbImage {
  album: string,
  author: string;
  description: string;
  url: string;
  date: number;
}

@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.scss']
})
export class UploadPicturesComponent implements OnInit {

  ref: AngularFireStorageReference;
  selectedFiles: File[];
  downloadURL: Observable<string>;

  uploadForm: FormGroup;
  authors: Author[] = [
    {name: 'STEFAN GRUBMUELLER'},
    {name: 'JAKOB STEFANSICH'},
    {name: 'LUCA'},
  ];
  fileUploadQueue: any;

  constructor(public dialogRef: MatDialogRef<UploadPicturesComponent>,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      album: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', []],
    },)
  }

  close() {
    this.dialogRef.close();
  }

  // savePictureDataToDB(fileInputEvent: any) {
  //   const ref = this.db.list('items');
  //   ref.push(fileInputEvent).then((resp) => console.log(resp)).catch((error) => console.log('error', error));
  // }

  upload(event: any) {
    console.log('event', event);
    var n = Date.now();
    const file = event.file;
    const filePath = `${this.uploadForm.get('album')?.value}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              const ref = this.db.list(`imageInformations`);
              ref.push(this.setDbImage(url)).then((resp) => console.log(resp))
                .catch((error) => console.log('error', error));
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.close();
          console.log('not fb', url);

        }
      });
  }

  getAlbumErrorMessage() {
    return this.uploadForm.controls['album'].hasError('required') ? 'You must enter a value' : '';
  }

  getAuthorErrorMessage() {
    return this.uploadForm.controls['author'].hasError('required') ? 'You must select an author' : '';
  }

  setDbImage(url: string): dbImage {
    return {
      album: this.uploadForm.get('album')?.value,
      author: this.uploadForm.get('author')?.value,
      description: this.uploadForm.get('description')?.value,
      url: url,
      date: Date.now()
    }
  }

}
