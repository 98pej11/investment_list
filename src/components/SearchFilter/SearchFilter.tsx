import { observer } from "mobx-react";
import { productStore } from "stores/product.stores"; // MobX store 경로

import * as S from "components/SearchFilter/SearchFilter.styles";

export default observer(function SearchFilter() {
  const {
    amountFilter,
    lengthFilter,
    earningRateFilter,
    titleFilter,
    sortOption,
  } = productStore;

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
      <S.Select
        value={sortOption}
        onChange={(e) => productStore.setSortOption(e.target.value)}
      >
        <option value="">정렬 기준 선택</option>
        <option value="amountDesc">금액 높은 순</option>
        <option value="amountAsc">금액 낮은 순</option>
        <option value="lengthDesc">기간 높은 순</option>
        <option value="lengthAsc">기간 낮은 순</option>
        <option value="earningRateDesc">수익률 높은 순</option>
        <option value="earningRateAsc">수익률 낮은 순</option>
      </S.Select>
    </S.Container>
  );
});
