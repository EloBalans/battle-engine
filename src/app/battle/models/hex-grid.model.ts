import { HexHeight } from './hex-height.enum';

export interface HexGridCell {
  collision: boolean;
  heightBase: HexHeight;
}
