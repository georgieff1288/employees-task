import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  retrieveEmployees,
  loadEmployees,
  deleteEmployee,
  filterEmployees,
  retrieveFilters,
  loadFilters
} from './employees.actions';
import {Employee} from "../models/employee.model";
import {City} from "../models/city.model";
import {Department} from "../models/department.model";

export interface State {
  employees: {
    employeesList: Employee[],
    count: number
  },
  filters:{
    cities: City[],
    departments: Department[]
  }
}

export const initialState: State = {
  employees: {
    employeesList: [],
    count: 0
  },
  filters:{
    cities: [],
    departments: []
  }
};

export const employeesReducer = createReducer(
  initialState,
  on(retrieveEmployees, (state, {pageIndex, pageSize}) => state),
  on(loadEmployees, (state, {res}) => ({...state, employees: res})),
  on(addEmployee, (state, employee) => state),
  on(deleteEmployee, (state, id) => state),
  on(filterEmployees, (state, filters) => state),
  on(retrieveFilters, (state) => state),
  on(loadFilters, (state, {filters}) => ({...state, filters: filters})),
);
