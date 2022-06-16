import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EployeesListComponent } from './components/eployees-list/eployees-list.component';
import { EmployeesInfoComponent } from './components/employees-info/employees-info.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EployeesListComponent,
    EmployeesInfoComponent,
    EmployeesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
