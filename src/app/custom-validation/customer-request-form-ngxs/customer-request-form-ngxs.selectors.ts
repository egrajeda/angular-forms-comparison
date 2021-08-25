import { Selector } from '@ngxs/store';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import {
  CustomerRequestFormNgxsState,
  CustomerRequestFormNgxsStateModel,
} from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.state';

export class CustomerRequestFormNgxsSelectors {
  @Selector([CustomerRequestFormNgxsState])
  static customerRequest({
    customerRequest,
  }: CustomerRequestFormNgxsStateModel): CustomerRequest {
    return customerRequest;
  }

  @Selector([CustomerRequestFormNgxsState])
  static loading({ loading }: CustomerRequestFormNgxsStateModel): boolean {
    return loading;
  }
}
