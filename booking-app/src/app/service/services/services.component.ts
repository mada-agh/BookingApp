import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  serviceObject: any;
  companies: any;
  constructor(private route: ActivatedRoute, private router: Router, private _serviceService: ServiceService, private _companyService: CompanyService) { }

  ngOnInit(): void {
    this._serviceService.currentServiceObject.subscribe(res => this.serviceObject = res);
    this._companyService.listCompanies()
    .subscribe(data => {
      this.companies = data;
    });
  }

  editService() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  selectCompany(event: any, company: any) {
    this._companyService.changeCompany(company);
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}
