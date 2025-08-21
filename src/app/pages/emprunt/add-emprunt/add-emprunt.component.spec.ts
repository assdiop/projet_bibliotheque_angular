import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpruntComponent } from './add-emprunt.component';

describe('AddEmpruntComponent', () => {
  let component: AddEmpruntComponent;
  let fixture: ComponentFixture<AddEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmpruntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
