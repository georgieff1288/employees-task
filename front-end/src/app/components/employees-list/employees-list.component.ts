import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { Employee } from "../../models/employee.model"

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'department', 'phone', 'city', 'street', 'delete'];
  empSubscription!: Subscription;
  constructor(private emp: EmployeesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empSubscription = this.emp.employeesObservable.subscribe((value) => {
      this.employees = value;
    });
  }
  ngOnDestroy(): void {
    this.empSubscription.unsubscribe();
  }
  openDialog(name: string, id: number): void {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data:{text:`Would you like to delete ${name}?`},
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.emp.deleteEmployee(id);
  }
}
