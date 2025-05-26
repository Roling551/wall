import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggeableComponent } from './draggeable.component';

describe('DraggeableComponent', () => {
  let component: DraggeableComponent;
  let fixture: ComponentFixture<DraggeableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggeableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggeableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
