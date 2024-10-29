import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicBallsComponent } from './magic-balls.component';

describe('MagicBallsComponent', () => {
  let component: MagicBallsComponent;
  let fixture: ComponentFixture<MagicBallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicBallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
