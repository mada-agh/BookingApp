import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/common/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companyObject: any;
  constructor(private route: ActivatedRoute, private router: Router, private _companyService: CompanyService) { }

  ngOnInit(): void {
    //get the selected company from the service
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
  }

  addCompany() {
    this.router.navigate(['add'], {relativeTo: this.route});
    this._companyService.changeCompany('default');
  }

  editCompany() {
      this.router.navigate(['edit'], {relativeTo: this.route});
  }
  
  addService() {
    this.router.navigate(['/services/add']);
  }
}
