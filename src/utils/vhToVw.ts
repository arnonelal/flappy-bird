export function vhToVw(vh: number): number {
  const px = window.innerHeight * vh / 100;
  return 100 * px / window.innerWidth;
}

export function vwToVh(vw: number): number {
  const px = window.innerWidth * vw / 100;
  return 100 * px / window.innerHeight;
}