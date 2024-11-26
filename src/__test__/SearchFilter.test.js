import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "mobx-react";
import { productStore } from "stores/productStore";
import SearchFilter from "components/SearchFilter/SearchFilter";
import "@testing-library/jest-dom";

jest.mock("stores/productStore", () => ({
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
    resetFilters: jest.fn(),
    sortOptionLabel: "정렬 기준 선택",
  },
}));

describe("SearchFilter 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 입력 필드와 드롭다운이 렌더링되는지 확인", () => {
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

  it("최대 금액 입력값 변경 시 필터가 업데이트되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText("최대 금액");
    fireEvent.change(amountInput, { target: { value: "100000" } });

    expect(productStore.setAmountFilter).toHaveBeenCalledWith("100000");
  });

  it("최대 기간 입력값 변경 시 필터가 업데이트되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const lengthInput = screen.getByPlaceholderText("최대 기간");
    fireEvent.change(lengthInput, { target: { value: "12" } });

    expect(productStore.setLengthFilter).toHaveBeenCalledWith("12");
  });

  it("최소 수익률 입력값 변경 시 필터가 업데이트되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const earningRateInput = screen.getByPlaceholderText("최소 수익률");
    fireEvent.change(earningRateInput, { target: { value: "5" } });

    expect(productStore.setEarningRateFilter).toHaveBeenCalledWith("5");
  });

  it("상품명 검색 입력값 변경 시 필터가 업데이트되는지 확인", () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    const titleInput = screen.getByPlaceholderText("상품명 검색");
    fireEvent.change(titleInput, { target: { value: "Product A" } });

    expect(productStore.setTitleFilter).toHaveBeenCalledWith("Product A");
  });

  it("정렬 기준 드롭다운에서 새 옵션 선택 시 필터가 업데이트되는지 확인", async () => {
    render(
      <Provider productStore={productStore}>
        <SearchFilter />
      </Provider>
    );

    // 드롭다운 버튼 클릭으로 드롭다운 열기
    const button = screen.getByText("정렬 기준 선택");
    fireEvent.click(button);

    // 드롭다운이 열렸는지 확인 (옵션들이 보이는지)
    screen.getByText("금액 높은 순");
    screen.getByText("금액 낮은 순");
    screen.getByText("기간 높은 순");
    screen.getByText("기간 낮은 순");
    screen.getByText("수익률 높은 순");
    screen.getByText("수익률 낮은 순");

    // "금액 높은 순" 옵션 클릭 후 상태 확인
    const option = await screen.getByText("금액 높은 순");
    fireEvent.click(option);
    expect(productStore.setSortOption).toHaveBeenCalledWith("amountDesc");
  });
});
