import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {ReactQueryDevtools} from 'react-query/devtools';
import Router from "./routes/Router";
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./theme";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {isDarkAtom} from "./atoms";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    font-family: 'Noto Sans', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor}
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  * {
    box-sizing: border-box;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

// toggle
const CheckBoxWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;

    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

function App() {
    // get value
    const isDark = useRecoilValue(isDarkAtom);
    // set function
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    // toggle change isDark
    const toggleDarkMode = () => setDarkAtom(prev => !prev);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <CheckBoxWrapper>
                <CheckBox id="checkbox" type="checkbox" onChange={toggleDarkMode}/>
                <CheckBoxLabel htmlFor="checkbox"/>
            </CheckBoxWrapper>
            <GlobalStyle/>
            <Router/>
            <ReactQueryDevtools/>
        </ThemeProvider>
    );
}

export default App;
