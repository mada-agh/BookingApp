import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  id: string;
  company: any;
  services: any;
  constructor(private route: ActivatedRoute, private _companyService: CompanyService, private _serviceService: ServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this._companyService.listCompanies()
      .subscribe(companies => {
        this.company = companies.find(company => company.id === this.id);
        this._serviceService.listServicesByCompany(this.id)
        .subscribe(services => this.services = services);
      });
   });
  }

  selectService($event, service){
    this.router.navigate([`/view-service/${service.sk}`]);
  }
}
