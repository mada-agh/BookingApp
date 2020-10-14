
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CompanyService } from '../company.service';
import { requiredFileType } from '../shared/image.validator';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditCompanyComponent,
      multi: true
    }
  ]
})
export class EditCompanyComponent implements OnInit {

  companyForm: FormGroup;
  companyObject: any;

  url: string | ArrayBuffer;
  defaultUrl = "./../../assets/defaultImg.png";

  get name() {
    return this.companyForm.get('name');
  }

  get description() {
    return this.companyForm.get('description');
  }

  get logoLink() {
    return this.companyForm.get('logoLink');
  }

  constructor(private fb: FormBuilder, private _companyService: CompanyService) { }

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
    this.setForm();
  }

  private setForm() {
      this.companyForm = this.fb.group({
        name: [this.companyObject.name, [Validators.required, Validators.minLength(3)]],
        description: [this.companyObject.description, [Validators.required, Validators.minLength(3)]],
        logoLink: [this.companyObject.logoLink, [Validators.required, requiredFileType(['png', 'jpg', 'jpeg'])]]
      })
    
  }

  
  file: File | null = null;

  onChange(event) {
    const file = event.srcElement.files[0];
    this.file = file;
    var reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
      }
    }
  }

  onSubmit() {
    var form = this.companyForm.value;
    form.logo = <ArrayBuffer>this.url;
    this._companyService.updateCompany(form, this.companyObject.id)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );
    this.companyForm.reset();
  }
}
