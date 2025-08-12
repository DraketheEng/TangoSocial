import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDancerComponent } from './new-dancer.component';

describe('NewDancerComponent', () => {
  let component: NewDancerComponent;
  let fixture: ComponentFixture<NewDancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDancerComponent]
    });
    fixture = TestBed.createComponent(NewDancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
