import { useEffect, useState } from "react";

import * as S from "pages/InvestmentProducts/InvestmentProducts.styles";

import SearchFilter from "components/SearchFilter/SearchFilter";
import ProductList from "components/ProductList/ProductList";

export default function InvestmentProducts() {
  return (
    <S.Container>
      <h1>최근 투자 목록</h1>
      <SearchFilter />
      <ProductList />
    </S.Container>
  );
}
