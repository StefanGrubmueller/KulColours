import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogInComponent>) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }


}
