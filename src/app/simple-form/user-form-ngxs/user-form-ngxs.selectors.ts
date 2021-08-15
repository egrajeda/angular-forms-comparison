import { Selector } from '@ngxs/store';
import { User } from 'src/app/simple-form/user';
import { UserFormNgxsState, UserFormNgxsStateModel } from 'src/app/simple-form/user-form-ngxs/user-form-ngxs.state';

export class UserFormNgxsSelectors {
  @Selector([UserFormNgxsState])
  static user({ user }: UserFormNgxsStateModel): User {
    return user;
  }

  @Selector([UserFormNgxsState])
  static loading({ loading }: UserFormNgxsStateModel): boolean {
    return loading;
  }
}
