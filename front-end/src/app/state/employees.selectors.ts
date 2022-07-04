import { createSelector } from '@ngrx/store';


export const selectState = (state: any) => state.employees;

export const selectEmployeesList = createSelector(
  selectState,
  (state: any) => state.employees
);

export const selectCitiesList = createSelector(
  selectState,
  (state: any) => state.cities
);

export const selectDepartmentsList = createSelector(
  selectState,
  (state: any) => state.departments
);

export const selectEmployeesCount = createSelector(
  selectState,
  (state: any) => state.employees.length
);
