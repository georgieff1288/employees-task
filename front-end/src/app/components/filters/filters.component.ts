import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {retrieveEmployees} from "../../state/employees.actions";
import {selectCitiesList, selectDepartmentsList} from "../../state/employees.selectors";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  departments$ = this.store.select(selectDepartmentsList);
  cities$ = this.store.select(selectCitiesList);
  // subscribtion!: Subscription;
  filterForm = new FormGroup({
    departmentId: new FormControl(),
    city: new FormControl()
  });
  @Output() callbackFunction: EventEmitter<any> = new EventEmitter();

  constructor(private emp: EmployeesService, private store: Store) {
    this.store.dispatch({ type: '[Filters] Load Filters' });
  }

  ngOnInit(): void {
    // this.subscribtion = this.emp.getDepartments().subscribe(
    //   (res) => this.departments = res
    // );

    // this.subscribtion  = this.emp.getCities().subscribe(
    //   (res) => this.cities = res
    // );
  }
  ngOnDestroy() {
    // if(this.subscribtion ){
    //   this.subscribtion.unsubscribe();
    // }
  }
  filter(){
    if(!this.filterForm.value.city && !this.filterForm.value.departmentId){
      return;
    }
    let options ={
      pageIndex: 0,
      pageSize: 3,
      departmentId:  this.filterForm.value.departmentId,
      city:  this.filterForm.value.city
    };
    let filters = {
      departmentId:  this.filterForm.value.departmentId,
      city:  this.filterForm.value.city
    }
    this.callbackFunction.emit(filters);
    this.store.dispatch(retrieveEmployees({ options }));
  }
}
