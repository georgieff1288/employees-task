import { createSelector } from '@ngrx/store';


export const selectState = (state: any) => state.employees;

export const selectEmployeesList = createSelector(
  selectState,
  (state: any) => state.employees.employeesList);

export const selectCitiesList = createSelector(
  selectState,
  (state: any) => state.filters.cities
);

export const selectDepartmentsList = createSelector(
  selectState,
  (state: any) => state.filters.departments
);

export const selectEmployeesCount = createSelector(
  selectState,
  (state: any) => state.employees.count
);
