import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateStream } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import { SimpleFormNgxs } from 'src/app/simple-form/simple-form-ngxs/simple-form-ngxs.actions';
import { SimpleFormService } from 'src/app/simple-form/simple-form.service';

export interface SimpleFormNgxsStateModel {
  model: SimpleForm;
  loading: boolean;
}

@State<SimpleFormNgxsStateModel>({
  name: 'simpleFormNgxs',
  defaults: {
    model: {
      id: 0,
      name: '',
      birthdate: new Date(),
      favoriteColor: '',
    },
    loading: false,
  },
})
@Injectable()
export class SimpleFormNgxsState {
  constructor(private readonly simpleFormService: SimpleFormService) {}

  @Action(SimpleFormNgxs.SetName)
  setName(
    context: StateContext<SimpleFormNgxsStateModel>,
    { name }: SimpleFormNgxs.SetName
  ) {
    const state = context.getState();
    context.patchState({
      model: { ...state.model, name },
    });
  }

  @Action(SimpleFormNgxs.SetBirthdate)
  setBirthdate(
    context: StateContext<SimpleFormNgxsStateModel>,
    { birthdate }: SimpleFormNgxs.SetBirthdate
  ) {
    const state = context.getState();
    context.patchState({
      model: { ...state.model, birthdate },
    });
  }

  @Action(SimpleFormNgxs.SetFavoriteColor)
  setFavoriteColor(
    context: StateContext<SimpleFormNgxsStateModel>,
    { favoriteColor }: SimpleFormNgxs.SetFavoriteColor
  ) {
    const state = context.getState();
    context.patchState({
      model: { ...state.model, favoriteColor },
    });
  }

  @Action(SimpleFormNgxs.Submit)
  submit(context: StateContext<SimpleFormNgxsStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.simpleFormService.save(state.model).pipe(
      tap(({ id }) =>
        context.patchState({
          model: { ...state.model, id },
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
