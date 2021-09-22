import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';
import { UserFormNgxs } from 'src/app/simple-form/user-form-ngxs/user-form-ngxs.actions';
import { UserService } from 'src/app/simple-form/user.service';

export interface UserFormNgxsStateModel {
  user: User;
  loading: boolean;
}

@State<UserFormNgxsStateModel>({
  name: 'userFormNgxs',
  defaults: {
    user: {
      id: 0,
      name: '',
      birthdate: new Date(),
      favoriteColor: '',
    },
    loading: false,
  },
})
@Injectable()
export class UserFormNgxsState {
  constructor(private readonly userService: UserService) {}

  @Action(UserFormNgxs.SetName)
  setName(
    context: StateContext<UserFormNgxsStateModel>,
    { name }: UserFormNgxs.SetName
  ) {
    const state = context.getState();
    context.patchState({
      user: { ...state.user, name },
    });
  }

  @Action(UserFormNgxs.SetBirthdate)
  setBirthdate(
    context: StateContext<UserFormNgxsStateModel>,
    { birthdate }: UserFormNgxs.SetBirthdate
  ) {
    const state = context.getState();
    context.patchState({
      user: { ...state.user, birthdate },
    });
  }

  @Action(UserFormNgxs.SetFavoriteColor)
  setFavoriteColor(
    context: StateContext<UserFormNgxsStateModel>,
    { favoriteColor }: UserFormNgxs.SetFavoriteColor
  ) {
    const state = context.getState();
    context.patchState({
      user: { ...state.user, favoriteColor },
    });
  }

  @Action(UserFormNgxs.Submit)
  submit(context: StateContext<UserFormNgxsStateModel>) {
    const state = context.getState();
    context.patchState({
      loading: true,
    });
    return this.userService.save(state.user).pipe(
      tap(({ id }) =>
        context.patchState({
          user: { ...state.user, id },
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
