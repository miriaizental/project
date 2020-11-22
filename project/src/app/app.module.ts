import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { SigninComponent } from './component/signin/signin.component';
import { reservoirOfRequestsComponent } from './component/reservoirOfRequests/reservoirOfRequests.component';
import { CreatenewcallComponent } from './component/createnewcall/createnewcall.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AskforhelpComponent } from './component/askforhelp/askforhelp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    reservoirOfRequestsComponent,
    CreatenewcallComponent,
    AskforhelpComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
