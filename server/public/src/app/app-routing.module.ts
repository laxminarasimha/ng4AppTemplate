import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth.guard'
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {
    path: '',
    component:LoginFormComponent    
  },
  {
    path: 'home',
    canActivate:[AuthGuard],
    component:HomeComponent    
  },
  {
    path: '**',
    canActivate:[AuthGuard],
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
