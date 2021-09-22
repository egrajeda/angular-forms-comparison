import { Selector } from '@ngxs/store';
import { User } from '../user';
import {
  SignUpFormNgxsState,
  SignUpFormNgxsStateModel,
} from './sign-up-form-ngxs.state';

export class SignUpFormNgxsSelectors {
  @Selector([SignUpFormNgxsState])
  static user({ user }: SignUpFormNgxsStateModel): User {
    return user;
  }

  @Selector([SignUpFormNgxsState])
  static loading({ loading }: SignUpFormNgxsStateModel): boolean {
    return loading;
  }
}
