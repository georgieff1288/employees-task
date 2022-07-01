import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {Subscription} from "rxjs";
import {Department} from "../../models/department.model";
import { City } from 'src/app/models/city.model';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  cities: City[] = [];
  subscribtion!: Subscription;
  filterForm = new FormGroup({
    departmentId: new FormControl(),
    city: new FormControl()
  });

  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.subscribtion = this.emp.getDepartments().subscribe(
      (res) => this.departments = res
    );

    this.subscribtion  = this.emp.getCities().subscribe(
      (res) => this.cities = res
    );
  }
  ngOnDestroy() {
    if(this.subscribtion ){
      this.subscribtion.unsubscribe();
    }
  }
  filter(){
    if(this.filterForm.value.city == null && this.filterForm.value.departmentId == null){
      return;
    }
    console.log(this.filterForm.value)
  }
}
