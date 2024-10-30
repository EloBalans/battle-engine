import {InjectionToken} from "@angular/core";

export const SIZE_TOKEN = new InjectionToken<number>('SIZE_TOKEN', {
  providedIn: 'root',
  factory: () => 30,
});

export const VERTICAL_SCALE_TOKEN = new InjectionToken<number>('VERTICAL_SCALE_TOKEN', {
  providedIn: 'root',
  factory: () => 0.7,
});
