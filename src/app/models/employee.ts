export interface IEmployee {
  employeeId: number;
  name: string;
  role: string;
  salary: number;
}

export class Employee implements IEmployee{
  employeeId: number = 0;
  name: string = '';
  role: string= '';
  salary: number= 0;
}

