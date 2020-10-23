import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';

function validateSize(arr: FormArray) {
  return arr.length >= 7 ? {
    invalidSize: true
  } : null;
}

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  companyObject: any;
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
  constructor(private fb: FormBuilder, private _companyService: CompanyService, private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
  }

  serviceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    aviability: this.fb.array([
      this.fb.group({
        day: ['', [Validators.required]],
        startHour: ['', [Validators.required]],
        endHour: ['', [Validators.required]]
      })
    ], validateSize),
    duration: [10, [Validators.required, Validators.min(10), Validators.max(480)]],
    serviceSpace: [1, [Validators.required, Validators.min(1)]],
    servicePrice: [1, [Validators.required, Validators.min(1)]]
  });

  onSubmit() {
    console.log(this.companyObject);
    this._serviceService.addService(this.serviceForm.value, this.companyObject.id)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );
    this.serviceForm.reset();
  }

  addDay() {
    this.aviability.push(this.fb.group({
      day: ['', [Validators.required]],
      startHour: ['', [Validators.required]],
      endHour: ['', [Validators.required]]
    }));
  }
 
}
