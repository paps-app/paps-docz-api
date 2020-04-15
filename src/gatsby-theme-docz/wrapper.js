import React from "react";
// import { injectGlobal } from "emotion";
import { Helmet } from "react-helmet-async";

import ModalProvider from "../components/Modal/Provider";

// injectGlobal`
//   body {
//     font-family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
//   }

//  .modal-open #modal-root {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     z-index: 103;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   [align="center"] {
//     text-align: center !important;
//   }
// `;

const Wrapper = ({ children, doc }) => (
  <>
    <Helmet>
      <meta charset="UTF-8" />
      <meta name="description" content="{{ description }}" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <script src="https://smtpjs.com/v2/smtp.js" />
      <titel>{doc.value.name}</titel>
      <link rel="icon" type="image/x-icon" href="/public/favicon.png" />
    </Helmet>
    {/* <body>
      <div id="root"> */}
    <ModalProvider>{children}</ModalProvider>;
    <div id="modal-root" />
    {/* </div>
    </body> */}
  </>
);

export default Wrapper;
