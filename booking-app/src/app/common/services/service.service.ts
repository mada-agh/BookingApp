import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  _url = 'https://8uf0rw0uh5.execute-api.eu-central-1.amazonaws.com/dev/bookingApp/';
  userId = "USER020685c0-c050-11ea-ab6b-3dea722243ca";
  constructor(private _http: HttpClient) { }

  private serviceObjectSource = new BehaviorSubject('default');
  currentServiceObject = this.serviceObjectSource.asObservable();

  changeService(obj: any) {
    this.serviceObjectSource.next(obj);
  }

  addService(serviceData: any, companyId: string) {
    serviceData.userId = this.userId;
    return this._http.post<any>(this._url + `services/${companyId}`, serviceData);
  }

  listServicesByUser(): Observable<any> {
    return this._http.get<any>(this._url + `allservices/${this.userId}`);
  }

  editService(serviceData: any, serviceObject: any) {
    serviceData.userId = serviceObject.userId;
    return this._http.put<any>(this._url + `services/${serviceObject.id}/${serviceObject.sk}`, serviceData);
  }

  deleteService(companyId: string, serviceId: string) {
    return this._http.delete(this._url + `services/${companyId}/${serviceId}`)
  }
  
  listServicesByCompany(companyId: string): Observable<any> {
    return this._http.get<any>(this._url + `services/${companyId}`);
  }
}
