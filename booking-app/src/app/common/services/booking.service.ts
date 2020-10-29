import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  _url = 'https://8uf0rw0uh5.execute-api.eu-central-1.amazonaws.com/dev/bookingApp/bookings/';
  userId = "USER020685c0-c050-11ea-ab6b-3dea722243ca";
  constructor(private _http: HttpClient) { }

  private bookingObjectSource = new BehaviorSubject('default');
  currentBookingObject = this.bookingObjectSource.asObservable();

  changeBooking(obj: any) {
    this.bookingObjectSource.next(obj);
  }

  listBookings(): Observable<any> {
    return this._http.get<any>(this._url);
  }

  addBooking(booking: any) {
    booking.userId = this.userId;
    return this._http.post<any>(this._url, booking);
  }

  deleteBooking(id: string, sk: string) {
    return this._http.delete(this._url + `${id}/${sk}`);
  }

  editBooking(bookingData: any, id: string, sk: string) {
    bookingData.userId = this.userId;
    return this._http.put<any>(this._url + `${id}/${sk}`, bookingData);
  }
}
