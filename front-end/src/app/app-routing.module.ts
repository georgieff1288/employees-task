import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesListComponent } from "./components/employees-list/employees-list.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { AuthComponent } from "./components/auth/auth.component";

import { AuthGuard } from "./guards/auth.guard";
import { LoginGuard } from "./guards/login.guard";
import {ChatComponent} from "./components/chat/chat.component";



const routes: Routes = [
  { path: '', pathMatch: 'full', canActivate:[AuthGuard], component: EmployeesListComponent, data: { animation: 'EmployeesListPage' } },
  { path: 'add-employee', canActivate:[AuthGuard], component: AddEmployeeComponent,data: { animation: 'AddEmployeePage' } },
  { path: 'edit-employee/:id', canActivate:[AuthGuard], component: EditEmployeeComponent, data: { animation: 'EditEmployeePage' } },
  { path: 'chat', canActivate:[AuthGuard], component: ChatComponent, data: { animation: 'ChatPage' } },
  { path: 'login', canActivate:[LoginGuard], component: AuthComponent, data: { animation: 'AuthPage' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
