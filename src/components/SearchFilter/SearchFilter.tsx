import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import * as S from "components/SearchFilter/SearchFilter.styles";

import { sortOptions } from "types/sortOptions";

import { productStore } from "stores/productStore";

export default observer(function SearchFilter() {
  const { amountFilter, lengthFilter, earningRateFilter, titleFilter } =
    productStore;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  /** 필터 초기화 */
  const handleResetFilters = () => {
    productStore.resetFilters();
  };

  useEffect(() => {
    productStore.resetFilters();
  }, []);

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
      <S.SelectContainer>
        <S.SelectButton onClick={toggleDropdown}>
          {productStore.sortOptionLabel}
          <S.ArrowIcon
            style={{
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </S.SelectButton>
        {isDropdownOpen && (
          <S.Options>
            {Object.keys(sortOptions).map((key) => {
              const option = sortOptions[key as keyof typeof sortOptions];
              return (
                <S.Option
                  key={key}
                  onClick={() => {
                    productStore.setSortOption(key as keyof typeof sortOptions);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.label}
                </S.Option>
              );
            })}
          </S.Options>
        )}
      </S.SelectContainer>
      <S.Button onClick={handleResetFilters}>
        <S.RefreshIcon />
      </S.Button>
    </S.Container>
  );
});
