import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnquete } from './form-enquete';

describe('FormEnquete', () => {
  let component: FormEnquete;
  let fixture: ComponentFixture<FormEnquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEnquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
