import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from '@angular/material/table';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { EmployeesService } from "./services/employees.service";

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesInfoComponent } from './components/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';


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
    ConfirmModalComponent
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
    FormsModule
  ],
  providers: [
    EmployeesService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
