export function* points(
  n,
  { a = 1, b = 1, xOff = 0, yOff = 0, count = 128 } = {},
) {
  const exp = 2 / n;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const cosSign = Math.sign(cos);
    const sinSign = Math.sign(sin);
    const x = a * cosSign * (cosSign * cos) ** exp + xOff * cosSign;
    const y = b * sinSign * (sinSign * sin) ** exp + yOff * sinSign;
    yield { x, y };
  }
}

export function path(iter) {
  const { x: xInit, y: yInit } = iter.next().value;
  let out = `M ${xInit} ${yInit}`;
  for (const { x, y } of iter) {
    out += ` L ${x} ${y}`;
  }
  out += " Z";
  return out;
}
