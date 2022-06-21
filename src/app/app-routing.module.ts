import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LogInComponent} from "./log-in/log-in.component";

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'main-page', component: MainPageComponent},
  {path: 'login', component: LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
