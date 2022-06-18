export {}

declare module '@mui/material/styles' {
  // Palette
  interface Palette {
    main: Palette['primary']
    base: Palette['primary']
    accent: Palette['primary']
    clubMain: Palette['primary']
    clubBase: Palette['primary']
    clubAccent: Palette['primary']
  }
  interface PaletteOptions {
    main?: PaletteOptions['primary']
    base?: PaletteOptions['primary']
    accent?: PaletteOptions['primary']
    clubMain?: PaletteOptions['primary']
    clubBase?: PaletteOptions['primary']
    clubAccent?: PaletteOptions['primary']
  }

  // Typography
  interface TypographyVariants {
    logoHeader: React.CSSProperties;
    logoTop: React.CSSProperties;
    text: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    logoHeader?: React.CSSProperties;
    logoTop?: React.CSSProperties;
    text?: React.CSSProperties;
  }

  // Breakpoint
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
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
    text: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    main: true;
    accent: true;
    clubAccent: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    accent: true;
  }
}
