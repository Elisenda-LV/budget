import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a number', () => {
    expect(component.addProducts).not.toBeNaN();
  });

  it('should be a number', () => {
    expect(component.productPrice).not.toBeNaN();
  });

  it('should be a number', () => {
    expect(component.updateBudget()).not.toBeNegativeInfinity();
  });

  it('should be a number', () => {
    expect(component.budgetAndExtra).not.toBeNaN();
  });


});
