import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';

//faire la correspondance entre le path et le compo
const routes: Routes = [
  {path:'',
    pathMatch:"full",
    component:LoginComponent},
  {path:'create',
    pathMatch:"full",//matching complet
    component:MemberFormComponent
  },
  //lezem nhetouha f ay blasa kbal ** feyda
  {path:'edit/:id',
    pathMatch:'full',//ma ymatchi ken ki yelkaha nafsha sinon yahbat f **
    component:MemberFormComponent
  },
    {path:'dashboard',
    pathMatch:"full",
    component:DashboardComponent},
    {path:'tools',
    pathMatch:"full",
    component:ToolsComponent},
    {path:'events',
    pathMatch:"full",
    component:EventsComponent},

    {path:'articles',
    pathMatch:"full",
    component:ArticlesComponent},
  {path:'**',
    component:MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
