import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from './company.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  companyObject: any;
  _url = 'https://8uf0rw0uh5.execute-api.eu-central-1.amazonaws.com/dev/bookingApp/';
  userId = "USER020685c0-c050-11ea-ab6b-3dea722243ca";
  constructor(private _http: HttpClient) { }

  addService(serviceData: any, companyId: string) {
    serviceData.userId = this.userId;
    return this._http.post<any>(this._url + `services/${companyId}`, serviceData);
  }

  listServicesByUser(): Observable<any> {
    return this._http.get<any>(this._url + `allservices/${this.userId}`);
  }
}
