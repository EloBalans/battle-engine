export class SVGRenderer {
  static drawCircle(
    cx: number,
    cy: number,
    radius: number,
    fill: string
  ): string {
    return `
      <circle
        cx="${cx}"
        cy="${cy}"
        r="${radius}"
        fill="${fill}"
        stroke="black"
        stroke-width="1"
      />
    `;
  }

  static drawHex(
    corners: { x: number; y: number }[],
    height: number,
    fillColor: string
  ): string {
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
        " fill="#503915" stroke="black" stroke-width="1" />
      `;
    }

    return `
      <g>
        ${sides}
        <polygon
          points="${topFacePoints}"
          fill="${fillColor}"
          stroke="black"
          stroke-width="1"
        />
      </g>
    `;
  }
}
