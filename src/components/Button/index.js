import styled, { css } from "react-emotion";

const Button = styled.button`
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.48rem;
  padding-bottom: 0.48rem;
  font-size: 1rem;
  font-family: inherit;
  color: ${p => p.color && p.color};
  background-color: transparent;
  appearance: none;
  display: block;
  text-align: center;
  line-height: inherit;
  border: 2px solid transparent;
  border-radius: 4px;
  letter-spacing: 0.6px;

  ${p =>
    p.variant === "contained" &&
    css`
      color: #33a0bf;
      border-color: #33a0bf;
    `};

  ${p =>
    p.variant === "primary" &&
    css`
      color: white;
      background-color: #33a0bf;
    `};
`;

export default Button;
