import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateService } from '../validate.service';
import { Customer } from '../customer-list/Model/Customer';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  regexp: any;
  panData: any;
  customerList: Array<Customer> = [];
  isCustomerRegistration = false;
  isAuthenticate = false;
  panloader = false;
  postcodeloader = false;
  CustomerRegistration: FormGroup = new FormGroup({});
  LoginForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private validate: ValidateService, private router: Router) { }
  ngOnInit(): void {
    this.CustomerRegistration = this.fb.group({
      txtpan: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      txtfullname: ['', [Validators.required, Validators.maxLength(140), Validators.pattern('^[a-zA-Z ]+$')]],
      txtemail: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      txtnumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      txtpostcode: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9]+$')]],
      txtaddress1: ['', [Validators.required]],
      txtaddress2: [''],
      txtstate: [],
      txtcity: []
    })
    this.LoginForm = this.fb.group({
      loginemail: ['', [Validators.required, Validators.email]],
      loginpassword: ['', [Validators.required]]
    });
    this.router.navigate(['/']);
  }
  logout() {
    localStorage.removeItem('token');
  }
  LoginUser() {
    if (this.LoginForm.value.loginemail == 'pixel6+100@gmail.com' && this.LoginForm.value.loginpassword == 'pass123') {
      this.isAuthenticate = true;
      this.isCustomerRegistration = true;
      localStorage.setItem('token', JSON.stringify(this.LoginForm.value.loginemail));
      this.router.navigate(['/customerList']);
    }

  }
  registerCustomer() {
    alert('Registration Successfull');
    let customObj = new Customer();
    customObj.pan = this.CustomerRegistration.value.txtpan;
    customObj.fullname = this.CustomerRegistration.value.txtfullname;
    customObj.email = this.CustomerRegistration.value.txtemail;
    customObj.mobilenumber = this.CustomerRegistration.value.txtnumber;
    customObj.address1 = this.CustomerRegistration.value.txtaddress1;
    customObj.address2 = this.CustomerRegistration.value.txtaddress2;
    customObj.postcode = this.CustomerRegistration.value.txtpostcode;
    customObj.state = this.CustomerRegistration.value.txtstate;
    customObj.city = this.CustomerRegistration.value.txtcity;
    var data = JSON.parse(localStorage.getItem('customerList')!);
    if (data) {
      console.log('adding second', data);
      this.customerList = JSON.parse(localStorage.getItem('customerList')!);
      this.customerList.push(customObj);
      localStorage.setItem('customerList', JSON.stringify(this.customerList));
    }
    else {
      console.log('adding first', data);
      this.customerList.push(customObj);
      localStorage.setItem('customerList', JSON.stringify(this.customerList));
    }
    this.customerList = JSON.parse(localStorage.getItem('customerList')!);
    console.log("after adding new customer : ", this.customerList);
    this.CustomerRegistration.reset();
    this.isCustomerRegistration = true;
    this.router.navigate(['/customerList']);
  }
  AddCustomer() {
    this.isCustomerRegistration = false;
    this.router.navigate(['/']);
  }
  getPan(value: any) {
    var regexp = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}');
    console.log(value);
    if (regexp.test(value)) {
      this.panloader = true;
      this.validate.getPan(value).subscribe(res => {
        console.log('Pan Valid', res);
        this.panData = JSON.parse(JSON.stringify(res));
        this.panloader = false;
        console.log(this.panData);
        this.CustomerRegistration.patchValue({
          txtfullname: this.panData.fullName
        })
      },
        error => {
          console.log(error);
        })
    }
  }
  getPostCode(value: any) {
    console.log(value);
    if (value.length == 6) {
      this.postcodeloader = true;
      this.validate.getPostCode(value).subscribe(res => {
        this.postcodeloader = false;
        var objectStringArray = (new Function("return [" + res + "];")());
        this.CustomerRegistration.patchValue({
          txtcity: objectStringArray[0].city[0].name,
          txtstate: objectStringArray[0].state[0].name
        })
      })
    }
  }
}
