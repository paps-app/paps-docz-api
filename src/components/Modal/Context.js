import React from 'react';

const ModalContext = React.createContext({
  openModalId: '',
  openModal: () => { },
  closeModal: () => { },
});

export default ModalContext;