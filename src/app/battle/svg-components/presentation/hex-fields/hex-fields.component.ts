import {
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { HexFieldComponent } from '../hex-field/hex-field.component';
import { NgStyle } from '@angular/common';
import { HexPathfinderService } from '../../../services/hex-pathfinder/hex-pathfinder.service';
import { GridService } from '../../../services/grid-generator/grid.service';
import { Hex, HexCord } from '../../../models/hex.model';
import { HexGeometry } from '../../../utilities/hex-gemetry.utility';
import { HexInterpolator } from '../../../utilities/hex-interpolation.utility';
import { SIZE_TOKEN, VERTICAL_SCALE_TOKEN } from '../../../consts/tokens.const';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-hex-fields',
  standalone: true,
  imports: [HexFieldComponent, NgStyle, UnitComponent],
  templateUrl: './hex-fields.component.svg',
  styleUrl: './hex-fields.component.scss',
})
export class HexFieldsComponent {
  grid: Hex[] = [];
  svgWidth = 800;
  svgHeight = 600;

  playerPosition: HexCord = { q: 0, r: 0 };
  destination: HexCord | null = null;
  path: HexCord[] = [];

  currentStep = 0;
  stepStartTime = 0;
  stepDuration = 1000;
  animationFrameId: number | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private hexPathfinder: HexPathfinderService,
    private gridService: GridService,
    @Inject(SIZE_TOKEN) private size: number,
    @Inject(VERTICAL_SCALE_TOKEN) private verticalScale: number,
  ) {
    this.grid = this.gridService.generateGrid();
    this.hexPathfinder.setGrid(this.grid);
  }

  get sortedGrid(): Hex[] {
    return this.grid.slice().sort((a, b) => {
      const aY =
        HexGeometry.hexToPixel(a, this.size, this.verticalScale).y - a.height;
      const bY =
        HexGeometry.hexToPixel(b, this.size, this.verticalScale).y - b.height;
      return aY - bY;
    });
  }

  onHexClick(hex: Hex) {
    this.destination = { q: hex.q, r: hex.r };
    this.path = this.hexPathfinder.findPathWithCollisions(
      this.playerPosition,
      this.destination,
    );
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

    this.playerPosition = HexInterpolator.interpolate(start, end, t);
    this.cdr.markForCheck();

    if (t >= 1) {
      this.currentStep++;
      this.stepStartTime = now;
    }

    this.animationFrameId = requestAnimationFrame(this.animateMovement);
  };
}
