export function getRandomHexColor() {
    const hue = Math.floor(Math.random() * 360);

    const saturation = Math.floor(Math.random() * 31) + 70;

    const lightness = Math.floor(Math.random() * 16) + 75;

  const hslToRgb = (h, s, l) => {
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
          l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  };

  const rgb = hslToRgb(hue, saturation, lightness);

  const rgbToHex = (r, g, b) =>
      '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const value = rgbToHex(rgb[0], rgb[1], rgb[2]) ;

  console.log(value)
  return value
}

