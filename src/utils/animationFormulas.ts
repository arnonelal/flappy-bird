export function InOutQuadBlend(t: number) {
  if (t <= 0.5)
    return 2.0 * t * t;
  t -= 0.5;
  return 2.0 * t * (1.0 - t) + 0.5;
}