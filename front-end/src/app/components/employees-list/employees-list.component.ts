import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import {BehaviorSubject, Subscription, tap} from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";
import { Employee } from "../../models/employee.model"
import {Store} from "@ngrx/store";
import {deleteEmployee, retrieveEmployees} from "../../state/employees.actions";
import { selectEmployeesList } from "../../state/employees.selectors";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit, OnDestroy, AfterViewInit {
  employees = new BehaviorSubject<Employee[]>([]);
  errorMsg: string = '';
  displayedColumns: string[] = ['name', 'department', 'phone', 'city', 'street', 'buttons'];
  notificationMsg: string = '';
  getSubscription!: Subscription;
  delSubscription!: Subscription;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  storeEmployees$ = this.store.select(selectEmployeesList);

  constructor(private emp: EmployeesService, public dialog: MatDialog, private store: Store) {
    // this.store.dispatch({ type: '[Employees List] Load Employees' });
    this.loadEmployees();
  }

  ngOnInit(): void {
    // this.getSubscription = this.emp.getAllEmployees().subscribe({
    //   next: (res: Employee[]) => {
    //     if(res.length == 0){
    //       this.notificationMsg = 'There is no employees in database'
    //     }
    //     this.employees.next(res);
    //     this.emp.numOfEmployees.next(res.length);
    //   },
    //   error: error => this.errorMsg = error
    // });
  }
  ngOnDestroy(): void {
    this.delSubscription?.unsubscribe();
  }
  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadEmployees())
    ).subscribe();
  }

  loadEmployees(){
    this.store.dispatch(retrieveEmployees({pageIndex: this.paginator?.pageIndex ?? 0, pageSize: this.paginator?.pageSize ?? 3}));
  }

  openDialog(name: string, id: number): void {
    this.errorMsg = '';
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
    this.store.dispatch(deleteEmployee({ id }));
    // this.delSubscription = this.emp.deleteEmployee(id).subscribe({
    //   next: ()=>{
    //     this.getSubscription = this.emp.getAllEmployees().subscribe({
    //       next: res => {
    //         if(res.length == 0){
    //           this.notificationMsg = 'There is no employees in database'
    //         }
    //         this.employees.next(res);
    //         this.emp.numOfEmployees.next(res.length);
    //       },
    //       error: error => this.errorMsg = error
    //     })
    //   },
    //   error: error => this.errorMsg = error
    // });
  }
}
