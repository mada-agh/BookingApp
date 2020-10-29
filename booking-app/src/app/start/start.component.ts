import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navigateToDashboard(): void {
    window.location.assign(environment.loginURL);
  }

  register() {
    window.location.assign(environment.signupURL);
  }
}
