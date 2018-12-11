import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../customer.model';
import { Subscription } from 'rxjs';
import { CustomersService } from '../customers.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PageEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  isLoading = false;
  private customersSub: Subscription;
  private authStatusSub: Subscription;
  adminIsAuthenticated = false;
  searchText: string;

  // For pagination:
  totalCustomers = 0;
  customersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public customersService: CustomersService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.customersService.getCustomers(this.customersPerPage, this.currentPage);
    this.customersSub = this.customersService.getCustomerUpdatedListener()
      .subscribe((customerData: {customers: Customer[], customerCount: number}) => {
        this.isLoading = false;
        this.totalCustomers = customerData.customerCount;
        this.customers = customerData.customers;
      });
      this.adminIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.adminIsAuthenticated = isAuthenticated;
        });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1; // pageIndex starts with 0, in backend it starts with 1
    this.customersPerPage = pageData.pageSize;
    this.customersService.getCustomers(this.customersPerPage, this.currentPage);
  }

  onDelete(customerId: string) {
    this.isLoading = true;
    this.customersService.deleteCustomer(customerId).subscribe(() => {
      this.customersService.getCustomers(this.customersPerPage, 1);
    });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
