import { PipeTransform, Pipe } from '@angular/core';
import { Video } from './video.model';
import { Customer } from '../customers/customer.model';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
  transform (customers: Customer[]): Customer[] {
    if (!customers) {
      return customers;
    }
    return customers.filter(customer =>
      customer.status !== 'Expired');
  }
}
