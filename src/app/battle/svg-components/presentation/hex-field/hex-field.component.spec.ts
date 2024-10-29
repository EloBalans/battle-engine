import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexFieldComponent } from './hex-field.component';

describe('HexFieldComponent', () => {
  let component: HexFieldComponent;
  let fixture: ComponentFixture<HexFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
