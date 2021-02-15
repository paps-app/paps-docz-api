import React, { Fragment } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

import ModalContext from "../Modal/Context";
import Button from "../Button";
import Input from "./Input";

import { ModalCloseButton, ModalHeader, ModalTitle } from "../Modal/styles";

import CloseIcon from "../../assets/svg/cross.svg";

const generate = require("nanoid/generate");

const errorMsgs = {
  email: "L'adresse email n'est pas valide",
};

const spanStyle = {
  color: "red",
};

const InitialState = {
  fields: {
    email: "",
    name: "",
    companyName: "",
    apiKey: "",
    codeClient: "",
  },
  errors: {
    email: false,
    hasErrors: false,
  },
  hasErrors: false,
  isSubmitting: false,
  hasFormSuccess: false,
};

export default class Modal extends React.Component {
  state = InitialState;

  resetToInitialState = () => {
    this.setState({ ...InitialState });
  };

  handleInputChange = (e, stateKey, stateKeyValue) => {
    e.persist();
    this.setState((prevState) => ({
      [stateKey]: {
        ...prevState[stateKey],
        [stateKeyValue]: e.target.value,
      },
    }));
  };

  handleEmailChange = (e) => {
    this.handleInputChange(e, "fields", "email");
  };

  handleNameChange = (e) => {
    this.handleInputChange(e, "fields", "name");
  };

  handleCompanyChange = (e) => {
    this.handleInputChange(e, "fields", "companyName");
  };

  handleEmailBlur = (e) => {
    this.handleEmailValidation(e);
  };

  handleEmailValidation = (e) => {
    const emailValue = e.target.value;
    const isEmailCorrect = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(
      emailValue
    );
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        email: isEmailCorrect,
      },
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    if (
      !this.state.errors.email &&
      this.state.fields.email &&
      this.state.fields.name &&
      this.state.fields.companyName
    ) {
      this.genereteAndSave();
    } else {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          hasErrors: true,
        },
        isSubmitting: false,
      }));
    }
  };

  genereteAndSave = () => {
    const apiKey = generate("1234567890abcdefghijklmnopqrstuvwxyz", 52);
    const codeClient = generate("1234567890abcdefghijklmnopqrstuvwxyz", 10);

    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        apiKey,
        codeClient,
      },
    }));

    this.creatAPICustomer();
  };

  creatAPICustomer = () => {
    const { fields } = this.state;

    axios
      .post(
        "https://api.paps.sn/api/v1/createAPICustomer?apiKey=7090e4f41fd0dd4750b1bab1b0fa563e222d11b2276bf6cf5280",
        {
          apiKey: fields.apiKey,
          merchant_email: fields.email,
          merchant_name: fields.name,
          merchant_company_name: fields.companyName,
          order_id: fields.codeClient,
        }
      )
      .then(({ data }) => {
        if (data.message === "Successfully created") {
          this.setState({
            isSubmitting: false,
            hasFormSuccess: true,
          });

          this.sendEmail(fields);
        }
      })
      .catch(() => {
        this.setState({
          isSubmitting: false,
          hasFormSuccess: false,
        });
      });
  };

  sendEmail = (params) => {
    emailjs
      .send(
        "service_bo2xooi",
        "template_cdacaar",
        params,
        "user_XX1vilGPnhSs2lrsLTkoH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  render() {
    const { errors, hasFormSuccess, fields } = this.state;

    return (
      <div>
        {hasFormSuccess ? (
          <div>
            <h2>
              Votre clé pour l' API a été créée et envoyée dans l'adresse
              suivante.
              <br />
              <span style={{ color: "blue" }}>{fields.email}</span>
            </h2>
          </div>
        ) : (
          <Fragment>
            <ModalHeader>
              <ModalTitle>Obtenez votre clé api</ModalTitle>
              <ModalContext.Consumer>
                {({ closeModal }) => (
                  <ModalCloseButton type="button" onClick={closeModal}>
                    <CloseIcon width={14} height={14} />
                  </ModalCloseButton>
                )}
              </ModalContext.Consumer>
            </ModalHeader>
            <form onSubmit={this.onSubmit}>
              <Input
                type="text"
                id="name"
                label="Votre nom complet"
                onChange={this.handleNameChange}
                width="100%"
                required
              />
              <Input
                type="text"
                id="companyName"
                label="Nom de l'entreprise"
                onChange={this.handleCompanyChange}
                width="100%"
                style={{ marginTop: "0.9rem " }}
                required
              />
              <Input
                type="email"
                id="email"
                label="Adresse email"
                onChange={this.handleEmailChange}
                onBlur={this.handleEmailBlur}
                width="100%"
                style={{ marginTop: "0.9rem " }}
                required
              />
              <span style={spanStyle}>{errors.email && errorMsgs.email}</span>
              <Button
                type="submit"
                id="save"
                variant="contained"
                style={{ marginTop: "1.4rem" }}
              >
                Envoyer
              </Button>
            </form>
          </Fragment>
        )}
      </div>
    );
  }
}
