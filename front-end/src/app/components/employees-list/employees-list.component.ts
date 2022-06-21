import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { Employee } from "../../models/employee.model"

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  // employees = new BehaviorSubject<Employee[]>([]);
  // empObservable = this.employees.asObservable();
  employees!: Observable<Employee[]>;
  errorMsg: string = '';
  displayedColumns: string[] = ['name', 'department', 'phone', 'city', 'street', 'delete'];
  notificationMsg: string = '';
  delSubscription!: Subscription;
  constructor(private emp: EmployeesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.employees = this.emp.getAllEmployees();
    this.employees.subscribe({
      next: res => {
        if(res.length == 0){
          this.notificationMsg = 'There is no employees in database'
        }
      },
      error: error => this.errorMsg = error
    })
  }
  ngOnDestroy(): void {
    this.delSubscription?.unsubscribe();
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
    this.delSubscription = this.emp.deleteEmployee(id).subscribe({
      error: error => this.errorMsg = error
    })
  }
}
