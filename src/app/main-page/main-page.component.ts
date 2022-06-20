import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
  }

  saveTestDataToDB() {
    const ref = this.db.list('items');
    ref.push('TESTDATEN').then((resp) => console.log(resp)).catch((error) => console.log('error', error));
  }

}
