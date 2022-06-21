import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {LogInComponent} from "../log-in/log-in.component";
import {UploadPicturesComponent} from "../upload-pictures/upload-pictures.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input()
  shouldRun: boolean;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLogInDialog() {
    this.matDialog.open(LogInComponent);
  }

  openUploadDialog() {
    this.matDialog.open(UploadPicturesComponent);
  }

}
