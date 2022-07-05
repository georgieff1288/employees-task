import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {filterEmployees} from "../../state/employees.actions";
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
    let filters ={
      departmentId:  this.filterForm.value.departmentId,
      city:  this.filterForm.value.city
    };
    this.store.dispatch(filterEmployees({ filters }));
  }
}
