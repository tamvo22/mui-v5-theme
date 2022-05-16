import { Theme, ThemeOptions } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ComponentProps {
    component: React.ElementType<any>;
  }
  interface Theme {}
  interface ThemeOptions {}
  interface Palette {}
  interface PaletteOptions {}
}
