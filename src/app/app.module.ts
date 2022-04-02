import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import "ag-grid-enterprise";
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddNewEmployeeModalComponent } from './add-new-employee-modal/add-new-employee-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddNewEmployeeModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([EmployeeListComponent])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ]
})
export class AppModule { }
