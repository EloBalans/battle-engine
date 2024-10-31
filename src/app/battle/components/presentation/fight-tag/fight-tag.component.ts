import { Component, input } from '@angular/core';
import { HpBarComponent } from '../hp-bar/hp-bar.component';
import { MagicBallComponent } from '../magic-ball/magic-ball.component';
import { MagicBallsComponent } from '../magic-balls/magic-balls.component';

@Component({
  selector: 'app-fight-tag',
  standalone: true,
  imports: [HpBarComponent, MagicBallComponent, MagicBallsComponent],
  templateUrl: './fight-tag.component.html',
  styleUrl: './fight-tag.component.scss',
})
export class FightTagComponent {
  name = input.required<string>();
  class = input.required<'mage' | 'warrior' | 'thief'>;
  currentHealthPoints = input.required<number>;
  maxHealthPoints = input.required<number>;
}
