import {Component, computed, input, signal} from '@angular/core';
import {HexHeight} from "../../../models/hex-height.enum";

@Component({
  selector: '[hexField]',
  standalone: true,
  imports: [],
  templateUrl: './hex-field.component.svg',
  styleUrl: './hex-field.component.scss'
})
export class HexFieldComponent {
  heightBase = input<HexHeight>(HexHeight.SMALL);
  collision = input<boolean>();
  x = input<number>(0)
  y = input<number>(0)

  points = computed(()=> (
    `0,${-60-(this.heightBase()*10)} ` +
    `52,${-45-(this.heightBase()*10)}  ` +
    `52,${-15-(this.heightBase()*10)}  ` +
    `0,${0-(this.heightBase()*10)} ` +
    `-52,${-15-(this.heightBase()*10)}` +
    ` -52,${-45-(this.heightBase()*10)} ` +
    `0,${-60-(this.heightBase()*10)}`
  ))

  translateYScaffold = computed(()=>{
    return this.translateYRoof()+ 10 + (this.heightBase() * 10);
  })

  translateYRoof = signal<number>(83); //height 80px + stroke 3px

  translateX = signal<number>(55); // width 52px + stroke 3px
}


