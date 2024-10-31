import { Component, Inject, inject, input, output } from '@angular/core';
import { Hex } from '../../../models/hex.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HexGeometry } from '../../../utilities/hex-gemetry.utility';
import { SVGRenderer } from '../../../utilities/svg-renderer.utility';
import { SIZE_TOKEN, VERTICAL_SCALE_TOKEN } from '../../../consts/tokens.const';
import { NgStyle } from '@angular/common';

@Component({
  selector: '[hexField]',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hex-field.component.svg',
  styleUrl: './hex-field.component.scss',
})
export class HexFieldComponent {
  hex = input.required<Hex>();

  sanitizer = inject(DomSanitizer);

  onHexClickEvent = output<Hex>();

  constructor(
    @Inject(SIZE_TOKEN) private size: number,
    @Inject(VERTICAL_SCALE_TOKEN) private verticalScale: number,
  ) {}

  drawHex(hex: Hex): SafeHtml {
    const center = HexGeometry.hexToPixel(hex, this.size, this.verticalScale);
    const corners = HexGeometry.getCorners(
      center,
      this.size,
      this.verticalScale,
    );
    const height = hex.height;
    const fillColor = hex.collision ? '#802509' : '#1c571c';

    const hexSvg = SVGRenderer.drawHex(corners, height, fillColor);
    return this.sanitizer.bypassSecurityTrustHtml(hexSvg);
  }

  onHexClick(hex: Hex) {
    this.onHexClickEvent.emit(hex);
  }
}
