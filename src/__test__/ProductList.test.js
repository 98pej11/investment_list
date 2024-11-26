import { Provider } from "mobx-react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import ProductList from "components/ProductList/ProductList";

import { productStore } from "stores/productStore";

jest.mock("stores/productStore", () => ({
  productStore: {
    filteredProducts: [
      {
        index: 1,
        thumbnail: "thumb1.jpg",
        title: "Product 1",
        earningRate: 8,
        amount: 100000,
        length: 12,
      },
      {
        index: 2,
        thumbnail: "thumb2.jpg",
        title: "Product 2",
        earningRate: 9,
        amount: 200000,
        length: 24,
      },
      {
        index: 3,
        thumbnail: "thumb3.jpg",
        title: "Product 3",
        earningRate: 7,
        amount: 300000,
        length: 36,
      },
      {
        index: 4,
        thumbnail: "thumb4.jpg",
        title: "Product 4",
        earningRate: 6,
        amount: 400000,
        length: 48,
      },
      {
        index: 5,
        thumbnail: "thumb5.jpg",
        title: "Product 5",
        earningRate: 10,
        amount: 500000,
        length: 60,
      },
      {
        index: 6,
        thumbnail: "thumb6.jpg",
        title: "Product 6",
        earningRate: 5,
        amount: 600000,
        length: 72,
      },
      {
        index: 7,
        thumbnail: "thumb7.jpg",
        title: "Product 7",
        earningRate: 9,
        amount: 700000,
        length: 84,
      },
      {
        index: 8,
        thumbnail: "thumb8.jpg",
        title: "Product 8",
        earningRate: 8,
        amount: 800000,
        length: 96,
      },
      {
        index: 9,
        thumbnail: "thumb9.jpg",
        title: "Product 9",
        earningRate: 7,
        amount: 900000,
        length: 108,
      },
      {
        index: 10,
        thumbnail: "thumb10.jpg",
        title: "Product 10",
        earningRate: 6,
        amount: 1000000,
        length: 120,
      },
      {
        index: 11,
        thumbnail: "thumb11.jpg",
        title: "Product 11",
        earningRate: 5,
        amount: 1100000,
        length: 132,
      },
      {
        index: 12,
        thumbnail: "thumb12.jpg",
        title: "Product 12",
        earningRate: 4,
        amount: 1200000,
        length: 144,
      },
      {
        index: 13,
        thumbnail: "thumb13.jpg",
        title: "Product 13",
        earningRate: 3,
        amount: 1300000,
        length: 156,
      },
      {
        index: 14,
        thumbnail: "thumb14.jpg",
        title: "Product 14",
        earningRate: 2,
        amount: 1400000,
        length: 168,
      },
      {
        index: 15,
        thumbnail: "thumb15.jpg",
        title: "Product 15",
        earningRate: 1,
        amount: 1500000,
        length: 180,
      },
    ],
    fetchProducts: jest.fn(),
  },
}));

describe("ProductList 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { href: "" };
  });

  it("상품 카드 클릭 시 handleProductClick 함수가 호출되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <ProductList />
      </Provider>
    );

    const productCard = screen.getByText("Product 1").closest("div");

    if (productCard) {
      fireEvent.click(productCard);
    }

    expect(window.location.href).toBe("https://8percent.kr/deals/1");
  });

  it("스크롤 이벤트로 12개씩 상품이 추가로 로드되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <ProductList />
      </Provider>
    );

    // 첫 번째 렌더링에서 12개의 상품이 렌더링되는지 확인
    expect(screen.getAllByTestId("product-card")).toHaveLength(12);

    // 스크롤 이벤트 트리거
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // 스크롤 후 추가로 로드되었는지 확인
    expect(screen.getAllByTestId("product-card")).toHaveLength(15); // 현재 데이터가 15개라 더 로드되지 않음.
  });

  it("fetchProducts가 컴포넌트 마운트 시 호출되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <ProductList />
      </Provider>
    );

    expect(productStore.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it("상품의 earningRate가 9 이상일 경우 'highlight' 클래스가 적용되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <ProductList />
      </Provider>
    );

    const earningRates = screen.getAllByTestId("earning-rate");
    earningRates.forEach((earningRate) => {
      const earningRateValue = parseFloat(
        earningRate.textContent.replace("%", "")
      );

      if (earningRateValue >= 9) {
        expect(earningRate).toHaveClass("highlight");
      } else {
        expect(earningRate).not.toHaveClass("highlight");
      }
    });
  });
});
