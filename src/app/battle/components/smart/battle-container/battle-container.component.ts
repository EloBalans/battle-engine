import {Component, input} from '@angular/core';
import {BattleState} from "../../../models/battle-state.enum";
import {BattlefieldComponent} from "../battlefield/battlefield.component";
import {PrepareComponent} from "../prepare/prepare.component";
import {SummaryComponent} from "../summary/summary.component";
import {Team} from "../../../models/team.model";

@Component({
  selector: 'app-battle-container',
  standalone: true,
  imports: [
    BattlefieldComponent,
    PrepareComponent,
    SummaryComponent
  ],
  templateUrl: './battle-container.component.html',
  styleUrl: './battle-container.component.scss'
})
export class BattleContainerComponent {

  teams = input<[Team,Team]>();

  battleState: BattleState = BattleState.PREPARE;

  goTo(state: BattleState){
    this.battleState = state;
  }

  protected readonly BattleState = BattleState;
}
