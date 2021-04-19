import { BrowserModule } from '@angular/platform-browser';

// import { FusionChartsModule } from 'angular-fusioncharts';
// import * as FusionCharts from 'fusioncharts';
// import * as Charts from 'fusioncharts/fusioncharts.charts';
// import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

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
import { RequestinmycareComponent } from './component/requestinmycare/requestinmycare.component';
import { VolunteersignupComponent } from './component/volunteersignup/volunteersignup.component';
import { LogupComponent } from './component/logup/logup.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { NewmanagerComponent } from './component/newmanager/newmanager.component';
import { ChartsModule } from 'ng2-charts';
import { Statistic1Component } from './component/statistic1/statistic1.component';
import { Statistic2Component } from './component/statistic2/statistic2.component';
import { Statistic3Component } from './component/statistic3/statistic3.component';
import { Statistic4Component } from './component/statistic4/statistic4.component';

//import { FusionChartsModule } from 'angular-fusioncharts';
//import { ChartsModule } from '@progress/kendo-angular-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import 'hammerjs';
//import { SparklineModule } from '@progress/kendo-angular-charts';




//FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    reservoirOfRequestsComponent,
    CreatenewcallComponent,
    AskforhelpComponent,
    RequestinmycareComponent,
    VolunteersignupComponent,
    LogupComponent,
    FeedbackComponent,
    StatisticsComponent,
    NewmanagerComponent,
    Statistic1Component,
    Statistic2Component,
    Statistic3Component,
    Statistic4Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule
    //FusionChartsModule
    //ChartsModule,
    //BrowserAnimationsModule,
    //SparklineModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
