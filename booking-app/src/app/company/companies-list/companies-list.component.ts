import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/common/services/company.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companies: Array<any>;
  totalRecord: number;
  page: number = 1;

  currentCompany: any;
  companyObject: any;

  searchText: string;

  constructor(private _companyService: CompanyService) {
    this.companies = new Array<any>();
   }

  ngOnInit(): void {
    this.getCompanies();
    //unselect de saved company in the service
    this._companyService.changeCompany('default');
  }

  getCompanies() {
    this._companyService.listCompanies()
    .subscribe(data => {
      this.companies = data;
      this.totalRecord = data.length;
    });
  }

  selectCompany(event: any, company: any) {
    this.companyObject = company;
    this.currentCompany = company.id;
    //save the selected company in the service
    this._companyService.changeCompany(this.companyObject);
  }
}
