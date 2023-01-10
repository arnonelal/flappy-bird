export function generateNumberFromDigits<T>(
  digits: T[], //10 total (0-9)
  int: number,
): T[] {
  if (!Number.isInteger(int)) throw new Error();
  if (digits.length !== 10) throw new Error();

  const str = int.toString();

  const out: T[] = [];

  for (let char of str) {
    const digit = digits[Number(char)];
    out.push(digit);
  }

  return out;
}