import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesComponent } from './service/services/services.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { BookingsComponent } from './booking/bookings/bookings.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';
import { CompaniesListComponent } from './company/companies-list/companies-list.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { ServicesListComponent } from './service/services-list/services-list.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { BookingsListComponent } from './booking/bookings-list/bookings-list.component';
import { AddBookingComponent } from './booking/add-booking/add-booking.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewCompanyComponent } from './view/view-company/view-company.component';
import { ViewServiceComponent } from './view/view-service/view-service.component';
import { EditBookingComponent } from './booking/edit-booking/edit-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    CompaniesComponent,
    BookingsComponent,
    DashboardComponent,
    routingComponents,
    NavbarComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    CompaniesListComponent,
    AddServiceComponent,
    ServicesListComponent,
    EditServiceComponent,
    BookingsListComponent,
    AddBookingComponent,
    ViewCompanyComponent,
    ViewServiceComponent,
    EditBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
