import React, { Component } from "react";

import ModalContext from "./Context";

export default class ModalProvider extends Component {
  state = { openModalId: "" };

  openModal = id => {
    this.setState({ openModalId: id });
    document.getElementById("root").classList.add("modal-open");
  };

  closeModal = () => {
    this.setState({ openModalId: "" });
    document.getElementById("root").classList.remove("modal-open");
  };

  render() {
    const { openModalId } = this.state;
    const { children } = this.props;
    return (
      <ModalContext.Provider
        value={{
          openModalId,
          openModal: id => this.openModal(id),
          closeModal: () => this.closeModal()
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  }
}
