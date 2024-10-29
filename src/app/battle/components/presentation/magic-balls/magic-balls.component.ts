import { Component } from '@angular/core';
import {MagicBallComponent} from "../magic-ball/magic-ball.component";

@Component({
  selector: 'app-magic-balls',
  standalone: true,
    imports: [
        MagicBallComponent
    ],
  templateUrl: './magic-balls.component.html',
  styleUrl: './magic-balls.component.scss'
})
export class MagicBallsComponent {

}
