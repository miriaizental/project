import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/component/signup/signup.component';
import { SigninComponent } from 'src/app/component/signin/signin.component';
import { CreatenewcallComponent } from 'src/app/component/createnewcall/createnewcall.component';
import { AskforhelpComponent } from 'src/app/component/askforhelp/askforhelp.component';
import { AppComponent } from 'src/app/app.component'

const routes: Routes = [
  { path: '', component: AskforhelpComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'createnewcall/:id', component: CreatenewcallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
