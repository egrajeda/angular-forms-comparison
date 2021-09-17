import { Selector } from '@ngxs/store';
import { User } from 'src/app/simple-form/user';
import {
  UserForm,
  UserFormNgxsPluginState,
  UserFormNgxsPluginStateModel,
} from 'src/app/simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.state';

export class UserFormNgxsPluginSelectors {
  @Selector([UserFormNgxsPluginState])
  static form({ userForm }: UserFormNgxsPluginStateModel): UserForm {
    return userForm;
  }

  @Selector([UserFormNgxsPluginSelectors.form])
  static model({ model }: UserForm): User {
    return model;
  }

  @Selector([UserFormNgxsPluginState])
  static loading({ loading }: UserFormNgxsPluginStateModel): boolean {
    return loading;
  }
}
