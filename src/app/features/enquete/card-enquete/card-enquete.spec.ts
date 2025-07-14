import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEnquete } from './card-enquete';

describe('CardEnquete', () => {
  let component: CardEnquete;
  let fixture: ComponentFixture<CardEnquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEnquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEnquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
