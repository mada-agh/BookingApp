import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import { CompanyService } from '../company.service';
import { requiredFileType } from '../shared/image.validator';
import { ICompany } from '../company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddCompanyComponent,
      multi: true
    }
  ]
})
export class AddCompanyComponent implements OnInit {

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

  companyForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    logoLink: ['', [Validators.required, requiredFileType(['png', 'jpg', 'jpeg'])]]
  });
  constructor(private fb: FormBuilder, private _companyService: CompanyService) { }

  ngOnInit(): void {
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
    form.logoLink = <ArrayBuffer>this.url;
    this._companyService.addCompany(form)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error)
    );
    this.companyForm.reset();
  }
  
}
