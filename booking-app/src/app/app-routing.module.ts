import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesComponent } from './companies/companies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EmployeesComponent } from './employees/employees.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'services', component: ServicesComponent,
  children: [
    {path: 'add', component: AddServiceComponent},
    {path: 'list-user', component: ServicesListComponent},
    {path: 'edit', component: EditServiceComponent}
  ]},
  {path: 'companies', component: CompaniesComponent,
  children: [
    {path: 'add', component: AddCompanyComponent},
    {path: 'edit', component: EditCompanyComponent},
    {path: 'list', component: CompaniesListComponent}
  ]},
  {path: 'bookings', component: BookingsComponent,
  children: [
    {path: 'list', component: BookingsListComponent}
  ]},
  {path: 'employees', component: EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent,
                                  ServicesComponent,
                                  CompaniesComponent,
                                  BookingsComponent,
                                  EmployeesComponent,
                                  AddCompanyComponent,
                                  EditCompanyComponent,
                                  CompaniesListComponent,
                                  AddServiceComponent,
                                  ServicesListComponent,
                                  EditServiceComponent,
                                  BookingsListComponent];
