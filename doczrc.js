const doczPluginNetlify = require("docz-plugin-netlify");

module.exports = {
  plugins: [doczPluginNetlify()],
  wrapper: "src/_wrapper",
  src: "src",
  indexHtml: "src/index.html",
  themeConfig: {
    colors: {
      primary: "#33a0bf",
      sidebarBg: "white"
    },
    styles: {
      body: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      },
      h1: {
        fontFamily: "inherit",
        fontSize: "2.8em"
      },
      h2: {
        fontFamily: "inherit",
        fontSize: "1.3em"
      }
    }
  },
  // hashRouter: true,
  // public: "/public",
  htmlContext: {
    favicon: "/public/favicon.png",
    head: {
      scripts: [
        {
          src: "https://smtpjs.com/v2/smtp.js"
        }
      ]
    }
  },
  modifyBundlerConfig: config => {
    const idx = config.module.rules.findIndex(
      r => r.test.toString() === "/\\.(svg)(\\?.*)?$/"
    );

    // eslint-disable-next-line
    config.module.rules[idx] = {
      test: /\.svg$/,
      use: [
        {
          loader: "react-svg-loader",
          options: {
            es5: true
          }
        }
      ]
    };

    return config;
  }
};
