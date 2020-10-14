import { Component } from '@angular/core';
import { CompanyService } from './company.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking-app';
  companyObject: any;
  
  constructor(private _companyService: CompanyService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
  }
 
  deleteCompany() {
    //delete company by id
    this._companyService.deleteCompany(this.companyObject.id)
    .subscribe(data => {
      $('exampleModal').modal('hide');
      window.location.reload();
    });
  }
}
