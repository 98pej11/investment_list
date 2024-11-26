/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { productStore } from "stores/productStore";
import ProductList from "components/ProductList/ProductList";
import "@testing-library/jest-dom";

jest.mock("stores/product.stores", () => ({
  productStore: {
    filteredProducts: Array.from({ length: 50 }, (_, index) => ({
      index,
      thumbnail: `https://example.com/image${index}.jpg`,
      title: `Product ${index}`,
      earningRate: index % 10,
      amount: (index + 1) * 10000,
      length: (index % 12) + 1,
    })),
    fetchProducts: jest.fn(),
  },
}));

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial products up to visibleCount", () => {
    render(<ProductList />);
    // 초기 12개의 상품만 렌더링되는지 확인
    const products = screen.getAllByRole("img");
    expect(products.length).toBe(12);
    expect(screen.getByAltText("Product 0")).toBeInTheDocument();
    expect(screen.getByAltText("Product 11")).toBeInTheDocument();
  });

  it("loads additional products on scroll", async () => {
    render(<ProductList />);

    // 스크롤 이벤트를 트리거하여 추가 로드
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      const products = screen.getAllByRole("img");
      expect(products.length).toBeGreaterThan(12);
      expect(products.length).toBe(24); // 추가 12개 로드
    });
  });

  it("redirects to product detail page on product click", () => {
    delete window.location;
    window.location = { href: "" }; // 타입 단언 제거

    render(<ProductList />);
    const firstProduct = screen.getByAltText("Product 0");
    fireEvent.click(firstProduct);

    expect(window.location.href).toBe("https://8percent.kr/deals/0");
  });

  it("fetches products on mount", () => {
    render(<ProductList />);

    expect(productStore.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it("highlights earning rate >= 9", () => {
    render(<ProductList />);
    const highlightedRates = screen.getAllByText(/9%|10%/);

    highlightedRates.forEach((rate) => {
      expect(rate).toHaveClass("highlight");
    });
  });
});
