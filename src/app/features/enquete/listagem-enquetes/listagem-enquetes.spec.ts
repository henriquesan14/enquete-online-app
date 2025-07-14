import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEnquetes } from './listagem-enquetes';

describe('ListagemEnquetes', () => {
  let component: ListagemEnquetes;
  let fixture: ComponentFixture<ListagemEnquetes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemEnquetes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemEnquetes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
