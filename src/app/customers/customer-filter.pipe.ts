import { PipeTransform, Pipe } from '@angular/core';
import { Customer } from './customer.model';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {
  transform (customers: Customer[], searchText: string): Customer[] {
    if (!customers || !searchText) {
      return customers;
    }
    return customers.filter(customer =>
      customer.firstname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      customer.lastname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
