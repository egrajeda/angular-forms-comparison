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
import { SimpleFormReactiveComponent } from './simple-form/simple-form-reactive/simple-form-reactive.component';
import { SimpleFormTemplateComponent } from './simple-form/simple-form-template/simple-form-template.component';
import { SimpleFormNgxsComponent } from './simple-form/simple-form-ngxs/simple-form-ngxs.component';
import { SimpleFormNgxsPluginComponent } from './simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.component';
import { SimpleFormNgxsPluginState } from './simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SimpleFormNgxsState } from 'src/app/simple-form/simple-form-ngxs/simple-form-ngxs.state';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormReactiveComponent,
    SimpleFormTemplateComponent,
    SimpleFormNgxsComponent,
    SimpleFormNgxsPluginComponent,
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
    NgxsModule.forRoot([SimpleFormNgxsState, SimpleFormNgxsPluginState]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
