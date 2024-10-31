import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleContainerComponent } from './battle-container.component';

describe('BattleContainerComponent', () => {
  let component: BattleContainerComponent;
  let fixture: ComponentFixture<BattleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
