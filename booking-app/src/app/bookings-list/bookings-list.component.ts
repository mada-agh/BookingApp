import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { CompanyService } from '../company.service';
import { ServiceService } from '../service.service';

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
  bookingeObject: any;

  companies: any;
  services: any;
  constructor(private _bookingService: BookingService, private _companyService: CompanyService, private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getBookings();
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
        let company = this.companies.find(company => booking.companyId === company.id);
        if(company) {
          booking.companyName = company.name;
        } else {
          booking.companyName = "--";
        }
        let service = this.services.find(service => booking.serviceId === service.sk);
        if(service) {
          booking.serviceName = service.name;
        } else {
          booking.serviceName = "--";
        }
      });
    })
  }

  // {"phoneNumber":"07412345678",
  // "companyId":"COMPANYce558970-ca53-11ea-998c-27be5c65dedf",
  // "userId":"USERfcb64310-c830-11ea-86a3-1bad2ac8da52",
  // "serviceId":"SERVICESa4c2b480-ca66-11ea-9b42-b55dcdbc10a2",
  // "sk":"BOOKING75049561-d0c9-11ea-befa-dd20ee31066b",
  // "slot":{"date":"2020-07-29T21:00:00.000Z","endHour":"18:30","day":"THU","startHour":"17:60"},
  // "id":"BOOKING75049560-d0c9-11ea-befa-dd20ee31066b",
  // "email":"mariancristivrabie@gmail.com",
  // "name":"Vrabie Irina Stefania"}
}
