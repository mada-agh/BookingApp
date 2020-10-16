import { Component } from '@angular/core';
import { CompanyService } from './company.service';
import { ServiceService } from './service.service';

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
  
  constructor(private _companyService: CompanyService, private _serviceService: ServiceService) {}

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
    this._serviceService.currentServiceObject.subscribe(res => this.serviceObject = res);
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
}
