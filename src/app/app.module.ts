import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserFormReactiveComponent } from './simple-form/user-form-reactive/user-form-reactive.component';
import { UserFormTemplateComponent } from './simple-form/user-form-template/user-form-template.component';
import { UserFormNgxsComponent } from './simple-form/user-form-ngxs/user-form-ngxs.component';
import { UserFormNgxsPluginComponent } from './simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.component';
import { UserFormNgxsPluginState } from './simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserFormNgxsState } from 'src/app/simple-form/user-form-ngxs/user-form-ngxs.state';
import { CustomerRequestFormTemplateComponent } from 'src/app/custom-validation/customer-request-form-template/customer-request-form-template.component';
import { ValidCustomerIdValidatorDirective } from './custom-validation/valid-customer-id-validator.directive';
import { NotInYearValidatorDirective } from './custom-validation/not-in-year-validator.directive';
import { CustomerRequestFormReactiveComponent } from './custom-validation/customer-request-form-reactive/customer-request-form-reactive.component';
import { CustomerRequestFormNgxsPluginComponent } from './custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.component';
import { CustomerRequestFormNgxsPluginState } from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.state';
import { CustomerRequestFormNgxsState } from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.state';
import { CustomerRequestFormNgxsComponent } from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.component';
import { createCustomElement } from '@angular/elements';
import { SignUpFormTemplateComponent } from './async-validation/sign-up-form-template/sign-up-form-template.component';
import { UniqueUsernameValidatorDirective } from './async-validation/unique-username-validator.directive';
import { SignUpFormReactiveComponent } from './async-validation/sign-up-form-reactive/sign-up-form-reactive.component';
import { SignUpFormNgxsComponent } from './async-validation/sign-up-form-ngxs/sign-up-form-ngxs.component';
import { SignUpFormNgxsState } from './async-validation/sign-up-form-ngxs/sign-up-form-ngxs.state';
import { SignUpFormNgxsPluginState } from './async-validation/sign-up-form-ngxs-plugin/sign-up-form-ngxs-plugin.state';
import { SignUpFormNgxsPluginComponent } from './async-validation/sign-up-form-ngxs-plugin/sign-up-form-ngxs-plugin.component';
import { ProfileFormTemplateComponent } from './conditional-validation/profile-form-template/profile-form-template.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormReactiveComponent,
    UserFormTemplateComponent,
    UserFormNgxsComponent,
    UserFormNgxsPluginComponent,
    ValidCustomerIdValidatorDirective,
    NotInYearValidatorDirective,
    CustomerRequestFormTemplateComponent,
    CustomerRequestFormReactiveComponent,
    CustomerRequestFormNgxsComponent,
    CustomerRequestFormNgxsPluginComponent,
    SignUpFormTemplateComponent,
    UniqueUsernameValidatorDirective,
    SignUpFormReactiveComponent,
    SignUpFormNgxsComponent,
    SignUpFormNgxsPluginComponent,
    ProfileFormTemplateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    NgxsModule.forRoot([
      UserFormNgxsState,
      UserFormNgxsPluginState,
      CustomerRequestFormNgxsState,
      CustomerRequestFormNgxsPluginState,
      SignUpFormNgxsState,
      SignUpFormNgxsPluginState,
    ]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AppModule implements DoBootstrap {
  constructor(injector: Injector) {
    const appElement = createCustomElement(AppComponent, { injector });
    customElements.define('app-root', appElement);

    // simple-form
    const userFormTemplateElement = createCustomElement(
      UserFormTemplateComponent,
      { injector }
    );
    customElements.define('app-user-form-template', userFormTemplateElement);

    const userFormReactiveElement = createCustomElement(
      UserFormReactiveComponent,
      { injector }
    );
    customElements.define('app-user-form-reactive', userFormReactiveElement);

    const userFormNgxsElement = createCustomElement(UserFormNgxsComponent, {
      injector,
    });
    customElements.define('app-user-form-ngxs', userFormNgxsElement);

    const userFormNgxsPluginElement = createCustomElement(
      UserFormNgxsPluginComponent,
      { injector }
    );
    customElements.define(
      'app-user-form-ngxs-plugin',
      userFormNgxsPluginElement
    );

    // custom-validation
    const customerRequestFormTemplateElement = createCustomElement(
      CustomerRequestFormTemplateComponent,
      { injector }
    );
    customElements.define(
      'app-customer-request-form-template',
      customerRequestFormTemplateElement
    );

    const customerRequestFormReactiveElement = createCustomElement(
      CustomerRequestFormReactiveComponent,
      { injector }
    );
    customElements.define(
      'app-customer-request-form-reactive',
      customerRequestFormReactiveElement
    );

    const customerRequestFormNgxsElement = createCustomElement(
      CustomerRequestFormNgxsComponent,
      { injector }
    );
    customElements.define(
      'app-customer-request-form-ngxs',
      customerRequestFormNgxsElement
    );

    const customerRequestFormNgxsPluginElement = createCustomElement(
      CustomerRequestFormNgxsPluginComponent,
      { injector }
    );
    customElements.define(
      'app-customer-request-form-ngxs-plugin',
      customerRequestFormNgxsPluginElement
    );

    // async-validation
    const signUpFormTemplateElement = createCustomElement(
      SignUpFormTemplateComponent,
      { injector }
    );
    customElements.define(
      'app-sign-up-form-template',
      signUpFormTemplateElement
    );

    const signUpFormReactiveElement = createCustomElement(
      SignUpFormReactiveComponent,
      { injector }
    );
    customElements.define(
      'app-sign-up-form-reactive',
      signUpFormReactiveElement
    );

    const signUpFormNgxsElement = createCustomElement(SignUpFormNgxsComponent, {
      injector,
    });
    customElements.define('app-sign-up-form-ngxs', signUpFormNgxsElement);

    const signUpFormNgxsPluginElement = createCustomElement(
      SignUpFormNgxsPluginComponent,
      {
        injector,
      }
    );
    customElements.define(
      'app-sign-up-form-ngxs-plugin',
      signUpFormNgxsPluginElement
    );

    // conditional validation
    const profileFormTemplateElement = createCustomElement(
      ProfileFormTemplateComponent,
      { injector }
    );
    customElements.define(
      'app-profile-form-template',
      profileFormTemplateElement
    );
  }

  ngDoBootstrap(appRef: ApplicationRef): void {}
}
