import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';
import { SignUpFormNgxsPlugin } from './sign-up-form-ngxs-plugin.actions';

export interface SignUpForm {
  model: User;
  status: string;
  dirty: boolean;
}

export interface SignUpFormNgxsPluginStateModel {
  signUpForm: SignUpForm;
  loading: boolean;
}

@State<SignUpFormNgxsPluginStateModel>({
  name: 'signUpFormNgxsPlugin',
  defaults: {
    signUpForm: {
      model: {
        id: 0,
        username: '',
        password: '',
      },
      status: 'INVALID',
      dirty: false,
    },
    loading: false,
  },
})
@Injectable()
export class SignUpFormNgxsPluginState {
  constructor(private readonly userService: UserService) {}

  @Action(SignUpFormNgxsPlugin.Submit)
  submit(context: StateContext<SignUpFormNgxsPluginStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.userService.save(state.signUpForm.model).pipe(
      tap(({ id }) =>
        context.patchState({
          signUpForm: {
            ...state.signUpForm,
            model: {
              ...state.signUpForm.model,
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
