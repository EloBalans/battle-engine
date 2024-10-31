import { Component, input, output } from '@angular/core';
import { Team } from '../../../models/team.model';
import { HexFieldsComponent } from '../../../svg-components/presentation/hex-fields/hex-fields.component';

@Component({
  selector: 'app-prepare',
  standalone: true,
  imports: [HexFieldsComponent],
  templateUrl: './prepare.component.html',
  styleUrl: './prepare.component.scss',
})
export class PrepareComponent {
  teams = input<[Team, Team]>();

  goToBattleEvent = output<void>();
}
