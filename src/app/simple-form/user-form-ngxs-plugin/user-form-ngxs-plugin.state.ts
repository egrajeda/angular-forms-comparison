import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';
import { UserFormNgxsPlugin } from 'src/app/simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.actions';
import { UserService } from 'src/app/simple-form/user.service';

export interface UserForm {
  model: User;
  status: string;
  dirty: boolean;
}

export interface UserFormNgxsPluginStateModel {
  userForm: UserForm;
  loading: boolean;
}

@State<UserFormNgxsPluginStateModel>({
  name: 'userFormNgxsPlugin',
  defaults: {
    userForm: {
      model: {
        id: 0,
        name: '',
        birthdate: new Date(),
        favoriteColor: '',
      },
      status: 'INVALID',
      dirty: false,
    },
    loading: false,
  },
})
@Injectable()
export class UserFormNgxsPluginState {
  constructor(private readonly userService: UserService) {}

  @Action(UserFormNgxsPlugin.Submit)
  submit(context: StateContext<UserFormNgxsPluginStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.userService.save(state.userForm.model).pipe(
      tap(({ id }) =>
        context.patchState({
          userForm: {
            ...state.userForm,
            model: {
              ...state.userForm.model,
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
