import {HexCord} from "../models/hex.model";

export class HexInterpolator {
  static interpolate(start: HexCord, end: HexCord, t: number): HexCord {
    return {
      q: start.q + (end.q - start.q) * t,
      r: start.r + (end.r - start.r) * t,
    };
  }
}
