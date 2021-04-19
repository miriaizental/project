import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/component/signup/signup.component';
import { SigninComponent } from 'src/app/component/signin/signin.component';
import { CreatenewcallComponent } from 'src/app/component/createnewcall/createnewcall.component';
import { AskforhelpComponent } from 'src/app/component/askforhelp/askforhelp.component'
import { AppComponent } from 'src/app/app.component'
import { HomeComponent } from './component/home/home.component';
import { RequestinmycareComponent } from './component/requestinmycare/requestinmycare.component'
import { VolunteersignupComponent } from './component/volunteersignup/volunteersignup.component';
import { LogupComponent } from './component/logup/logup.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { StatisticsComponent } from './component/statistics/statistics.component'
import { NewmanagerComponent } from './component/newmanager/newmanager.component'
import { Statistic1Component} from './component/statistic1/statistic1.component'
import { Statistic2Component} from './component/statistic2/statistic2.component'
import { Statistic3Component} from './component/statistic3/statistic3.component'
import { Statistic4Component} from './component/statistic4/statistic4.component'


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'createnewcall', component: CreatenewcallComponent },
  { path: 'askforhelp', component: AskforhelpComponent },
  { path: 'requestinmycare', component: RequestinmycareComponent },
  { path: 'volunteersignup', component: VolunteersignupComponent },
  { path: 'logup', component: LogupComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'newmanager', component: NewmanagerComponent },
  { path: 'statistics-1', component:Statistic1Component},
  { path: 'statistics-2', component:Statistic2Component},
  { path: 'statistics-3', component:Statistic3Component},
  { path: 'statistics-4', component:Statistic4Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
