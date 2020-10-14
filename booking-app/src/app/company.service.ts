import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  _url = 'https://8uf0rw0uh5.execute-api.eu-central-1.amazonaws.com/dev/bookingApp/companies/';
  userId = "USER020685c0-c050-11ea-ab6b-3dea722243ca";
  constructor(private _http: HttpClient) { }

  private companyObjectSource = new BehaviorSubject('default');
  currentCompanyObject = this.companyObjectSource.asObservable();


  changeCompany(id: string) {
    this.companyObjectSource.next(id);
  }

  listCompanies(): Observable<any> {
    return this._http.get<any>(this._url + this.userId);
  }

  addCompany(companyData) {
    companyData.userId = this.userId;
    return this._http.post<any>(this._url, companyData);
  }

  updateCompany(companyData: any, id: string): Observable<any> {
    companyData.userId = this.userId;
    return this._http.put<any>(this._url + `${id}/${id}`, companyData);
      // .pipe(
      //   catchError(this.handleError('updateCompany', company))
      // );
  }

  deleteCompany(id: string): Observable<{}> {
    return this._http.delete(this._url + `${id}`);
  }

}
