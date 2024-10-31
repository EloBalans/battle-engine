import { Injectable } from '@angular/core';
import { Hex, HexCord } from '../../models/hex.model';

@Injectable({
  providedIn: 'root',
})
export class HexPathfinderService {
  private grid: Hex[] = [];

  setGrid(grid: Hex[]) {
    this.grid = grid; // Store the grid for pathfinding
  }

  findPathWithCollisions(start: HexCord, end: HexCord): HexCord[] {
    const openSet: Hex[] = [];
    const cameFrom = new Map<string, HexCord>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    const startHex = this.getHexAt(start);
    const endHex = this.getHexAt(end);

    if (!startHex || !endHex) {
      return [];
    }

    openSet.push(startHex);
    gScore.set(this.hashHex(startHex), 0);
    fScore.set(this.hashHex(startHex), this.heuristic(startHex, endHex));

    while (openSet.length > 0) {
      openSet.sort(
        (a, b) => fScore.get(this.hashHex(a))! - fScore.get(this.hashHex(b))!,
      );
      const current = openSet.shift()!;

      if (current.q === endHex.q && current.r === endHex.r) {
        return this.reconstructPath(cameFrom, current);
      }

      const neighbors = this.getNeighbors(current);

      for (const neighbor of neighbors) {
        const tentativeGScore =
          gScore.get(this.hashHex(current))! + this.moveCost(current, neighbor);

        if (
          !gScore.has(this.hashHex(neighbor)) ||
          tentativeGScore < gScore.get(this.hashHex(neighbor))!
        ) {
          cameFrom.set(this.hashHex(neighbor), current);
          gScore.set(this.hashHex(neighbor), tentativeGScore);
          fScore.set(
            this.hashHex(neighbor),
            tentativeGScore + this.heuristic(neighbor, endHex),
          );

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  }

  findPathWithoutCollisions(start: HexCord, end: HexCord): HexCord[] {
    const distance = this.hexDistance(start, end);
    const path: HexCord[] = [];

    for (let i = 0; i <= distance; i++) {
      const t = distance === 0 ? 0 : i / distance;
      const cord = this.hexRound(this.hexLerp(start, end, t));
      path.push(cord);
    }

    return path;
  }

  reconstructPath(cameFrom: Map<string, HexCord>, current: HexCord): HexCord[] {
    const totalPath = [current];
    while (cameFrom.has(this.hashHex(current))) {
      current = cameFrom.get(this.hashHex(current))!;
      totalPath.push(current);
    }
    return totalPath.reverse();
  }

  hashHex(hex: HexCord): string {
    return `${hex.q},${hex.r}`;
  }

  getHexAt(cord: HexCord): Hex | undefined {
    console.log(cord);
    return this.grid.find(
      (h) => h.q === cord.q && h.r === cord.r && !h.collision,
    );
  }

  heuristic(a: HexCord, b: HexCord): number {
    return this.hexDistance(a, b);
  }

  hexDistance(a: HexCord, b: HexCord): number {
    return (
      (Math.abs(a.q - b.q) +
        Math.abs(a.q + a.r - b.q - b.r) +
        Math.abs(a.r - b.r)) /
      2
    );
  }

  hexLerp(a: HexCord, b: HexCord, t: number): { q: number; r: number } {
    return {
      q: a.q + (b.q - a.q) * t,
      r: a.r + (b.r - a.r) * t,
    };
  }

  hexRound(cord: { q: number; r: number }): HexCord {
    let q = Math.round(cord.q);
    let r = Math.round(cord.r);
    const s = -q - r;

    const q_diff = Math.abs(q - cord.q);
    const r_diff = Math.abs(r - cord.r);
    const s_diff = Math.abs(s - (-cord.q - cord.r));

    if (q_diff > r_diff && q_diff > s_diff) {
      q = -r - s;
    } else if (r_diff > s_diff) {
      r = -q - s;
    }

    return { q, r };
  }

  getNeighbors(hex: Hex): Hex[] {
    const directions = [
      { q: 1, r: 0 },
      { q: 1, r: -1 },
      { q: 0, r: -1 },
      { q: -1, r: 0 },
      { q: -1, r: 1 },
      { q: 0, r: 1 },
    ];

    const neighbors: Hex[] = [];

    for (const dir of directions) {
      const neighborQ = hex.q + dir.q;
      const neighborR = hex.r + dir.r;
      const neighbor = this.grid.find(
        (h) => h.q === neighborQ && h.r === neighborR && !h.collision,
      );
      if (neighbor) {
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }

  moveCost(a: Hex, b: Hex): number {
    // Możesz uwzględnić różnicę wysokości jako dodatkowy koszt
    // const heightDifference = Math.abs(a.height - b.height);
    // return 1 + heightDifference;

    return 1; // Stały koszt
  }
}
