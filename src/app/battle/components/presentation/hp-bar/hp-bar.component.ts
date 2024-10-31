import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-hp-bar',
  standalone: true,
  imports: [],
  templateUrl: './hp-bar.component.html',
  styleUrl: './hp-bar.component.scss',
})
export class HpBarComponent {
  maxHealthPoints = input<number>(10);
  currentHealthPoints = input<number>(8);
  healthPercentage = computed(
    () => (this.currentHealthPoints() / this.maxHealthPoints()) * 100,
  );
}
