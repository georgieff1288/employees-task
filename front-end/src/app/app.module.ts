import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { employeesReducer } from './state/employees.reducer'
import { EmployeesEffects } from "./state/employees.effects";

import { HttpService } from "./services/http.service";

import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { TokenInterceptor } from "./interceptors/token.interceptor";

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesInfoComponent } from './components/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/shared/employees-form/employees-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';
import { ErrorMessageComponent } from './components/shared/error-message/error-message.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AuthComponent } from './components/auth/auth.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesInfoComponent,
    EmployeesFormComponent,
    HeaderComponent,
    ConfirmModalComponent,
    ErrorMessageComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({employees: employeesReducer}, {}),
    EffectsModule.forRoot([EmployeesEffects])
  ],
  providers: [
    HttpService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    HttpClient,

    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
