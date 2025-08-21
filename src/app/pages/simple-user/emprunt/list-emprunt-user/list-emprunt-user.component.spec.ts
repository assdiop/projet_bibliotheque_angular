import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpruntUserComponent } from './list-emprunt-user.component';

describe('ListEmpruntUserComponent', () => {
  let component: ListEmpruntUserComponent;
  let fixture: ComponentFixture<ListEmpruntUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmpruntUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEmpruntUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
