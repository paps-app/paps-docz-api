import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import ModalContext from "./Context";
import { Overlay, ModalStyled } from "./styles";

const Modal = ({ id, children }) => (
  <ModalContext.Consumer>
    {({ closeModal, openModalId }) => {
      if (openModalId === id) {
        return ReactDOM.createPortal(
          <Fragment>
            <Overlay role="dialog" onClick={closeModal} onKeyPress={closeModal} />
            <ModalStyled role="dialog">{children(closeModal)}</ModalStyled>
          </Fragment>,
          document.getElementById("modal-root")
        );
      }

      return null;
    }}
  </ModalContext.Consumer>
);

export default Modal;
