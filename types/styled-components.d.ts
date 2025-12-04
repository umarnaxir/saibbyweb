import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: string;
    bg: string;
    mode: 'light' | 'dark';
    secondary: string;
  }
}

