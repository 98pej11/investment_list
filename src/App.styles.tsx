import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
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
`;
