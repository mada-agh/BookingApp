import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  _url = 'https://8uf0rw0uh5.execute-api.eu-central-1.amazonaws.com/dev/bookingApp/bookings/';
  userId = "USER020685c0-c050-11ea-ab6b-3dea722243ca";
  constructor(private _http: HttpClient) { }

  listBookings(): Observable<any> {
    return this._http.get<any>(this._url);
  }
}
