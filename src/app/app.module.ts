import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from '@angular/material/table';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';

import { EmployeesService } from "./services/employees.service";

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesInfoComponent } from './components/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';






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
  ],
  providers: [
    EmployeesService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
