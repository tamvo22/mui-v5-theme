# Next.js + MUI 5 Light/Dark Mode Theme + TypeScript example

## The idea behind the example

One of the challenges when working with MUI and Next.js is the styling and overriding of MUI's default theme styles. In this example, we will extend the existing project [MUI 5 + Next.js + TypeScript example](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript) by adding a persistent light and dark mode feature while overriding existing MUI styles with MUI Emotion Styled Components.

## Starter project

This project is based on the starter [MUI 5 + Next.js + TypeScript example](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript).

## CodeSandbox

[![CodeSandbox Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/tamvo22/mui-v5-theme)

## Objective

This project's objective is to achieve persistent togglable light and dark mode functionality using local storage or a user's system preferred color scheme. In order to achieve this goal, we would need to do the following:

- Retrieve the theme mode before the page renders by injecting a custom script into Next.js' Document by using [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) and [IIFEs (Immediately Invoked Function Expressions)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

- Set the theme mode to <html> theme-mode attribute and set the CSS variable to be passed to the toggle component

- Save user theme mode to local storage on toggle change

- Set document CSS background-color variable to avoid the inital white flicker


## Key points

- One major change to MUI 5 is that in order to override MUI styles easily, we would need to 'prepend' emotion cache to the top of `<head>`.

```jsx
// src/createEmotionCache.ts
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
```

- We will be extending the [MUI v5 Dark Mode Example](https://mui.com/material-ui/customization/dark-mode) to implement our own useDarkMode.

```jsx
const themeMode = useMemo(
  () => ({
    toggleThemeMode: () => {
      modeSet((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }),
  [],
);
```

- On some occasions, some users will experience [FOUC (flash of unstyled content) issue with Next.js](https://github.com/vercel/next.js/issues/18769). To prevent FOUC loading conflicts, we can simply display a hidden div before our component is  ready.


```jsx
// src/components/themes/MuiThemeProvider

// prevent FOUC white flash
if (!mounted || !mode) {
  return <div style={{ visibility: 'hidden' }}></div>;
}
```


## Overview: Overriding the default MUI 5 theme

The first step in theming MUI 5 is to setup [global theme component defaults](https://mui.com/material-ui/customization/theme-components/) such as text, links, buttons, etc. By using theme component override, we can override MUI default styles. 


```jsx
// src/styles/components/MuiLink.ts
export default function MuiLink(mode: PaletteMode) {
  return {
    // Create Variant types
    variants: [],
    // Set default props
    defaultProps: {},
    // Override global styles
    styleOverrides: {
      root: {
        color: mode === 'dark' ? '#fff' : 'red',
        textDecoration: 'none',
        '&:hover,&:focus': {
          color: mode === 'dark' ? '#fff' : 'blue',
          textDecoration: 'underline',
        },
      },
    },
  };
}

// src/styles/theme.ts
export const getTheme = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#fff' : '#055f86',
      },
      secondary: {
        main: mode === 'dark' ? '#fff' : '#41c8e3',
      },
      background: {
        default: mode === 'dark' ? '#000' : '#f8fcff',
      },
    },
    components: {
      MuiTypography: MuiTypography(mode),
      MuiLink: MuiLink(mode),
    },
  };
};
```

Next, we will use Emotion Styled Components to customize specific components such as our Navbar menu links. I believe this would be the most efficient way to override MUI's default styles or create your own custom styles.

```jsx
// src/components/ui/Navbar/styled.tsx
export const Link = styled(NextLink)`
  font-size: 18px;
  color: #fff;
  margin-right: 48px;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.palette.secondary.main};
    text-decoration: none;
  }
`;
```

## Let's get started


#### The useDarkMode function
It's time we dive into implementing our Light and Dark theme mode functionality. Here, we will implement the useDarkMode function to retrieve the <html> "theme-mode" attribute and use the toggler setter function to set the theme mode. If the toggler mode value changes, we will save the theme mode to local storage.

```jsx
// src/_utils/hooks/useDarkMode.ts
export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

export function useDarkMode() {
  const [mode, modeSet] = useState<'light' | 'dark' | undefined>(undefined);

  // MUI theme mode setter function
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        modeSet((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // Set client theme state recieved from _document document.documentElement.setAttribute: theme-mode
  useEffect(() => {
    const dataTheme = document.documentElement.getAttribute('theme-mode');
    if (dataTheme) {
      modeSet(dataTheme as PaletteMode);
    }
  }, []);

  // Store selected theme to local storage when mode changes
  useEffect(() => {
    if (mode) {
      window.localStorage.setItem('theme-mode', mode);
    }
  }, [mode]);

  return { mode, themeMode };
}
```

#### The _document custom script

Here, we created a custom script to get the initial theme mode from local storage or the user's system color preference before the page loaded. We achieved this by injecting a custom script into Next.js' document using [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) and [IIFEs (Immediately Invoked Function Expressions)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

```jsx
// src/_utils/hooks/useDarkMode.ts
export function getInitialThemeMode() {
  function getSavedThemeMode() {
    // get theme mode from local storage
    const localMode = window.localStorage.getItem('theme-mode');
    if (typeof localMode === 'string') return localMode;

    // get theme mode from user's system color preference
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mql.matches === 'boolean') return mql.matches ? 'dark' : 'light';

    return 'light';
  }

  const themeMode = getSavedThemeMode();

  // set <html> "theme-mode" attribute 
  if (themeMode === 'dark') document.documentElement.setAttribute('theme-mode', 'dark');
  else document.documentElement.setAttribute('theme-mode', 'light');
}

// script string function
export const InitialThemeMode = `(function() {
    ${getInitialThemeMode.toString()}
    getInitialThemeMode();
})()
`;


// pages/_document.tsx
import { InitialThemeMode } from '@/utils/hooks/useDarkMode';

...

// Inject custom 
    const initTheme = (
      <script
        key={'theme-mode'}
        dangerouslySetInnerHTML={{
          __html: InitialThemeMode,
        }}></script>
    );

    return {
      ...initialProps,
      emotionStyleTags,
      initTheme,
    };

...
```

#### The MuiThemeProvider component

In our MuiThemeProvider, we will need to use useDarkMode to get the theme mode and pass it to our ThemeModeContext.Provider down to our React component tree. We also added the [Next.js persist page state getLayout](https://nextjs.org/docs/basic-features/layouts) for our Navbar menu. You can read more about it on the Next.js layout page. We can implement the FOUC flash hidden div prevention here. Lastly, we will need to add MuiThemeProvider to our Next.js _app.tsx.

```jsx
// src/components/themes/MuiThemeProvider
export default function MuiThemeProvider({ Component, children }: DarkThemeProvider) {
  const [mounted, setMounted] = useState(false);

  // Get theme mode and toggle setter function from useDarkMode
  const { mode, themeMode } = useDarkMode();
  // Set MUI theme according to the theme mode
  const theme = useMemo(() => responsiveFontSizes(createTheme(getTheme(mode!))), [mode]);

  // Next.js Per-Page layout
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Prevent FOUC flash before page renders
  if (!mounted || !mode) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme!}>
        <CssBaseline />
        {getLayout(children)}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
```
#### Styles.css -> CSS theme-mode variable background-color

The final step is to set the document's CSS background-color variable to match our theme background-color to avoid the initial white flicker. Although this approach works in production, we will occasionally experience the white flicker while working in development.

```css
[theme-mode="light"] {
  --color-background: #edf7ff;
}

[theme-mode="dark"] {
  --color-background: #000;
}

body {
  margin: 0;
  background-color: var(--color-background);
  transition: 0.2s ease-out;
}
```

## Conclusion

This is how we achieve persistent togglable light and dark mode functionality with Next.js and MUI 5. There are a few challenges in developing this project which I covered, and I hope this example will inspire others to implement MUI light and dark mode as well. I hope you enjoy this small starter porfolio project and stay tuned for more exciting projects to come.