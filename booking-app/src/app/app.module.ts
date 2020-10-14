import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { CompaniesComponent } from './companies/companies.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServicesListComponent } from './services-list/services-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    CompaniesComponent,
    BookingsComponent,
    EmployeesComponent,
    DashboardComponent,
    routingComponents,
    NavbarComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    CompaniesListComponent,
    AddServiceComponent,
    ServicesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
