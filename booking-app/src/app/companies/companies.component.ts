import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companyObject: any;
  constructor(private route: ActivatedRoute, private router: Router, private _companyService: CompanyService) { }

  ngOnInit(): void {
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
