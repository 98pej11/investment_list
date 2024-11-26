import styled from "styled-components";

import { ReactComponent as Light } from "static/light.svg";
import { ReactComponent as Dark } from "static/dark.svg";

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  background: #ddd;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s;
`;

export const Toggle = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: ${({ theme }) =>
    theme.mode === "dark" ? "translateX(30px)" : "translateX(0)"};
`;

export const Icon = styled.div`
  position: absolute;
  top: 50%;
  ${({ className }) => (className === "light" ? "right: 10px;" : "left: 10px;")}
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
`;
