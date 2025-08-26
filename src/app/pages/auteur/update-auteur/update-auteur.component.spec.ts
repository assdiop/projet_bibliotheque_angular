import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuteurComponent } from './update-auteur.component';

describe('UpdateAuteurComponent', () => {
  let component: UpdateAuteurComponent;
  let fixture: ComponentFixture<UpdateAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAuteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
