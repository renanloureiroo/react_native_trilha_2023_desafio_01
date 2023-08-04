interface IColors {
  //  Blue hex - #4EA8DE
  "primary-100": string;
  // Blue Dark hex - #1E6F9F
  "primary-200": string;

  // Purple hex - #8284FA
  "secondary-100": string;
  // Purple Dark hex - #5E60CE
  "secondary-200": string;
  "gray-100": string;
  "gray-200": string;
  "gray-300": string;
  "gray-400": string;
  "gray-500": string;
  "gray-600": string;
  "gray-700": string;
  "danger-100": string;
}

export const colors: IColors = {
  "primary-100": "#4EA8DE",
  "primary-200": "#1E6F9F",

  "secondary-100": "#8284FA",
  "secondary-200": "#5E60CE",

  "gray-100": "#F2F2F2",
  "gray-200": "#D9D9D9",
  "gray-300": "#808080",
  "gray-400": "#333333",
  "gray-500": "#262626",
  "gray-600": "#1A1A1A",
  "gray-700": "#0D0D0D",

  "danger-100": "#E25858",
};

export type ColorsType = keyof typeof colors;
