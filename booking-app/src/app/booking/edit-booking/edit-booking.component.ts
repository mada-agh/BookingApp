import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/common/services/booking.service';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  companyId: string;
  serviceId: string;

  bookingForm: FormGroup;
  bookingObject: any;

  service: any = null;
  companyServices: any;
  companies: any;
  services: any;

  emailPattern = `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
  phonePattern = `^(\\+\\d{1,3}[- ]?)?\\d{10}$`;

  minDate = formatDate(new Date(), 'dd.MM.yyyy', 'en');

  weekDays = ["sunday", "monday", "tuesday", "wednesday","thursday", "friday", "saturday"];

  get name() {
    return this.bookingForm.get('name');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get phoneNumber() {
    return this.bookingForm.get('phoneNumber');
  }
  
  get date() {
    return this.bookingForm.get('slot.date');
  }

  get startHour() {
    return this.bookingForm.get('slot.startHour');
  }

  constructor(private _bookingService: BookingService, private fb: FormBuilder, private router: Router, 
    private _companyService: CompanyService, private _serviceService: ServiceService) { }

  ngOnInit(): void {
    this._bookingService.currentBookingObject.subscribe(res => {
      this.bookingObject = res;
      if(this.bookingObject === 'default') {
        this.router.navigate(['/bookings/list']);
      }
      this.companyId = this.bookingObject.companyId;
      this.serviceId = this.bookingObject.serviceId; 
      
      this._companyService.listCompanies()
      .subscribe(data => this.companies = data);
      this._serviceService.listServicesByUser()
      .subscribe(data => {
        this.services = data;

        this.setForm();
        this.companyServices = this.services.filter(service => service.id === this.companyId);
        this.service = this.companyServices.find(service => service.sk === this.serviceId);
      });
    });
  }

  setForm() {
    this.bookingForm = this.fb.group({
      name: [this.bookingObject.name, [Validators.required, Validators.minLength(3)]],
      email: [this.bookingObject.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneNumber: [this.bookingObject.phoneNumber, [Validators.required, Validators.pattern(this.phonePattern)]],
      companyId: [this.bookingObject.companyId],
      serviceId: [this.bookingObject.serviceId],
      slot: this.fb.group({
        date: [this.bookingObject.slot.date, [Validators.required, this.availableDate()]],
        startHour: [this.bookingObject.slot.startHour, [Validators.required, this.availableHour()]],
        endHour: [this.bookingObject.slot.endHour],
        day: [this.bookingObject.slot.day]
      })
    });
  }

  changeCompany(event) {
    this.companyId = event;
    this.companyServices = this.services.filter(service => service.id === this.companyId);
  }

  changeService(value) {
    this.serviceId = value;
    this.service = this.companyServices.find(service => service.sk === this.serviceId);
  }

  availableDate(): ValidatorFn {
    return (control: AbstractControl):{[key: string]: any} | null => {
      const date = new Date(control.value);
      if(this.service && date) {
        if(this.service.aviability.every(el => this.weekDays.indexOf(el.day) != date.getDay()) == true){
          return {
            invalidDate: {value: date}
          }
        }
        this.bookingForm.get('slot.day').patchValue(this.weekDays[date.getDay()]);
      } else {
          return null;
      }
    }
  }

  availableHour(): ValidatorFn {
    return (control: AbstractControl):{[key: string]: any} | null => {
      if(control.value && this.service && this.date.valid) {
        const date = new Date(this.date.value);
        const currentMinutes = this.minutesOfDay(control.value);
        const workingDay = this.service.aviability.find(el => this.weekDays.indexOf(el.day) == date.getDay());
        if(currentMinutes > this.minutesOfDay(workingDay.endHour) - this.service.duration || currentMinutes < this.minutesOfDay(workingDay.startHour)) {
          return {
            invalidHour: {value: control.value}
          }
        }
        const newHour = moment(control.value, "HH:mm").add(this.service.duration, 'minutes').format('HH:mm');
        this.bookingForm.get('slot.endHour').patchValue(newHour);
      }
      return null;
    }
  }

  minutesOfDay(time): number{
    const hour = time.split(':').map(element => +element);
    return hour[0] * 60 + hour[1];
  }

  onSubmit() {
    this.bookingForm.controls.companyId.setValue(this.companyId);
    this.bookingForm.controls.serviceId.setValue(this.serviceId);
    this._bookingService.editBooking(this.bookingForm.value, this.bookingObject.id, this.bookingObject.sk)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );
    this._bookingService.changeBooking('default');
    this.router.navigate(['/bookings/list']);
  }

}
