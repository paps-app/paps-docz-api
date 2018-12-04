import React from "react";
import { injectGlobal } from "emotion";

import ModalProvider from "./components/Modal/Provider";

injectGlobal`
  body {
    font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  }

 .modal-open #modal-root {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 103;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  [align="center"] {
    text-align: center !important;
  }
`;

const Wrapper = ({ children }) => <ModalProvider>{children}</ModalProvider>;

export default Wrapper;
