import { createTheme } from "@shopify/restyle";

const palette = {
  // Primary - Purple/Violet
  primary100: "#F3E8FF",
  primary200: "#E9D5FF",
  primary300: "#D8B4FE",
  primary400: "#C084FC",
  primary500: "#A855F7",
  primary600: "#9333EA",
  primary700: "#7E22CE",
  primary800: "#6B21A8",
  primary900: "#581C87",

  // Secondary - Teal/Cyan
  secondary100: "#CCFBF1",
  secondary200: "#99F6E4",
  secondary300: "#5EEAD4",
  secondary400: "#2DD4BF",
  secondary500: "#14B8A6",
  secondary600: "#0D9488",
  secondary700: "#0F766E",
  secondary800: "#115E59",
  secondary900: "#134E4A",

  // Accent - Coral/Pink
  accent100: "#FFE4E6",
  accent200: "#FECDD3",
  accent300: "#FDA4AF",
  accent400: "#FB7185",
  accent500: "#F43F5E",
  accent600: "#E11D48",
  accent700: "#BE123C",
  accent800: "#9F1239",
  accent900: "#881337",

  // Neutrals - Gray Scale
  gray50: "#FAFAFA",
  gray100: "#F4F4F5",
  gray200: "#E4E4E7",
  gray300: "#D4D4D8",
  gray400: "#A1A1AA",
  gray500: "#71717A",
  gray600: "#52525B",
  gray700: "#3F3F46",
  gray800: "#27272A",
  gray900: "#18181B",

  // Semantic Colors - Success (Green)
  success50: "#ECFDF5",
  success100: "#D1FAE5",
  success200: "#A7F3D0",
  success300: "#6EE7B7",
  success400: "#34D399",
  success500: "#10B981",
  success600: "#059669",
  success700: "#047857",
  success800: "#065F46",
  success900: "#064E3B",

  // Warning (Yellow/Orange)
  warning50: "#FFFBEB",
  warning100: "#FEF3C7",
  warning200: "#FDE68A",
  warning300: "#FCD34D",
  warning400: "#FBBF24",
  warning500: "#F59E0B",
  warning600: "#D97706",
  warning700: "#B45309",
  warning800: "#92400E",
  warning900: "#78350F",

  // Error (Red)
  error50: "#FEF2F2",
  error100: "#FEE2E2",
  error200: "#FECACA",
  error300: "#FCA5A5",
  error400: "#F87171",
  error500: "#EF4444",
  error600: "#DC2626",
  error700: "#B91C1C",
  error800: "#991B1B",
  error900: "#7F1D1D",

  // Info (Blue)
  info50: "#EFF6FF",
  info100: "#DBEAFE",
  info200: "#BFDBFE",
  info300: "#93C5FD",
  info400: "#60A5FA",
  info500: "#3B82F6",
  info600: "#2563EB",
  info700: "#1D4ED8",
  info800: "#1E40AF",
  info900: "#1E3A8A",

  // Base Colors
  black: "#000000",
  white: "#FFFFFF",
  transparent: "transparent",
};

const theme = createTheme({
  colors: {
    // Todas as cores da paleta disponíveis para uso com Restyle
    ...palette,

    // Main
    mainBackground: palette.white,
    mainForeground: palette.gray900,

    // Card
    cardPrimaryBackground: palette.primary600,
    cardSecondaryBackground: palette.secondary500,
    cardAccentBackground: palette.accent500,
    cardBackground: palette.white,

    // Card Status Backgrounds
    cardSuccessBackground: palette.success50,
    cardSuccessBorder: palette.success500,
    cardSuccessText: palette.success700,

    cardInfoBackground: palette.info50,
    cardInfoBorder: palette.info500,
    cardInfoText: palette.info700,

    cardWarningBackground: palette.warning50,
    cardWarningBorder: palette.warning500,
    cardWarningText: palette.warning700,

    cardErrorBackground: palette.error50,
    cardErrorBorder: palette.error500,
    cardErrorText: palette.error700,

    // Text
    textPrimary: palette.gray900,
    textSecondary: palette.gray600,
    textTertiary: palette.gray400,
    textInverse: palette.white,
    textLink: palette.primary600,

    // Border
    border: palette.gray200,
    borderFocus: palette.primary500,
    borderError: palette.error500,

    // Button
    buttonPrimary: palette.primary600,
    buttonPrimaryText: palette.white,
    buttonSecondary: palette.secondary600,
    buttonSecondaryText: palette.white,
    buttonDisabled: palette.gray300,
    buttonDisabledText: palette.gray500,

    // Status
    success: palette.success500,
    successLight: palette.success50,
    successDark: palette.success700,

    warning: palette.warning500,
    warningLight: palette.warning50,
    warningDark: palette.warning700,

    error: palette.error500,
    errorLight: palette.error50,
    errorDark: palette.error700,

    info: palette.info500,
    infoLight: palette.info50,
    infoDark: palette.info700,

    // Interactive
    overlay: "rgba(0, 0, 0, 0.5)",
    shadow: "rgba(0, 0, 0, 0.1)",
    hover: palette.gray100,
    pressed: palette.gray200,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    full: 9999,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
      color: "textPrimary",
    },
    subheader: {
      fontWeight: "600",
      fontSize: 24,
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: "textPrimary",
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
      color: "textSecondary",
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      color: "textTertiary",
    },
    defaults: {
      fontSize: 16,
      color: "textPrimary",
    },
  },
});

export type Theme = typeof theme;
export { palette };
export default theme;
