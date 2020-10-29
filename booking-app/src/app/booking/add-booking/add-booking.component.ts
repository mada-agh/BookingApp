import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { BookingService } from 'src/app/common/services/booking.service';
import { CompanyService } from 'src/app/common/services/company.service';
import { ServiceService } from 'src/app/common/services/service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  companies: any;
  services: any;

  companyId: string;
  serviceId: string;
  service: any = null; //selected service
  companyServices: any; //services of the selected company

  emailPattern = `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`;
  phonePattern = `^(\\+\\d{1,3}[- ]?)?\\d{10}$`;

  weekDays = ["sunday", "monday", "tuesday", "wednesday","thursday", "friday", "saturday"];
  minDate = new Date();

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
  constructor(private fb: FormBuilder, private _companyService: CompanyService, private _serviceService: ServiceService,
    private _bookingService: BookingService) { }

  ngOnInit(): void {
    this._companyService.listCompanies()
    .subscribe(data => this.companies = data);
    this._serviceService.listServicesByUser()
    .subscribe(data => this.services = data);
  }

  bookingForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    companyId: [''],
    serviceId: [''],
    slot: this.fb.group({
      date: [new Date(), [Validators.required, this.availableDate()]],
      startHour: ['', [Validators.required, this.availableHour()]],
      endHour: [''],
      day: ['']
    })
  });

  onSubmit() {
    this.bookingForm.controls.companyId.setValue(this.companyId);
    this.bookingForm.controls.serviceId.setValue(this.serviceId);

    this._bookingService.addBooking(this.bookingForm.value)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );

    this.bookingForm.reset();
    this.companyId = null;
    this.serviceId = null;
    this.companyServices = [];
    this.service = null;
  }

  changeCompany(event) {
    this.companyId = event;
    this.companyServices = this.services.filter(service => service.id === this.companyId);
  }

  changeService(value) {
    this.serviceId = value;
    this.service = this.companyServices.find(service => service.sk === this.serviceId);
  }

  //date control validator
  availableDate(): ValidatorFn { 
    return (control: AbstractControl):{[key: string]: any} | null => {
      const date = new Date();
      date.setFullYear(control.value.year);
      date.setMonth(control.value.month - 1);
      date.setDate(control.value.day);

      //check if the day of the selected date is available for the selected service and if it's not in the past
      if(this.service && date) {
        if(this.service.aviability.every(el => this.weekDays.indexOf(el.day) != date.getDay()) == true || date < this.minDate){
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

  //startHour control validator
  availableHour(): ValidatorFn {
    return (control: AbstractControl):{[key: string]: any} | null => {
      if(control.value && this.service && this.date.valid) {
        const date = new Date(this.date.value);
        const currentMinutes = this.minutesOfDay(control.value);
        const workingDay = this.service.aviability.find(el => this.weekDays.indexOf(el.day) == date.getDay());

        //check if selected hour is between endHour and startHour of the selected service
        if(currentMinutes > this.minutesOfDay(workingDay.endHour) - this.service.duration || currentMinutes < this.minutesOfDay(workingDay.startHour)) {
          return {
            invalidHour: {value: control.value}
          }
        }

        //set endHour control
        const newHour = moment(control.value, "HH:mm").add(this.service.duration, 'minutes').format('HH:mm');
        this.bookingForm.get('slot.endHour').patchValue(newHour);
      }
      return null;
    }
  }

  //calculates total minutes of a time
  minutesOfDay(time): number{
    const hour = time.split(':').map(element => +element);
    return hour[0] * 60 + hour[1];
  }
}
