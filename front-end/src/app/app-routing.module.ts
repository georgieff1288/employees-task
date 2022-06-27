import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";
import {AuthComponent} from "./components/auth/auth.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EmployeesListComponent, data: { animation: 'EmployeesListPage' } },
  { path: 'add-employee', component: AddEmployeeComponent,data: { animation: 'AddEmployeePage' } },
  { path: 'edit-employee/:id', component: EditEmployeeComponent, data: { animation: 'EditEmployeePage' } },
  { path: 'login', component: AuthComponent, data: { animation: 'AuthPage' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
