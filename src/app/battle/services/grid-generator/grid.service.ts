import { Injectable } from '@angular/core';
import { Hex } from '../../models/hex.model';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  generateGrid(numRows = 5, numCols = 5): Hex[] {
    const grid: Hex[] = [];

    for (let r = 0; r < numRows; r++) {
      const rOffset = Math.floor(r / 2);
      for (let q = -rOffset; q < numCols - rOffset; q++) {
        const height = Math.floor(Math.random() * 3) * 5;
        const collision = Math.random() < 0.1;
        grid.push({ q, r, height, collision });
      }
    }

    return grid;
  }
}
