import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { productStore } from "stores/product.stores"; // MobX store 경로

import * as S from "components/ProductList/ProductList.styles";

export default observer(function ProductList() {
  const { filteredProducts } = productStore;

  const [visibleCount, setVisibleCount] = useState<number>(12); // 컴포넌트 상태로 관리

  const handleProductClick = (productId: number) => {
    window.location.href = `https://8percent.kr/deals/${productId}`;
  };

  useEffect(() => {
    productStore.fetchProducts();
  }, []);
  // 스크롤 이벤트 처리: 추가 상품 로딩
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setVisibleCount((prev) => prev + 12); // 12개씩 추가 로드
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <S.Container>
      {filteredProducts.slice(0, visibleCount).map((product) => (
        <S.Card
          key={product.index}
          onClick={() => handleProductClick(product.index)}
        >
          <img src={product.thumbnail} alt={product.title} />
          <S.Title>{product.title}</S.Title>
          <S.Info>
            <span className={product.earningRate >= 9 ? "highlight" : ""}>
              {product.earningRate}%
            </span>
            {product.amount / 10000}만원 • {product.length}개월
          </S.Info>
        </S.Card>
      ))}
    </S.Container>
  );
});
