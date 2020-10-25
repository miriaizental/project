import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ SignupComponent } from 'src/app/component/signup/signup.component';
import {SigninComponent} from 'src/app/component/signin/signin.component';
import{CreatenewcallComponent} from'src/app/component/createnewcall/createnewcall.component';
import {AskforhelpComponent} from 'src/app/component/askforhelp/askforhelp.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'createnewcall',component:CreatenewcallComponent},
  {path:'askforhelp',component:AskforhelpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }