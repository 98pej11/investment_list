import styled from "styled-components";

import { ReactComponent as ArrowDownSVG } from "static/arrows_down.svg";
import { ReactComponent as RefreshSVG } from "static/refresh.svg";

export const Container = styled.div`
  display: flex;
  padding: 20px 0px 40px;
  gap: 10px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    font-family: "GmarketSans";
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
`;

export const SelectButton = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  border: none;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  font-family: "GmarketSans";
  color: #656565;
  white-space: nowrap;
  cursor: pointer;
`;

// 드롭다운 항목 스타일
export const Options = styled.div`
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 5px;
  z-index: 10;
`;

// 개별 드롭다운 옵션 스타일
export const Option = styled.div`
  padding: 10px;
  color: #656565;
  font-family: "GmarketSans";
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ArrowIcon = styled(ArrowDownSVG)`
  width: 16px;
  height: 16px;
  fill: #333;
  transition: transform 0.3s ease;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const RefreshIcon = styled(RefreshSVG)`
  cursor: pointer;
`;
