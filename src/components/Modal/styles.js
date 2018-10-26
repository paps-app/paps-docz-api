import styled from "react-emotion";

// import { FlexAndCenter } from "../shared/styles";

export const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  padding: 50,
  zIndex: 102
});

export const ModalStyled = styled("div")({
  backgroundColor: "#fff",
  borderRadius: 4,
  maxWidth: 500,
  width: 380,
  margin: "0 auto",
  padding: "1.7rem",
  zIndex: 103
});

export const ModalHeader = styled.div`
  display: flex;
  align-items: baseline;
`;

export const ModalTitle = styled("h3")`
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 1.4rem;
`;

export const ModalCloseButton = styled.button`
  -webkit-appearance: none;
  appearance: none;
  border: none;
  padding: 0;
  background-color: transparent;
  margin-left: auto;
  cursor: pointer;
`;
