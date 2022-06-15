import {Address} from "./address.model";

export interface Employee {
  id: number;
  name: string;
  department: string;
  address: Address;
}
