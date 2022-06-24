import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EmployeesListComponent, data: { animation: 'EmployeesListPage' } },
  { path: 'add-employee', component: AddEmployeeComponent,data: { animation: 'AddEmployeePage' } },
  { path: 'edit-employee/:id', component: EditEmployeeComponent, data: { animation: 'EditEmployeePage' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
