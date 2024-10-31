import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-magic-ball',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './magic-ball.component.html',
  styleUrl: './magic-ball.component.scss',
})
export class MagicBallComponent {
  color = input<string>('#3498db');
  count = input<number>(0);
}
