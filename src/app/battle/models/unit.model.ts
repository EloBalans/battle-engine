export interface Unit {
  name: string;
  class: 'warrior' | 'mage' | 'thief';
  stats: {
    hp: number;
    attack: number;
    defense: number;
    critical: number;
    range: number;
    initiative: number;
    movement: number;
  };
}
