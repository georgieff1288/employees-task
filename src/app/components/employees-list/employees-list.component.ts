import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  employees = [];
  displayedColumns: string[] = ['name', 'department', 'phone', 'city', 'street', 'delete'];
  empSubscription!: Subscription;
  constructor(private emp: EmployeesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empSubscription = this.emp.employeesObservable.subscribe((value) => {
      this.employees = value;
    });
  }
  ngOnDestroy() {
    this.empSubscription.unsubscribe();
  }
  openDialog(name: string, id: number): void {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data:{text:$localize `Would you like to delete ${name}?` },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete(id);
      }
    });
  }

  delete(id: number){
    this.emp.deleteEmployee(id);
  }
}
