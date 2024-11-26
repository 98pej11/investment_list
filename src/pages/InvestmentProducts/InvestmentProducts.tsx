import SearchFilter from "components/SearchFilter/SearchFilter";
import ProductList from "components/ProductList/ProductList";

import * as S from "pages/InvestmentProducts/InvestmentProducts.styles";

export default function InvestmentProducts() {
  return (
    <S.Container>
      <S.Title>최근 투자 목록</S.Title>
      <SearchFilter />
      <ProductList />
    </S.Container>
  );
}
