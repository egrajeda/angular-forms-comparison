import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';
import { SignUpFormNgxs } from './sign-up-form-ngxs.actions';

export interface SignUpFormNgxsStateModel {
  user: User;
  loading: boolean;
}

@State<SignUpFormNgxsStateModel>({
  name: 'signUpFormNgxs',
  defaults: {
    user: {
      id: 0,
      username: '',
      password: '',
    },
    loading: false,
  },
})
@Injectable()
export class SignUpFormNgxsState {
  constructor(private readonly userService: UserService) {}

  @Action(SignUpFormNgxs.SetUsername)
  setUsername(
    context: StateContext<SignUpFormNgxsStateModel>,
    { username }: SignUpFormNgxs.SetUsername
  ) {
    const state = context.getState();
    context.patchState({
      user: { ...state.user, username },
    });
  }

  @Action(SignUpFormNgxs.SetPassword)
  setPassword(
    context: StateContext<SignUpFormNgxsStateModel>,
    { password }: SignUpFormNgxs.SetPassword
  ) {
    const state = context.getState();
    context.patchState({
      user: { ...state.user, password },
    });
  }

  @Action(SignUpFormNgxs.Submit)
  submit(context: StateContext<SignUpFormNgxsStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.userService.save(state.user).pipe(
      tap(({ id }) =>
        context.patchState({
          user: {
            ...state.user,
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
