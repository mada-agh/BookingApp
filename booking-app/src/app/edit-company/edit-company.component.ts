
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  file: File | null = null;
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

  constructor(private fb: FormBuilder, private _companyService: CompanyService,private router: Router, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._companyService.currentCompanyObject.subscribe(res => this.companyObject = res);
    if(this.companyObject === 'default') {
      this.router.navigate(['/companies/list']);
    }
    this.setForm();
    this.url = this.logoLink.value;
  }

  private setForm() {
      this.companyForm = this.fb.group({
        name: [this.companyObject.name, [Validators.required, Validators.minLength(3)]],
        description: [this.companyObject.description, [Validators.required, Validators.minLength(3)]],
        logoLink: [this.companyObject.logoLink, [Validators.required, requiredFileType(['png', 'jpg', 'jpeg'])]]
      })
    
  }

  onChange(event) {
    const file = event.srcElement.files[0];
    this.file = file;
    var reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
        this._cdr.markForCheck();
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
    this._companyService.changeCompany('default');
    this.router.navigate(['/companies/list']);
  }
}
