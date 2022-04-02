import
{
   GridOptions
} from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewEmployeeModalComponent } from "../add-new-employee-modal/add-new-employee-modal.component";
import { FormResult } from '../models/form-result';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  title = 'employee-cost-ui';
  rowData = []
  gridOptions : GridOptions;
  employee: Employee;

  constructor(private http: HttpClient,
    public modalService: NgbModal) {
    this.gridOptions = <GridOptions>{};
    this.initGridConfig();
    this.employee = new Employee();
  }

  initGridConfig() {
    this.gridOptions = {
      masterDetail: true,
      detailRowHeight: 300,
      defaultColDef: { editable: true },
      columnDefs: this.getColumnDefs(),
      detailCellRendererParams: this.getDetailRendererParams(),
      onGridReady: (params) => {
        this.fetchData()
      }
    };
  }

  CurrencyCellRendererUSD(params: any) {
    var inrFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  getDetailRendererParams() {
    return {
      detailGridOptions: {
        columnDefs: [
          { headerName: 'Dependent ID', field: "dependentId" },
          { headerName: 'Name', field: "name" },
          { headerName: 'Relationship', field: "relationShip" },
          { headerName: 'Cost Of Insurance Per Pay Cheque', field: 'costOfInsurancePerPayCheque', editable: false, cellRenderer : this.CurrencyCellRendererUSD }
        ],
        suppressHorizontalScroll: true,
        enableColResize: true,
        defaultColDef: { editable: true },
        onFirstDataRendered(params: any) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.dependents);
      }
    };
  }

  getColumnDefs() {
    return  [
      {headerName: 'Employee ID', field: 'employeeId', cellRenderer: 'agGroupCellRenderer'},
      {headerName: 'Name', field: 'name'},
      {headerName: 'Role', field: 'role'},
      {headerName: 'Salary', field: 'salary'},
      {headerName: 'Cost Of Insurance Per Pay Cheque', field: 'costOfInsurancePerPayCheque' , editable: false, cellRenderer : this.CurrencyCellRendererUSD}
    ];
  }

  fetchData() {

    this.http.get<any>("https://localhost:5001/api/Employee/getall")
    .subscribe(data => {
      this.gridOptions.api!.setRowData(data);
      this.gridOptions.api!.sizeColumnsToFit();
    });
  }

  defaultColDef = {
    sortable: true
  };

  AddEmployee(employee: Employee,formMode: string, isAddNew: boolean) {
    const modalRef = this.modalService.open(AddNewEmployeeModalComponent);
    modalRef.componentInstance.employee = new Employee();
    modalRef.componentInstance.formMode = formMode;
    modalRef.componentInstance.isAddNew = isAddNew;

    modalRef.result
    .then((result: FormResult) => {
      if (result) {
          console.log("employee added")
          this.fetchData();
      }
    })
  }

  AddDependent() {
    //this.gridOptions.api?.applyTransaction({add : [{}]})
  }


  ngOnInit(): void {
  }
}
