import { Selector } from '@ngxs/store';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import {
  SimpleFormNgxsState,
  SimpleFormNgxsStateModel,
} from 'src/app/simple-form/simple-form-ngxs/simple-form-ngxs.state';

export class SimpleFormNgxsSelectors {
  @Selector([SimpleFormNgxsState])
  static model({ model }: SimpleFormNgxsStateModel): SimpleForm {
    return model;
  }

  @Selector([SimpleFormNgxsState])
  static loading({ loading }: SimpleFormNgxsStateModel): boolean {
    return loading;
  }
}
