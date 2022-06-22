import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EmployeesListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
