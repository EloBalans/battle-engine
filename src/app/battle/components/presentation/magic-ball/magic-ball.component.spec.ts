import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicBallComponent } from './magic-ball.component';

describe('MagicBallComponent', () => {
  let component: MagicBallComponent;
  let fixture: ComponentFixture<MagicBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicBallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
