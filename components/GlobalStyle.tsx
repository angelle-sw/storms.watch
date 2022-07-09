import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    margin: 0;
    padding-bottom: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #050521;
    color: #fff;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue";
  }

  #__next {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #1a1b2f;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #42435d;
    border-radius: 20px;
    border: 3px solid #1a1b2f;
  }
`;
