import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import * as S from "components/ProductList/ProductList.styles";

import { productStore } from "stores/productStore";

export default observer(function ProductList() {
  const { filteredProducts } = productStore;

  const [visibleCount, setVisibleCount] = useState<number>(12);

  const handleProductClick = (productId: number) => {
    window.location.href = `https://8percent.kr/deals/${productId}`;
  };

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  /** 사용자가 스크롤을 내려 페이지 하단에서 50px 이내에 도달했을 때 12개 추가 로드 */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setVisibleCount((prev) => prev + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);

    /** 메모리 누수를 방지하고, 컴포넌트가 더 이상 필요 없을 때 이벤트를 제거 */
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <S.Container>
      {filteredProducts.slice(0, visibleCount).map((product) => (
        <S.Card
          key={product.index}
          onClick={() => handleProductClick(product.index)}
          data-testid="product-card"
        >
          <img src={product.thumbnail} alt={product.title} />
          <S.Title>{product.title}</S.Title>
          <S.Info>
            <span
              data-testid="earning-rate"
              className={product.earningRate >= 9 ? "highlight" : ""}
            >
              {product.earningRate}%
            </span>
            {product.amount / 10000}만원 • {product.length}개월
          </S.Info>
        </S.Card>
      ))}
    </S.Container>
  );
});
