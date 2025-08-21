import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuteurComponent } from './add-auteur.component';

describe('AddAuteurComponent', () => {
  let component: AddAuteurComponent;
  let fixture: ComponentFixture<AddAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAuteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
