import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { CustomerRequestFormNgxs } from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.actions';
import { CustomerRequestService } from 'src/app/custom-validation/customer-request.service';

export interface CustomerRequestFormNgxsStateModel {
  customerRequest: CustomerRequest;
  loading: boolean;
}

@State<CustomerRequestFormNgxsStateModel>({
  name: 'customerRequestFormNgxs',
  defaults: {
    customerRequest: {
      id: 0,
      customerId: '',
      date: new Date(),
      message: '',
    },
    loading: false,
  },
})
@Injectable()
export class CustomerRequestFormNgxsState {
  constructor(
    private readonly customerRequestService: CustomerRequestService
  ) {}

  @Action(CustomerRequestFormNgxs.SetCustomerId)
  setCustomerId(
    context: StateContext<CustomerRequestFormNgxsStateModel>,
    { customerId }: CustomerRequestFormNgxs.SetCustomerId
  ) {
    const state = context.getState();
    context.patchState({
      customerRequest: { ...state.customerRequest, customerId },
    });
  }

  @Action(CustomerRequestFormNgxs.SetDate)
  setDate(
    context: StateContext<CustomerRequestFormNgxsStateModel>,
    { date }: CustomerRequestFormNgxs.SetDate
  ) {
    const state = context.getState();
    context.patchState({
      customerRequest: { ...state.customerRequest, date },
    });
  }

  @Action(CustomerRequestFormNgxs.SetMessage)
  setMessage(
    context: StateContext<CustomerRequestFormNgxsStateModel>,
    { message }: CustomerRequestFormNgxs.SetMessage
  ) {
    const state = context.getState();
    context.patchState({
      customerRequest: { ...state.customerRequest, message },
    });
  }

  @Action(CustomerRequestFormNgxs.Submit)
  submit(context: StateContext<CustomerRequestFormNgxsStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.customerRequestService.save(state.customerRequest).pipe(
      tap(({ id }) =>
        context.patchState({
          customerRequest: {
            ...state.customerRequest,
            id,
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
