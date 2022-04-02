import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';
import { FormResult } from "../models/form-result";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiHttpService } from '../services/api-http.service';



@Component({
  selector: 'app-add-new-employee-modal',
  templateUrl: './add-new-employee-modal.component.html',
  styleUrls: ['./add-new-employee-modal.component.css']
})
export class AddNewEmployeeModalComponent implements OnInit {

  @Input() public employee: Employee;
  @Input() public formMode: string = 'New';
  @Input() public isAddNew: boolean;

  entryForm: FormGroup;
  error: string | undefined;
  id: any;
  result: FormResult

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService
  ) {
    this.employee = new Employee();
    this.result = new FormResult();
  }

  ngOnInit(): void {
    this.createForm();
    console.log('ngOnInit position:', this.employee);
    console.log('ngOnInit formMode:', this.formMode);
    console.log('ngOnInit isAddNew:', this.isAddNew);

    if (this.employee != undefined) {
      this.entryForm.setValue({
        employeeId: this.employee.employeeId,
        name: this.employee.name,
        role: this.employee.role,
        salary: this.employee.salary
      });
    }
  }

   // CRUD - add employee
   create(data: any): void {
    this.apiHttpService.post("https://localhost:5001/api/Employee", data).subscribe(
      (resp: any) => {
        this.result = { employee: this.employee, status : true };
        this.activeModal.close(this.result);
      },
      (error) => {
      }
    );
  }

  AddEmployee(): void {
    this.create(this.entryForm.value);
  }

  onCancel(): void {
    console.log('cancel called');
    this.result = { employee: this.employee , status : false };
    this.activeModal.close(this.result);
  }

    // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      employeeId:  [0, Validators.required],
      name:  ['',  Validators.required],
      role:  ['', Validators.required],
      salary:  [0, Validators.required]
    });
  }
}
