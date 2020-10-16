import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


function validateSize(arr: FormArray) {
  return arr.length >= 7 ? {
    invalidSize: true
  } : null;
}


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  serviceObject: any;
  serviceForm: FormGroup;
  days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

  get name() {
    return this.serviceForm.get('name');
  }

  get description() {
    return this.serviceForm.get('description');
  }

  get serviceSpace() {
    return this.serviceForm.get('serviceSpace');
  }

  get servicePrice() {
    return this.serviceForm.get('servicePrice');
  }

  get duration() {
    return this.serviceForm.get('duration');
  }

  get aviability() {
    return this.serviceForm.get('aviability') as FormArray;
  }
  constructor(private fb: FormBuilder, private _serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this._serviceService.currentServiceObject.subscribe(res => this.serviceObject = res);
    if(this.serviceObject === 'default') {
      this.router.navigate(['/services/list-user']);
    }
    this.setForm();
  }

  private setForm() {
    this.serviceForm = this.fb.group({
      name: [this.serviceObject.name, [Validators.required, Validators.minLength(3)]],
      description: [this.serviceObject.description, [Validators.required, Validators.minLength(3)]],
      aviability: this.fb.array(this.serviceObject.aviability.map(element => {
        return this.fb.group({
          day: [element.day, [Validators.required]],
          startHour: [element.startHour, [Validators.required]],
          endHour: [element.endHour, [Validators.required]]
        })
      }), validateSize),
      duration: [this.serviceObject.duration, [Validators.required, Validators.min(10), Validators.max(480)]],
      serviceSpace: [this.serviceObject.serviceSpace, [Validators.required, Validators.min(1)]],
      servicePrice: [this.serviceObject.servicePrice, [Validators.required, Validators.min(1)]]
    });
  }

  addDay() {
    this.aviability.push(this.fb.group({
      day: ['', [Validators.required]],
      startHour: ['', [Validators.required]],
      endHour: ['', [Validators.required]]
    }));
  }

  onSubmit() {
    this._serviceService.editService(this.serviceForm.value, this.serviceObject)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );
    this.router.navigate(['/services/list-user']);
  }
}
