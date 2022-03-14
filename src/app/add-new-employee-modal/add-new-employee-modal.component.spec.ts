import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEmployeeModalComponent } from './add-new-employee-modal.component';

describe('AddNewEmployeeModalComponent', () => {
  let component: AddNewEmployeeModalComponent;
  let fixture: ComponentFixture<AddNewEmployeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEmployeeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
