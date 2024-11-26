import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Loading from "components/Loading/Loading";

import * as S from "App.styles";
import { lightTheme, darkTheme } from "styles/theme";
import { GlobalStyle } from "styles/globalStyle";

import { ReactComponent as Light } from "static/light.svg";
import { ReactComponent as Dark } from "static/dark.svg";

const InvestmentProducts = lazy(
  () => import("./pages/InvestmentProducts/InvestmentProducts")
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  /** 사용자 테마 설정 localStorage에서 get */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  /** 테마 변경 시 localStorage에 set*/
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <S.Header>
        <S.Wrapper onClick={toggleTheme}>
          {isDarkMode ? (
            <S.Icon className="dark">
              <Dark />
            </S.Icon>
          ) : (
            <S.Icon className="light">
              <Light />
            </S.Icon>
          )}
          <S.Toggle />
        </S.Wrapper>
      </S.Header>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<InvestmentProducts />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
