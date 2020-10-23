import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {

  id: string;
  service: any;
  company: any;
  constructor(private route: ActivatedRoute, private _serviceService: ServiceService, private _companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this._serviceService.listServicesByUser()
      .subscribe(services => {
        this.service = services.find(service => service.sk === this.id);
        console.log(this.service);
        this._companyService.listCompanies()
        .subscribe(companies => {
          this.company = companies.find(company => this.service.id === company.id);
          console.log(this.company);
        });
      });
   });
  }

}
