import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/common/services/service.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  services: Array<any>;
  totalRecord: number;
  page: number = 1;

  currentService: any;
  serviceObject: any;
  searchText: string;

  constructor(private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getServicesByUser();
    this._serviceService.changeService('default');
  }

  getServicesByUser() {
    this._serviceService.listServicesByUser()
    .subscribe(data => {
      this.services = data;
      this.totalRecord = data.length;
    });
  }

  selectService(event: any, service: any) {
    this.serviceObject = service;
    this.currentService = service.sk;
    this._serviceService.changeService(this.serviceObject);
  }
}
