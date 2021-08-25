import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
    MatSnackBarModule,
    NgxsModule.forRoot([
      UserFormNgxsState,
      UserFormNgxsPluginState,
      CustomerRequestFormNgxsState,
      CustomerRequestFormNgxsPluginState,
    ]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
