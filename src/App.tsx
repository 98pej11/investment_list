import React, { useState, useEffect } from "react";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "theme";
import * as S from "App.styles";
import InvestmentProducts from "pages/InvestmentProducts/InvestmentProducts";

const ProductList = lazy(() => import("./components/ProductList/ProductList"));

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 사용자 테마 설정을 localStorage에서 가져오기
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // 테마 변경 함수
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light"); // localStorage에 테마 저장
      return newTheme;
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <S.Header>
        <div>다크모드 설정</div>
        <S.Wrapper onClick={toggleTheme}>
          <S.Toggle /> {/* Toggle에만 isDarkMode 전달 */}
        </S.Wrapper>
      </S.Header>
      <Routes>
        <Route path="/" element={<InvestmentProducts />} />
      </Routes>
    </ThemeProvider>
  );
}
