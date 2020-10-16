import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  serviceObject: any;
  constructor(private route: ActivatedRoute, private router: Router, private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this._serviceService.currentServiceObject.subscribe(res => this.serviceObject = res);
  }

  editService() {
    this.router.navigate(['edit'], {relativeTo: this.route});
}

}
