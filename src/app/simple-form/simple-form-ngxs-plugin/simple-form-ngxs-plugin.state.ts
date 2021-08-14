import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import { SimpleFormNgxsPlugin } from 'src/app/simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.actions';
import { SimpleFormService } from 'src/app/simple-form/simple-form.service';

export interface SimpleFormNgxsPluginForm {
  model: SimpleForm;
  status: string;
  dirty: boolean;
  loading: boolean;
}

export interface SimpleFormNgxsPluginStateModel {
  form: SimpleFormNgxsPluginForm;
}

@State<SimpleFormNgxsPluginStateModel>({
  name: 'simpleFormNgxsPlugin',
  defaults: {
    form: {
      model: {
        id: 0,
        name: '',
        birthdate: new Date(),
        favoriteColor: '',
      },
      status: 'INVALID',
      dirty: false,
      loading: false,
    },
  },
})
@Injectable()
export class SimpleFormNgxsPluginState {
  constructor(private readonly simpleFormService: SimpleFormService) {}

  @Action(SimpleFormNgxsPlugin.Submit)
  submit(context: StateContext<SimpleFormNgxsPluginStateModel>) {
    const state = context.getState();
    context.patchState({
      form: {
        ...state.form,
        loading: true,
      },
    });
    return this.simpleFormService.save(state.form.model).pipe(
      tap(({ id }) =>
        context.patchState({
          form: {
            ...state.form,
            model: {
              ...state.form.model,
              id,
            },
          },
        })
      ),
      finalize(() =>
        context.patchState({
          form: {
            ...state.form,
            loading: false,
          },
        })
      )
    );
  }
}
