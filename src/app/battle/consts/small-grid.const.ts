import {HexHeight} from "../models/hex-height.enum";
import {HexGridCell} from "../models/hex-grid.model";

export const SMALL_GRID: HexGridCell[][] = [
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: true,
      heightBase: HexHeight.SMALL
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.SMALL
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.SMALL
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.SMALL
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.SMALL
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
  [
    {
      collision: false,
      heightBase: HexHeight.LARGE
    },
    {
      collision: true,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: true,
      heightBase: HexHeight.SMALL
    },
    {
      collision: false,
      heightBase: HexHeight.MEDIUM
    },
    {
      collision: false,
      heightBase: HexHeight.LARGE
    }
  ],
]
