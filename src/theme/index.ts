// Cores centralizadas do design system
export const COLORS = {
  // Backgrounds
  backgroundDark: '#0A1033',
  backgroundLight: '#0E1647',
  backgroundGradient: ['#0E1647', '#0A1033'] as const,

  // Primary
  primary: '#E61C44',
  primaryDark: '#991F36',

  // Cards
  cardGradientStart: '#272A6A',
  cardGradientEnd: '#1B1E4E',

  // Borders
  avatarBorderStart: '#243189',
  avatarBorderEnd: '#1B2565',

  // Texts
  heading: '#DDE3F0',
  body: '#ABB1CC',

  // Status
  host: '#E61C44',
  visitor: '#32BD50',

  // Overlay / Dividers
  divider: 'rgba(221, 227, 240, 0.08)',

  // Input fields
  inputBackground: '#1D2766',
  inputBorder: '#243189',
  inputGradient: ['#1D2766', '#171F52'] as const,

  // Modal
  modalGradient: ['#0A1033', '#0E1647'] as const,
  modalOverlay: 'rgba(0, 0, 0, 0.8)',

  // Secondary
  secondary: '#495BCC',

  white: '#FFFFFF',
};

// Fontes centralizadas
export const FONTS = {
  titleBold: 'Rajdhani_700Bold',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
};

// Constantes de layout para evitar números mágicos
export const LAYOUT = {
  buttonHeight: 56,
  inputHeight: 48,
  cardBorderRadius: 8,
  modalBorderRadius: 16,
  horizontalPadding: 24,
  headerHorizontalPadding: 20,
};

