import {Department} from "./department.model";

export interface Employee {
  id?: number;
  employee_name: string;
  phone: string;
  city: string;
  street: string;
  department_id: number;
  department?: Department;
}
