export {}

declare module '@mui/material/styles' {
  // Palette
  interface Palette {
    main: Palette['primary']
    base: Palette['primary']
    accent: Palette['primary']
  }
  interface PaletteOptions {
    main?: PaletteOptions['primary']
    base?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
  }

  // Typography
  interface TypographyVariants {
    logoHeader: React.CSSProperties;
    logoTop: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    logoHeader?: React.CSSProperties;
    logoTop?: React.CSSProperties;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    main: true
    base: true
    accent: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logoTop: true;
    logoHeader: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
