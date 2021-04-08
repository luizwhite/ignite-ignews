import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export const rootColors = {
  yellow500: '#eba417',
  cyan500: '#61dafb',
  green: '#04d361',
  gray500: '#737380',
};

export default styled.createGlobalStyle`
  :root {
    --white: #ffffff;

    --green: ${rootColors.green};

    --gray-100: #e1e1e6;
    --gray-300: #a8a8b3;
    --gray-500: ${rootColors.gray500};
    --gray-700: #323238;
    --gray-800: #29292a;
    --gray-850: #1f2729;
    --gray-900: #121214;

    --cyan-500: ${rootColors.cyan500};

    --yellow-500: ${rootColors.yellow500};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    margin-left: calc(100vw - 100%);
  }

  @media (max-width: 1080px) {
    html {
      font-size: calc(calc(15 / 16) * 100%);
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: calc(calc(14 / 16) * 100%);
    }
  }

  body {
    background-color: var(--gray-900);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  input,
  select,
  button,
  textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }

  a,
  button {
    cursor: pointer;
    border: none;
  }

  input {
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
