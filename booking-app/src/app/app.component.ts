import { Component } from '@angular/core';
import { BookingService } from './common/services/booking.service';
import { CompanyService } from './common/services/company.service';
import { ServiceService } from './common/services/service.service';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking-app';
  companyObject: any;
  serviceObject: any;
  bookingObject: any;
  
  constructor(private _companyService: CompanyService, private _serviceService: ServiceService, private _bookingService: BookingService) {}

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
    this._serviceService.currentServiceObject.subscribe(res => this.serviceObject = res);
    this._bookingService.currentBookingObject.subscribe(res => this.bookingObject = res);
  }
 
  deleteCompany() {
    //delete company by id
    this._companyService.deleteCompany(this.companyObject.id)
    .subscribe(data => {
      $('companyModal').modal('hide');
      window.location.reload();
    });
  }

  deleteService() {
    this._serviceService.deleteService(this.serviceObject.id ,this.serviceObject.sk)
    .subscribe(data => {
      $('serviceModal').modal('hide');
      window.location.reload();
    });
  }

  deleteBooking() {
    this._bookingService.deleteBooking(this.bookingObject.id, this.bookingObject.sk)
    .subscribe(data => {
      $('bookingModal').modal('hide');
      window.location.reload();
    });
  }
}
