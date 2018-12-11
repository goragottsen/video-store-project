import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  isLoading = false;
  private mode = 'createcustomer';
  private customerId: string;
  customer: Customer;
  form: FormGroup;
  selected = 'Active';

  constructor(public customersService: CustomersService, public route: ActivatedRoute) { }


  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      lastname: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      address: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      city: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      phone: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      status: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.mode = 'editcustomer';
        this.customerId = paramMap.get('customerId');
        this.isLoading = true;
        this.customersService.getCustomer(this.customerId).subscribe(customerData => {
          this.isLoading = false;
          this.customer = {
            id: customerData._id,
            firstname: customerData.firstname,
            lastname: customerData.lastname,
            address: customerData.address,
            city: customerData.city,
            phone: customerData.phone,
            status: customerData.status
          };
          this.form.setValue({
            firstname: this.customer.firstname,
            lastname: this.customer.lastname,
            address: this.customer.address,
            city: this.customer.city,
            phone: this.customer.phone,
            status: this.customer.status
          });
        });
      } else {
        this.mode = 'createcustomer';
        this.customerId = null;
      }
    });

  }

  onSaveCustomer() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'createcustomer') {
      this.customersService.addCustomer(
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.form.value.city,
        this.form.value.phone,
        this.form.value.status
        );
    } else {
      this.customersService.updateCustomer(
        this.customerId,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.form.value.city,
        this.form.value.phone,
        this.form.value.status
      );
    }
    this.form.reset();
  }


}
