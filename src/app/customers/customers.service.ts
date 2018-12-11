import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Customer } from './customer.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customers: Customer[] = [];
  private customersUpdated = new Subject<{customers: Customer[], customerCount: number}>();


  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(customersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${customersPerPage}&page=${
      currentPage}`;
    this.http
      .get<{ message: string; customers: any, maxCustomers: number }>('http://localhost:3000/api/customers' + queryParams)
      .pipe(
        map(customerData => {
          return {customers: customerData.customers.map(customer => {
            return {
              firstname: customer.firstname,
              lastname: customer.lastname,
              address: customer.address,
              city: customer.city,
              phone: customer.phone,
              status: customer.status,
              id: customer._id
            };
          }),
          maxCustomers: customerData.maxCustomers
        };
        }))
      .subscribe(transformedCustomersData => {
        this.customers = transformedCustomersData.customers;
        this.customersUpdated.next({
          customers: [...this.customers],
          customerCount: transformedCustomersData.maxCustomers
        });
      });
  }

  getCustomerList() {
    return this.customers;
  }

  getCustomerUpdatedListener() {
    return this.customersUpdated.asObservable();
  }

  getCustomer(id: string) {
    return this.http.get<{
      _id: string;
      firstname: string;
      lastname: string;
      address: string;
      city: string;
      phone: string;
      status: string;
    }>(
      'http://localhost:3000/api/customers/' + id
    );
  }

  addCustomer(firstname: string, lastname: string, address: string, city: string,
    phone: string, status: string) {
    const customer: Customer = {
      id: null,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      phone: phone,
      status: status
    };
    this.http
      .post<{ message: string; customer: Customer }>(
        'http://localhost:3000/api/customers',
        customer
      )
      .subscribe(responseData => {
        this.router.navigate(['/customers']);
      });
  }

  updateCustomer(id: string, firstname: string, lastname: string, address: string, city: string,
    phone: string, status: string) {
    const customer: Customer = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      phone: phone,
      status: status
    };
    this.http
      .put('http://localhost:3000/api/customers/' + id, customer)
      .subscribe(response => {
        this.router.navigate(['/customers']);
      });
  }

  deleteCustomer(customerId: string) {
    return this.http
      .delete('http://localhost:3000/api/customers/' + customerId);
  }
}
