import { Component, inject, Inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HexGeometry } from '../../../utilities/hex-gemetry.utility';
import { SVGRenderer } from '../../../utilities/svg-renderer.utility';
import { SIZE_TOKEN, VERTICAL_SCALE_TOKEN } from '../../../consts/tokens.const';
import { Hex, HexCord } from '../../../models/hex.model';
import { HeightCalculator } from '../../../utilities/height-calculator.utility';

@Component({
  selector: '[unit]',
  standalone: true,
  imports: [],
  templateUrl: './unit.component.svg',
  styleUrl: './unit.component.scss',
})
export class UnitComponent {
  position = input.required<HexCord>();
  grid = input.required<Hex[]>();
  sanitizer = inject(DomSanitizer);

  constructor(
    @Inject(SIZE_TOKEN) private size: number,
    @Inject(VERTICAL_SCALE_TOKEN) private verticalScale: number,
  ) {}

  drawUnit(): SafeHtml {
    const { x, y } = HexGeometry.hexToPixel(
      this.position(),
      this.size,
      this.verticalScale,
    );
    const radius = this.size / 3;
    const height = HeightCalculator.calculateHeightAt(
      this.position(),
      this.grid(),
    );

    const circleSvg = SVGRenderer.drawCircle(x, y - height, radius, 'red');
    return this.sanitizer.bypassSecurityTrustHtml(circleSvg);
  }
}
