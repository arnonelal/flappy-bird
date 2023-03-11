import { vhScaleFactor } from "./GameConsts";

export function scaledPxToVh(px: number, returnNumberOnly?: boolean): string {
  return (px * vhScaleFactor) + (returnNumberOnly ? '' : 'vh');
} //todo put in all components
//todo maybe replace all weird vh estinations by scaledPx