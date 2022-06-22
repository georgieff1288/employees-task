import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import { EmployeesFormComponent } from "./components/employees-form/employees-form.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EmployeesListComponent },
  { path: 'add-employee', component: EmployeesFormComponent },
  { path: 'edit-employee/:id', component: EmployeesFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
