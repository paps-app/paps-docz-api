import React, { Component } from "react";
import { Button } from "rebass";
import Modal from "../Modal";

export default class CreateApiKey extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModalVisibility = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <Modal onClose={this.toggleModalVisibility} />
        ) : (
          <Button
            fontSize={2}
            border="2px solid"
            borderColor="#33a0bf"
            color="#33a0bf"
            bg="transparent"
            px="1rem"
            py="0.78rem"
            onClick={this.toggleModalVisibility}
          >
            Obtenir une clé
          </Button>
        )}
      </React.Fragment>
    );
  }
}
