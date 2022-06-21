import {Department} from "./department.model";

export interface Employee {
  id: number,
  emplopyee_name: string;
  phone: string;
  city: string,
  street: string
  department: Department;
}
