import { HexCord } from '../models/hex.model';

export class HexGeometry {
  static getCorners(
    center: { x: number; y: number },
    size: number,
    verticalScale: number,
  ): { x: number; y: number }[] {
    const corners = [];
    const angleOffset = Math.PI / 6;

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + angleOffset;
      const x = center.x + size * Math.cos(angle);
      const y = center.y + size * Math.sin(angle) * verticalScale;
      corners.push({ x, y });
    }

    return corners;
  }

  static hexToPixel(
    hex: HexCord,
    size: number,
    verticalScale: number,
  ): { x: number; y: number } {
    const x = size * Math.sqrt(3) * (hex.q + hex.r / 2);
    const y = size * 1.5 * hex.r * verticalScale;
    return { x, y };
  }
}
