import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/common/services/booking.service';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit {

  bookings: Array<any>;
  totalRecord: number;
  page: number = 1;

  currentBooking: any;
  bookingObject: any;

  companies: any;
  services: any;

  searchText: string;
  constructor(private _bookingService: BookingService, private _companyService: CompanyService, private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getBookings();
    //unselect the saved booking in the service
    this._bookingService.changeBooking('default');
  }

  getBookings() {
    this._bookingService.listBookings()
    .subscribe(data => {
      this.bookings = data;
      this.totalRecord = data.length;
      this.getCompanies();
    });
  }

  getCompanies() {
    this._companyService.listCompanies()
    .subscribe(data => {
      this.companies = data;
      this.getServices();
    })
  }

  getServices() {
    this._serviceService.listServicesByUser()
    .subscribe(data => {
      this.services = data;
      this.bookings.forEach(booking => {

        //add companyName attribute to each booking
        let company = this.companies.find(company => booking.companyId === company.id);
        if(company) {
          booking.companyName = company.name;
        } else {
          booking.companyName = "--";
        }

        //add serviceName attribute to each booking
        let service = this.services.find(service => booking.serviceId === service.sk);
        if(service) {
          booking.serviceName = service.name;
        } else {
          booking.serviceName = "--";
        }
      });
    })
  }

  selectBooking(event: any, booking: any) {
    this.bookingObject = booking;
    this.currentBooking = booking.id;
    //save the selected booking in the service
    this._bookingService.changeBooking(this.bookingObject);
  }
}
