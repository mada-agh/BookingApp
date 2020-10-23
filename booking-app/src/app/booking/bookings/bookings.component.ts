import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/common/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookingObject: any;
  constructor(private _bookingService: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._bookingService.currentBookingObject.subscribe(res => this.bookingObject = res);
  }

  addBooking() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  editBooking() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
