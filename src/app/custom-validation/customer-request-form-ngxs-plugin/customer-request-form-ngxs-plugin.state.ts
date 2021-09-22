import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { CustomerRequestFormNgxsPlugin } from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.actions';
import { CustomerRequestService } from 'src/app/custom-validation/customer-request.service';

export interface CustomerRequestForm {
  model: CustomerRequest;
  status: string;
  dirty: boolean;
}

export interface CustomerRequestFormNgxsPluginStateModel {
  customerRequestForm: CustomerRequestForm;
  loading: boolean;
}

@State<CustomerRequestFormNgxsPluginStateModel>({
  name: 'customerRequestFormNgxsPlugin',
  defaults: {
    customerRequestForm: {
      model: {
        id: 0,
        customerId: '',
        date: new Date(),
        message: '',
      },
      status: 'INVALID',
      dirty: false,
    },
    loading: false,
  },
})
@Injectable()
export class CustomerRequestFormNgxsPluginState {
  constructor(
    private readonly customerRequestService: CustomerRequestService
  ) {}

  @Action(CustomerRequestFormNgxsPlugin.Submit)
  submit(context: StateContext<CustomerRequestFormNgxsPluginStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.customerRequestService
      .save(state.customerRequestForm.model)
      .pipe(
        tap(({ id }) =>
          context.patchState({
            customerRequestForm: {
              ...state.customerRequestForm,
              model: {
                ...state.customerRequestForm.model,
                id,
              },
            },
          })
        ),
        finalize(() =>
          context.patchState({
            loading: false,
          })
        )
      );
  }
}
