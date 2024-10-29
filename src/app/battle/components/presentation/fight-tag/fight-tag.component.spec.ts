import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightTagComponent } from './fight-tag.component';

describe('FightTagComponent', () => {
  let component: FightTagComponent;
  let fixture: ComponentFixture<FightTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
