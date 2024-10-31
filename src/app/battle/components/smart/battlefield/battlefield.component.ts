import { Component } from '@angular/core';
import { QueueComponent } from '../../presentation/queue/queue.component';
import { FightTagComponent } from '../../presentation/fight-tag/fight-tag.component';

@Component({
  selector: 'app-battlefield',
  standalone: true,
  imports: [FightTagComponent, QueueComponent],
  templateUrl: './battlefield.component.html',
  styleUrl: './battlefield.component.scss',
})
export class BattlefieldComponent {}
