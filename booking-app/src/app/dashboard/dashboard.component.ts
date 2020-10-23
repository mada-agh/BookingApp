import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../common/services/company.service';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  companies: any;
  services: any;
  constructor(private _companyService: CompanyService, private _serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this._companyService.listCompanies()
    .subscribe(data => {
      this.companies = data;
      this._serviceService.listServicesByUser()
      .subscribe(data => {
        this.services = data;
        for(let i = 0; i < 4 && i < this.services.length; i++) {
         this.services[i].company = this.companies.find(company => this.services[i].id === company.id).name;
       }
    });
    });
  }

  selectCompany(event, company) {
      this.router.navigate([`/view-company/${company.id}`]);
  }

  selectService(event, service) {
    this.router.navigate([`/view-service/${service.sk}`]);
  }

  makeBooking() {
    this.router.navigate(['/bookings/add']);
  }

}
