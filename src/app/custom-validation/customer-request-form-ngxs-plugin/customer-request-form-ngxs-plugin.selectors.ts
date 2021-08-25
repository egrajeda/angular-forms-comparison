import { Selector } from '@ngxs/store';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import {
  CustomerRequestForm,
  CustomerRequestFormNgxsPluginState,
  CustomerRequestFormNgxsPluginStateModel,
} from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.state';

export class CustomerRequestFormNgxsPluginSelectors {
  @Selector([CustomerRequestFormNgxsPluginState])
  static form({
    customerRequestForm: form,
  }: CustomerRequestFormNgxsPluginStateModel): CustomerRequestForm {
    return form;
  }

  @Selector([CustomerRequestFormNgxsPluginSelectors.form])
  static model({ model }: CustomerRequestForm): CustomerRequest {
    return model;
  }

  @Selector([CustomerRequestFormNgxsPluginState])
  static loading({
    loading,
  }: CustomerRequestFormNgxsPluginStateModel): boolean {
    return loading;
  }
}
