import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DonateComponent } from './donate/donate.component';
import { AboutComponent } from './about/about.component';
import { SetTypeComponent } from './set-type/set-type.component';
import { TasksComponent } from './tasks/tasks.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerTasksComponent } from './volunteer-tasks/volunteer-tasks.component';
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home',
    data: {
    },
    canActivate: [AuthGuard]
  },
  {
    component: AboutComponent,
    path: 'about',
    data: {

    },
    canActivate: [AuthGuard]
  },
  {
    component: HistoryComponent,
    path: 'history',
    data: {
      roles: ['disability'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: VolunteerComponent,
    path: 'volunteer',
    data: {
      roles: ['disability'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: TasksComponent,
    path: 'tasks',
    data: {
      roles: ['volunteer'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: VolunteerTasksComponent,
    path: 'voltasks',
    data: {
      roles: ['volunteer'],
    },
    canActivate: [AuthGuard]
  },
  {
    component: DonateComponent,
    path: 'donate',
    data: {
    },
    canActivate: [AuthGuard]
  },
  {
    component: SetTypeComponent,
    path: 'type',
    data: {

    },
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
