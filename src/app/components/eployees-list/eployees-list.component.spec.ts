import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EployeesListComponent } from './eployees-list.component';

describe('EployeesListComponent', () => {
  let component: EployeesListComponent;
  let fixture: ComponentFixture<EployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EployeesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
