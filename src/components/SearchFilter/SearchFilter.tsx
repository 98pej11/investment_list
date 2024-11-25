import { observer } from "mobx-react";
import { productStore } from "stores/product.stores"; // MobX store 경로

import * as S from "components/SearchFilter/SearchFilter.styles";

export default observer(function SearchFilter() {
  const { amountFilter, lengthFilter, earningRateFilter, titleFilter } =
    productStore;

  const handleSearch = () => {
    productStore.search(); // 검색 실행
  };

  return (
    <S.Container>
      <S.Input
        type="number"
        placeholder="최대 금액"
        value={amountFilter}
        onChange={(e) => productStore.setAmountFilter(e.target.value)}
      />
      <S.Input
        type="number"
        placeholder="최대 기간"
        value={lengthFilter}
        onChange={(e) => productStore.setLengthFilter(e.target.value)}
      />
      <S.Input
        type="number"
        placeholder="최소 수익률"
        value={earningRateFilter}
        onChange={(e) => productStore.setEarningRateFilter(e.target.value)}
      />
      <S.Input
        type="text"
        placeholder="상품명 검색"
        value={titleFilter}
        onChange={(e) => productStore.setTitleFilter(e.target.value)}
      />
      <S.Button onClick={handleSearch}>검색</S.Button>
    </S.Container>
  );
});
