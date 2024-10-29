import {ChangeDetectorRef, Component, computed, effect, inject, input} from '@angular/core';
import {HexFieldComponent} from "../hex-field/hex-field.component";
import {NgStyle} from "@angular/common";
import {HexHeight} from "../../../models/hex-height.enum";
import {HexGridCell} from "../../../models/hex-grid.model";
import {SMALL_GRID} from "../../../consts/small-grid.const";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-hex-fields',
  standalone: true,
  imports: [
    HexFieldComponent,
    NgStyle
  ],
  templateUrl: './hex-fields.component.svg',
  styleUrl: './hex-fields.component.scss'
})
export class HexFieldsComponent {

  grid: Hex[] = [];
  size = 30;
  svgWidth = 800;
  svgHeight = 600;
  verticalScale = 0.7;


  playerPosition: HexCoord = { q: 0, r: 0 };
  destination: HexCoord | null = null;
  path: HexCoord[] = [];

  currentStep: number = 0;
  stepStartTime: number = 0;
  stepDuration: number = 1000;
  animationFrameId: number | null = null;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    this.generateGrid();
  }

  generateGrid() {
    const numRows = 5;
    const numCols = 5;

    for (let r = 0; r < numRows; r++) {
      const rOffset = Math.floor(r / 2);
      for (let q = -rOffset; q < numCols - rOffset; q++) {
        const height = Math.floor(Math.random() * 3) * 5;
        const collision = Math.random() < 0.1
        this.grid.push(
          {
            q,
            r,
            height,
            collision
          });
      }
    }
  }

  hexToPixel(hex: HexBase): { x: number; y: number } {
    const x = this.size * Math.sqrt(3) * (hex.q + hex.r / 2);
    const y = this.size * (3 / 2) * hex.r * this.verticalScale;
    return { x, y };
  }

  calculatePath(start: HexCoord, end: HexCoord): HexCoord[] {
    const distance = this.hexDistance(start, end);
    const path: HexCoord[] = [];

    for (let i = 0; i <= distance; i++) {
      const t = distance === 0 ? 0 : i / distance;
      const coord = this.hexRound(this.hexLerp(start, end, t));
      path.push(coord);
    }

    return path;
  }

  hexLerp(a: HexCoord, b: HexCoord, t: number): { q: number; r: number } {
    return {
      q: a.q + (b.q - a.q) * t,
      r: a.r + (b.r - a.r) * t,
    };
  }

  hexRound(coord: { q: number; r: number }): HexCoord {
    let q = Math.round(coord.q);
    let r = Math.round(coord.r);
    const s = -q - r;

    const q_diff = Math.abs(q - coord.q);
    const r_diff = Math.abs(r - coord.r);
    const s_diff = Math.abs(s - (-coord.q - coord.r));

    if (q_diff > r_diff && q_diff > s_diff) {
      q = -r - s;
    } else if (r_diff > s_diff) {
      r = -q - s;
    }

    return { q, r };
  }

  hexDistance(a: HexCoord, b: HexCoord): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }

  getHexCorners(hex: Hex): { x: number; y: number }[] {
    const corners = [];
    const center = this.hexToPixel(hex);
    const angleOffset = Math.PI / 6;

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + angleOffset;
      const x = center.x + this.size * Math.cos(angle);
      const y = center.y + this.size * Math.sin(angle) * this.verticalScale;
      corners.push({ x, y });
    }

    return corners;
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
        (h) => h.q === neighborQ && h.r === neighborR && !h.collision
      );
      if (neighbor) {
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }

  heuristic(a: HexBase, b: HexBase): number {
    return this.hexDistance(a, b);
  }

  drawHex(hex: Hex): SafeHtml {
    const corners = this.getHexCorners(hex);
    const height = hex.height;

    const topFacePoints = corners
      .map((p) => `${p.x},${p.y - height}`)
      .join(' ');

    const frontSidesIndices = [0, 1, 5];

    let sides = '';
    for (let i of frontSidesIndices) {
      const nextIndex = (i + 1) % 6;
      const p1 = corners[i];
      const p2 = corners[nextIndex];

      sides += `
        <polygon points="
          ${p1.x},${p1.y}
          ${p2.x},${p2.y}
          ${p2.x},${p2.y - height}
          ${p1.x},${p1.y - height}
        "  fill="#503915" stroke="black" stroke-width="1" />
      `;
    }

    const svg = `
      <g>
        ${sides}
        <polygon
            points="${topFacePoints}"
            fill="${this.getFillColor(hex)}"
            stroke="black"
            stroke-width="1" />
      </g>
    `;

    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  getFillColor(hex: Hex): string {
    return hex.collision ? '#802509' : '#1c571c'
  }

  get sortedGrid(): Hex[] {
    return this.grid.slice().sort((a, b) => {
      const aY = this.hexToPixel(a).y - a.height;
      const bY = this.hexToPixel(b).y - b.height;
      return aY - bY;
    });
  }

  onHexClick(hex: Hex) {
    this.destination = { q: hex.q, r: hex.r };
    this.path = this.calculatePath(this.playerPosition, this.destination);
    console.log(this.path)
    this.startMovement();
  }

  startMovement() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.currentStep = 0;
    this.stepStartTime = performance.now();
    this.animateMovement();
  }

  animateMovement = () => {
    if (this.currentStep >= this.path.length - 1) {
      // Ruch zakończony
      this.playerPosition = this.path[this.path.length - 1];
      this.animationFrameId = null;
      this.cdr.markForCheck();
      return;
    }

    const now = performance.now();
    const elapsed = now - this.stepStartTime;
    const t = Math.min(elapsed / this.stepDuration, 1);

    const start = this.path[this.currentStep];
    const end = this.path[this.currentStep + 1];

    // Interpolacja pozycji gracza
    const interpolatedPosition = this.interpolatePosition(start, end, t);
    this.playerPosition = interpolatedPosition;
    this.cdr.markForCheck();

    if (t >= 1) {
      // Przejdź do następnego kroku
      this.currentStep++;
      this.stepStartTime = now;
    }

    // Kontynuuj animację
    this.animationFrameId = requestAnimationFrame(this.animateMovement);
  };

  interpolatePosition(start: HexBase, end: HexBase, t: number): HexBase {
    return {
      q: start.q + (end.q - start.q) * t,
      r: start.r + (end.r - start.r) * t,
    };
  }

  drawPlayer(): SafeHtml {
    const { x, y } = this.hexToPixel(this.playerPosition);
    const radius = this.size / 3;

    const circle = `
    <circle cx="${x}" cy="${y - (this.getHeightAt(this.playerPosition) || 0)}" r="${radius}" fill="red" stroke="black" stroke-width="1" />
  `;

    return this.sanitizer.bypassSecurityTrustHtml(circle);
  }

  getHeightAt(coord: HexBase): number {
    // Znajdź sąsiadujące heksagony
    const q = coord.q;
    const r = coord.r;

    const q_floor = Math.floor(q);
    const r_floor = Math.floor(r);

    const hexes = [
      this.grid.find(h => h.q === Math.floor(q) && h.r === Math.floor(r)),
      this.grid.find(h => h.q === Math.ceil(q) && h.r === Math.floor(r)),
      this.grid.find(h => h.q === Math.floor(q) && h.r === Math.ceil(r)),
      this.grid.find(h => h.q === Math.ceil(q) && h.r === Math.ceil(r)),
    ].filter(h => h !== undefined) as Hex[];

    if (hexes.length === 0) return 0;

    // Proste uśrednienie wysokości sąsiadujących heksagonów
    const averageHeight = hexes.reduce((sum, h) => sum + h.height, 0) / hexes.length;

    return averageHeight;
  }

  findPath(start: HexBase, end: HexBase): HexBase[] {
    const openSet: Hex[] = [];
    const cameFrom = new Map<string, HexBase>();
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
      // Znajdź heksagon z najniższym fScore
      openSet.sort(
        (a, b) => fScore.get(this.hashHex(a))! - fScore.get(this.hashHex(b))!
      );
      const current = openSet.shift()!;

      if (current.q === endHex.q && current.r === endHex.r) {
        // Znaleziono ścieżkę
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
            tentativeGScore + this.heuristic(neighbor, endHex)
          );

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    // Nie znaleziono ścieżki
    return [];
  }
  hashHex(hex: HexBase): string {
    return `${hex.q},${hex.r}`;
  }

  moveCost(a: Hex, b: Hex): number {
    // Możesz uwzględnić różnicę wysokości jako dodatkowy koszt
    // const heightDifference = Math.abs(a.height - b.height);
    // return 1 + heightDifference;

    return 1; // Stały koszt
  }

  reconstructPath(cameFrom: Map<string, HexBase>, current: HexBase): HexBase[] {
    const totalPath = [current];
    while (cameFrom.has(this.hashHex(current))) {
      current = cameFrom.get(this.hashHex(current))!;
      totalPath.push(current);
    }
    return totalPath.reverse();
  }

  getHexAt(cord: HexBase): Hex | undefined {
    return this.grid.find(
      (h) => h.q === cord.q && h.r === cord.r && !h.collision
    );
  }
}

interface HexBase {
  q: number;
  r: number;
}

interface Hex extends HexBase {
  height: number;
  collision: boolean
}


interface HexCoord {
  q: number;
  r: number;
}
