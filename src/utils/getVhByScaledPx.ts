import { vhScaleFactor } from "./GameConsts";

export function scaledPxToVh(px: number): string {
  return (px * vhScaleFactor) + 'vh';
} //todo put in all components
//todo maybe replace all weird vh estinations by scaledPx