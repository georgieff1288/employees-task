import { createSelector } from '@ngrx/store';


export const selectEmployees = (state: any) => state.employees;

export const selectEmployeesList = createSelector(
  selectEmployees,
  (state: any) => state.employees
);

export const selectCities = (state: any) => state.employees;

export const selectCitiesList = createSelector(
  selectCities,
  (state: any) => state.cities
);

export const selectDepartments = (state: any) => state.employees;

export const selectDepartmentsList = createSelector(
  selectDepartments,
  (state: any) => state.departments
);
