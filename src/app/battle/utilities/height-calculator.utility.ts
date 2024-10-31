import { Hex, HexCord } from '../models/hex.model';

export class HeightCalculator {
  static calculateHeightAt(cord: HexCord, grid: Hex[]): number {
    const qFloor = Math.floor(cord.q);
    const rFloor = Math.floor(cord.r);

    const hexes = [
      grid.find((h) => h.q === qFloor && h.r === rFloor),
      grid.find((h) => h.q === Math.ceil(cord.q) && h.r === rFloor),
      grid.find((h) => h.q === qFloor && h.r === Math.ceil(cord.r)),
      grid.find((h) => h.q === Math.ceil(cord.q) && h.r === Math.ceil(cord.r)),
    ].filter((h): h is Hex => h !== undefined);

    if (hexes.length === 0) return 0;

    return hexes.reduce((sum, h) => sum + h.height, 0) / hexes.length;
  }
}
