
export function encrypt(input: string) {
  let key = 'a' + 'b' + 'c' + 'd';
  let c = '';
  while (key.length < input.length) {
    key += key;
  }
  for (var i = 0; i < input.length; i++) {
    const value1 = input[i].charCodeAt(0);
    const value2 = key[i].charCodeAt(0);

    const xorValue = value1 ^ value2;

    let xorValueAsHexString = xorValue.toString(16);

    if (xorValueAsHexString.length < 2) {
      xorValueAsHexString = '0' + xorValueAsHexString;
    }

    c += xorValueAsHexString;
  }
  return c;
}