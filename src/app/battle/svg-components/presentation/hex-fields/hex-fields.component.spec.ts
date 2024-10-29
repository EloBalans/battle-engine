import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexFieldsComponent } from './hex-fields.component';

describe('HexFieldsComponent', () => {
  let component: HexFieldsComponent;
  let fixture: ComponentFixture<HexFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
