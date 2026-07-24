export const colorTokens = {
  background: "#F5F6F2",
  surface: "#FFFFFF",
  surfaceMuted: "#EEF1ED",
  text: "#17201D",
  textMuted: "#58645F",
  accent: "#39D98A",
  accentStrong: "#123D2C",
  accentText: "#123D2C",
  border: "#BCC7C1",
  borderStrong: "#6A756F",
  warning: "#7A4A08",
  warningSoft: "#FFF3D9",
  error: "#8A2F35",
  errorSoft: "#FCE8E9",
  info: "#255A82",
  infoSoft: "#E8F2FA",
  focus: "#255A82",
} as const;

export const spacingTokens = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  16: "4rem",
} as const;

export const radiusTokens = {
  small: "0.25rem",
  control: "0.5rem",
  panel: "0.75rem",
  pill: "999px",
} as const;

export const motionTokens = {
  fast: "120ms",
  standard: "180ms",
  panel: "240ms",
} as const;
