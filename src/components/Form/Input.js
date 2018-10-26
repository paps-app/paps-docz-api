import React from "react";

import { StyledInput } from "./styles";

// const OnInputFocus = e => e.currentTarget.parentNode.classList.add("focused");
// const OnInputBlur = e => e.currentTarget.parentNode.classList.remove("focused");

const Input = ({ id, type, label, onChange, onFocus, onBlur, width, ...rest }) => (
  <StyledInput width={width}>
    <label htmlFor={id} />
    <input
      id={id}
      type={type}
      placeholder={label}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    />
  </StyledInput>
);

export default Input;
