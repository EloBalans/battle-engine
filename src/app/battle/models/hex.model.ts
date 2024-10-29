export interface Hex extends HexCord {
  height: number;
  collision: boolean;
}

export interface HexCord {
  q: number;
  r: number;
}
