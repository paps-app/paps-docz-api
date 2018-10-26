import styled from "react-emotion";

import { FlexAndCenter } from "../shared/styles";

export const StyledInput = styled.div`
  ${FlexAndCenter};
  width: ${p => p.width && p.width};

  > input {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    font-size: 0.95em;
    font-weight: 300;
    padding: 0.8rem 0.6rem;
    text-overflow: ellipsis;
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 4px;

    &:focus {
      border-color: #4d90fe;
      outline: none;
    }
  }

  > label {
    display: none;
  }
`;

export const FormTitle = styled.div`
  ${FlexAndCenter};

  > h3 {
    font-size: 1.3rem;
  }
`;
