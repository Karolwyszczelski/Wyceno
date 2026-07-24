const channelToLinear = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = (hex: string): number => {
  const normalized = hex.replace("#", "");
  if (!/^[\dA-Fa-f]{6}$/.test(normalized)) {
    throw new Error(`Nieprawidłowy kolor szesnastkowy: ${hex}`);
  }

  const channels = [0, 2, 4].map((offset) =>
    channelToLinear(Number.parseInt(normalized.slice(offset, offset + 2), 16)),
  );
  const [red = 0, green = 0, blue = 0] = channels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrastRatio = (foreground: string, background: string): number => {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};
