import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BattlefieldComponent} from "./battle/components/smart/battlefield/battlefield.component";
import {FightTagComponent} from "./battle/components/presentation/fight-tag/fight-tag.component";
import {QueueComponent} from "./battle/components/presentation/queue/queue.component";
import {BattleContainerComponent} from "./battle/components/smart/battle-container/battle-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BattlefieldComponent, FightTagComponent, QueueComponent, BattleContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fast-mmorpg';
}
