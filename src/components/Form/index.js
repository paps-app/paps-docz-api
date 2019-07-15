import React, { Fragment } from "react";
import axios from "axios";

import ModalContext from "../Modal/Context";
import Button from "../Button";
import Input from "./Input";

import { ModalCloseButton, ModalHeader, ModalTitle } from "../Modal/styles";

import CloseIcon from "../../assets/svg/cross.svg";

const generate = require("nanoid/generate");

const errorMsgs = {
  email: "L'adresse email n'est pas valide"
};

const spanStyle = {
  color: "red"
};

const areAllKeysValid = obj =>
  !Object.keys(obj).some(key => obj[key] == null || obj[key] === "");

const InitialState = {
  fields: {
    email: "",
    name: "",
    companyName: "",
    apiKey: "",
    codeClient: ""
  },
  errors: {
    email: false,
    hasErrors: false
  },
  hasErrors: false,
  isSubmitting: false,
  hasFormSuccess: false
};

export default class Modal extends React.Component {
  state = InitialState;

  resetToInitialState = () => {
    this.setState({ ...InitialState });
  };

  handleInputChange = (e, stateKey, stateKeyValue) => {
    e.persist();
    this.setState(prevState => ({
      [stateKey]: { ...prevState[stateKey], [stateKeyValue]: e.target.value }
    }));
  };

  handleEmailChange = e => {
    this.handleInputChange(e, "fields", "email");
  };

  handleNameChange = e => {
    this.handleInputChange(e, "fields", "name");
  };

  handleCompanyChange = e => {
    this.handleInputChange(e, "fields", "companyName");
  };

  handleEmailBlur = e => {
    this.handleEmailValidation(e);
  };

  handleEmailValidation = e => {
    const emailValue = e.target.value;
    const isEmailCorrect = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue);
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        email: isEmailCorrect
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    if (
      !this.state.errors.email &&
      this.state.fields.email &&
      this.state.fields.name &&
      this.state.fields.companyName
    ) {
      this.genereteAndSave();
      console.log("ahj");
    } else {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          hasErrors: true
        },
        isSubmitting: false
      }));
    }
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
          order_id: fields.codeClient
        }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.message === "Successfully created") {
          this.setState({ isSubmitting: false, hasFormSuccess: true });
          setTimeout(() => {
            this.sendUsEmail();
          }, 100);
          setTimeout(() => {
            this.sendEmail();
          }, 200);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isSubmitting: false, hasFormSuccess: false });
      });
  };

  genereteAndSave = () => {
    const apiKey = generate("1234567890abcdefghijklmnopqrstuvwxyz", 52);
    const codeClient = generate("1234567890abcdefghijklmnopqrstuvwxyz", 10);

    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        apiKey,
        codeClient
      }
    }));

    setTimeout(() => {
      this.creatAPICustomer();
    }, 200);
  };

  sendUsEmail = () => {
    const { apiKey, codeClient, email } = this.state.fields;

    const EmailBody = `
      Hello, nouvel inscrit pour l'API,
      <br/>
      <ul style="padding-left:0">
        <li>
          Email: <strong>${email}</strong>
          <br />
        </li>
        <li>
          Clé API: <strong>${apiKey}</strong>
          <br />
        </li>
        <li>
          Code client: <strong>${codeClient}</strong>
        </li>
        <br />
      </ul>
    `;
    Email.send(
      "Paps <hello@paps.sn>",
      "madiodio@paps-app.com",
      "Nouvel inscrit pour l'API",
      EmailBody,
      { token: "8ae0ec5c-b351-4d63-9bca-c82bcbc0fd3c " },
      message => {
        // this.setState({ isSubmitting: false });
        console.log(message);
      }
    );
  };

  sendEmail = () => {
    const { name, email, apiKey, codeClient } = this.state.fields;

    const EmailBody = `
      Hello ${name},
      <br/>
      Merci d'avoir souscris pour utiliser l'API de Paps. Voici vos identifiants pour l'intégrer dans vos applications.
      <br/>
      <ul style="padding-left:0">
        <li>
          La clé API est unique et nous permet de vous connecter de manière sécurisée à l'API. Elle est obligatoire: 
          <strong>${apiKey}</strong>. Rendez-vous sur <a href="https://developers.paps.sn/">documentation</a> pour savoir comment l'utiliser dans vos requêtes
          <br />
        </li>
        <li>
          Le code client est aussi unique et permet d'identifier toutes les courses en provenance de votre compte:
          <strong>${codeClient}</strong>
        </li>
      </ul>
      <br />
      Un de nos product manager, <a href="mailto:madiodio@paps-app.com">Madiodio Gaye</a>, vous contactera très bientôt afin de vous assister dans l'intégration et en savoir plus sur vos besoins.
    `;
    Email.send(
      "Paps <hello@paps.sn>",
      email,
      "Clé de sécurité pour utiliser Paps API",
      EmailBody,
      { token: "8ae0ec5c-b351-4d63-9bca-c82bcbc0fd3c " },
      message => {
        // this.setState({ isSubmitting: false });
        console.log(message);
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
              Votre clé pour l' API a été créée et envoyée dans l'adresse suivante.
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
