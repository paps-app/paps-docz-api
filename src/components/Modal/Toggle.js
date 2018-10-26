import React from "react";

import ModalContext from "./Context";

const ModalToggle = ({ id, children }) => (
  <ModalContext.Consumer>
    {({ openModal }) => children(() => openModal(id))}
  </ModalContext.Consumer>
);

export default ModalToggle;
