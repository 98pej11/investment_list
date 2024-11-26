/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import { Provider } from "mobx-react";
import { productStore } from "stores/productStore";
import SearchFilter from "components/SearchFilter/SearchFilter";
import "@testing-library/jest-dom";

jest.mock("stores/product.stores", () => ({
  productStore: {
    amountFilter: "",
    lengthFilter: "",
    earningRateFilter: "",
    titleFilter: "",
    sortOption: "",
    setAmountFilter: jest.fn(),
    setLengthFilter: jest.fn(),
    setEarningRateFilter: jest.fn(),
    setTitleFilter: jest.fn(),
    setSortOption: jest.fn(),
  },
}));

describe("SearchFilter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all input fields and dropdown", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    expect(screen.getByPlaceholderText("최대 금액")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("최대 기간")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("최소 수익률")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("상품명 검색")).toBeInTheDocument();
    expect(screen.getByText("정렬 기준 선택")).toBeInTheDocument();
  });

  it("updates amount filter when input changes", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText("최대 금액");
    act(() => {
      fireEvent.change(amountInput, { target: { value: "100000" } });
    });

    expect(productStore.setAmountFilter).toHaveBeenCalledWith("100000");
  });

  it("updates length filter when input changes", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const lengthInput = screen.getByPlaceholderText("최대 기간");
    act(() => {
      fireEvent.change(lengthInput, { target: { value: "12" } });
    });

    expect(productStore.setLengthFilter).toHaveBeenCalledWith("12");
  });

  it("updates earning rate filter when input changes", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const earningRateInput = screen.getByPlaceholderText("최소 수익률");
    act(() => {
      fireEvent.change(earningRateInput, { target: { value: "5" } });
    });

    expect(productStore.setEarningRateFilter).toHaveBeenCalledWith("5");
  });

  it("updates title filter when input changes", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const titleInput = screen.getByPlaceholderText("상품명 검색");
    act(() => {
      fireEvent.change(titleInput, { target: { value: "Product A" } });
    });

    expect(productStore.setTitleFilter).toHaveBeenCalledWith("Product A");
  });

  it("updates sort option when a new option is selected", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const sortSelect = screen.getByRole("combobox");
    act(() => {
      fireEvent.change(sortSelect, { target: { value: "amountDesc" } });
    });

    expect(productStore.setSortOption).toHaveBeenCalledWith("amountDesc");
  });
});
