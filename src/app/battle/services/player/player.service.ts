import { Injectable } from '@angular/core';
import { HexCord } from '../../models/hex.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(public playerPosition: HexCord) {}

  movePlayer(destination: HexCord) {
    // Handle player movement logic
  }
}
