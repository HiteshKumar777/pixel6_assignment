import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Customer } from '../customer-list/Model/Customer';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Array<Customer> = [];
  EditCustomer: FormGroup = new FormGroup({});
  isAuthenticate = false;
  loginEmal: any;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.EditCustomer = this.fb.group({
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
    this.isAuthenticate = false;
    console.log('authenication is', this.isAuthenticate);
    this.customerList = JSON.parse(localStorage.getItem('customerList')!);
    this.loginEmal = JSON.parse(localStorage.getItem('token')!);
    console.log('login the admin', this.loginEmal);
    if (this.loginEmal) {
      this.isAuthenticate = true;
      console.log('authenication is', this.isAuthenticate);
    }
  }
  editCustomer(editCustomerData: any) {
    console.log(editCustomerData);
    this.EditCustomer.patchValue({
      txtpan: editCustomerData.pan,
      txtfullname: editCustomerData.fullname,
      txtemail: editCustomerData.email,
      txtnumber: editCustomerData.mobilenumber,
      txtpostcode: editCustomerData.postcode,
      txtaddress1: editCustomerData.address1,
      txtaddress2: editCustomerData.address2,
      txtstate: editCustomerData.state,
      txtcity: editCustomerData.city
    })
  }
  updateCustomer() {
    console.log("email", this.EditCustomer.value.txtemail);
    for (var i = 0; i < this.customerList.length; i++) {
      if (this.customerList[i].email == this.EditCustomer.value.txtemail) {
        this.customerList[i].pan = this.EditCustomer.value.txtpan;
        this.customerList[i].fullname = this.EditCustomer.value.txtfullname;
        this.customerList[i].email = this.EditCustomer.value.txtemail;
        this.customerList[i].mobilenumber = this.EditCustomer.value.txtnumber;
        this.customerList[i].postcode = this.EditCustomer.value.txtpostcode;
        this.customerList[i].address1 = this.EditCustomer.value.txtaddress1;
        this.customerList[i].state = this.EditCustomer.value.txtstate;
        this.customerList[i].city = this.EditCustomer.value.txtcity;
        localStorage.setItem('customerList', JSON.stringify(this.customerList));
        console.log("updated data", JSON.parse(localStorage.getItem('customerList')!));
      }
    }
  }
  deleteCustomer(deleteCustomer: any) {
    console.log('index of the element', deleteCustomer);
    this.customerList.splice(deleteCustomer, 1);
    console.log(this.customerList);
    localStorage.setItem('customerList', JSON.stringify(this.customerList));
    console.log("delete data", JSON.parse(localStorage.getItem('customerList')!));
    // for(var i=0;i<this.customerList.length;i++){
    //  if(this.customerList[i].txtemail == deleteCustomer.txtemail){
    //    this.customerList.splice(i,1);
    //    localStorage.setItem('customerList', JSON.stringify(this.customerList));
    //  }
    // }
    // this.customerList = JSON.parse(localStorage.getItem('customerList')!);
    // console.log(this.customerList);
  }
}
