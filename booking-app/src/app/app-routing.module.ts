import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookingComponent } from './booking/add-booking/add-booking.component';
import { BookingsListComponent } from './booking/bookings-list/bookings-list.component';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { EditBookingComponent } from './booking/edit-booking/edit-booking.component';
import { TokenResolverService } from './common/services/token-resolver.service';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompaniesListComponent } from './company/companies-list/companies-list.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { ServicesListComponent } from './service/services-list/services-list.component';
import { ServicesComponent } from './service/services/services.component';
import { StartComponent } from './start/start.component';
import { ViewCompanyComponent } from './view/view-company/view-company.component';
import { ViewServiceComponent } from './view/view-service/view-service.component';

import { AuthGuard } from './auth.guard';
import { AuthGuardService } from './common/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {path: 'dashboard', component: DashboardComponent,
    resolve: {
      access: TokenResolverService
    }},
  {path: 'services', component: ServicesComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'add', component: AddServiceComponent},
    {path: 'list-user', component: ServicesListComponent},
    {path: 'edit', component: EditServiceComponent}
  ]},
  {path: 'companies', component: CompaniesComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'add', component: AddCompanyComponent},
    {path: 'edit', component: EditCompanyComponent},
    {path: 'list', component: CompaniesListComponent}
  ]},
  {path: 'bookings', component: BookingsComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'list', component: BookingsListComponent},
    {path: 'add', component: AddBookingComponent},
    {path: 'edit', component: EditBookingComponent}
  ]},
  {path: 'view-company/:id', component: ViewCompanyComponent,
  canActivate: [AuthGuard]},
  {path: 'view-service/:id', component: ViewServiceComponent,
  canActivate: [AuthGuard]},
  {path: 'callback', redirectTo: 'dashboard'},
  {path: 'start', component: StartComponent},
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent,
                                  ServicesComponent,
                                  CompaniesComponent,
                                  BookingsComponent,
                                  AddCompanyComponent,
                                  EditCompanyComponent,
                                  CompaniesListComponent,
                                  AddServiceComponent,
                                  ServicesListComponent,
                                  EditServiceComponent,
                                  BookingsListComponent,
                                  AddBookingComponent,
                                  EditBookingComponent,
                                  StartComponent];
