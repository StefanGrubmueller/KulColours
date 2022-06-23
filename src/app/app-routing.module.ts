import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LogInComponent} from "./log-in/log-in.component";
import {AlbumsComponent} from "./albums/albums.component";

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LogInComponent},
  { path: 'albums', component: AlbumsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
