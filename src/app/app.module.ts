import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { EmployeesService } from "./services/employees.service";

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesInfoComponent } from './components/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';





@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesInfoComponent,
    EmployeesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    EmployeesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
