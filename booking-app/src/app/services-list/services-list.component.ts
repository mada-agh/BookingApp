import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

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

  constructor(private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getServicesByUser();
    console.log(this.services);
  }

  getServicesByUser() {
    this._serviceService.listServicesByUser()
    .subscribe(data => {
      console.log(data);
      this.services = data;
      this.totalRecord = data.length;
    });
  }
}
