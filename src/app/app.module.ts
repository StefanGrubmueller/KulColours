import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './main-page/main-page.component';
import {MatButtonModule} from "@angular/material/button";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {RouterModule} from "@angular/router";
import {MatCommonModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header/header.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {LogInComponent} from './log-in/log-in.component';
import {AppRoutingModule} from './app-routing.module';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { UploadPicturesComponent } from './upload-pictures/upload-pictures.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {MatFileUploadModule} from "angular-material-fileupload";

@NgModule({
  declarations: [AppComponent, MainPageComponent, NavigationComponent, HeaderComponent, LogInComponent, UploadPicturesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatCommonModule,
    MatButtonModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase), 'cloud'),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    AppRoutingModule,
    FileUploadModule,
    HttpClientModule,
    MatFileUploadModule,
    FormsModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    LogInComponent],
  bootstrap: [AppComponent],
  entryComponents: [LogInComponent, UploadPicturesComponent]
})
export class AppModule {
}
