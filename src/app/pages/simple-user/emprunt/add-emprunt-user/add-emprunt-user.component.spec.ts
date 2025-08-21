import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpruntUserComponent } from './add-emprunt-user.component';

describe('AddEmpruntUserComponent', () => {
  let component: AddEmpruntUserComponent;
  let fixture: ComponentFixture<AddEmpruntUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmpruntUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmpruntUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
