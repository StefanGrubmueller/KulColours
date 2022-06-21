import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {LogInComponent} from "../log-in/log-in.component";

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

  openDialog() {
    this.matDialog.open(LogInComponent);
  }

}
