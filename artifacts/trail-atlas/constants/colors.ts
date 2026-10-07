/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#1A2D24',
    tint: '#365C45',

    // Core surfaces
    background: '#F3F1E8',
    foreground: '#1A2D24',

    // Cards / elevated surfaces
    card: '#FCFBF6',
    cardForeground: '#1A2D24',

    // Primary action color (buttons, links, active states)
    primary: '#294A37',
    primaryForeground: '#F5F3E9',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E5E9DD',
    secondaryForeground: '#294A37',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EAE9DF',
    mutedForeground: '#747C70',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#D7AA63',
    accentForeground: '#26352B',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#DFE1D7',
    input: '#DFE1D7',
  },
  dark: {
    text: '#E9EAE1',
    tint: '#B6C89F',
    background: '#121A15',
    foreground: '#F0F0E8',
    card: '#1B2820',
    cardForeground: '#F0F0E8',
    primary: '#B6C89F',
    primaryForeground: '#1D3024',
    secondary: '#26352B',
    secondaryForeground: '#E6EBDD',
    muted: '#202C24',
    mutedForeground: '#A6B0A3',
    accent: '#D7AA63',
    accentForeground: '#26352B',
    destructive: '#F87171',
    destructiveForeground: '#2A1717',
    border: '#354239',
    input: '#354239',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 20,
};

export default colors;
