import {  IEmployee, Employee } from './employee';

export interface IFormResult {
  employee: Employee;
  status: boolean;
}

export class FormResult implements IFormResult{
  employee: IEmployee = new Employee;
  status: boolean = false;
}
