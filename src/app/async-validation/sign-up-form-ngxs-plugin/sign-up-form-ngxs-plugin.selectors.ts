import { Selector } from '@ngxs/store';
import { User } from '../user';
import {
  SignUpForm,
  SignUpFormNgxsPluginState,
  SignUpFormNgxsPluginStateModel,
} from './sign-up-form-ngxs-plugin.state';

export class SignUpFormNgxsPluginSelectors {
  @Selector([SignUpFormNgxsPluginState])
  static form({ signUpForm }: SignUpFormNgxsPluginStateModel): SignUpForm {
    return signUpForm;
  }

  @Selector([SignUpFormNgxsPluginSelectors.form])
  static model({ model }: SignUpForm): User {
    return model!;
  }

  @Selector([SignUpFormNgxsPluginState])
  static loading({ loading }: SignUpFormNgxsPluginStateModel): boolean {
    return loading;
  }
}
