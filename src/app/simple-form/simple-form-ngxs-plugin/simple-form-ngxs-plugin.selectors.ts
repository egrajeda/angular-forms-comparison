import { Selector } from '@ngxs/store';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import {
  SimpleFormNgxsPluginForm,
  SimpleFormNgxsPluginState,
  SimpleFormNgxsPluginStateModel,
} from 'src/app/simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.state';

export class SimpleFormNgxsPluginSelectors {
  @Selector([SimpleFormNgxsPluginState])
  static form({
    form,
  }: SimpleFormNgxsPluginStateModel): SimpleFormNgxsPluginForm {
    return form;
  }

  @Selector([SimpleFormNgxsPluginSelectors.form])
  static model({ model }: SimpleFormNgxsPluginForm): SimpleForm {
    return model;
  }

  @Selector([SimpleFormNgxsPluginSelectors.form])
  static loading({ loading }: SimpleFormNgxsPluginForm): boolean {
    return loading;
  }
}
