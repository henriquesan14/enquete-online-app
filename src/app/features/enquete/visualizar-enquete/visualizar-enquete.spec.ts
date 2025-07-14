import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEnquete } from './visualizar-enquete';

describe('VisualizarEnquete', () => {
  let component: VisualizarEnquete;
  let fixture: ComponentFixture<VisualizarEnquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarEnquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarEnquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
