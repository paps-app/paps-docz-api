module.exports = {
  wrapper: "src/_wrapper",
  src: "src",
  indexHtml: "src/index.html",
  themeConfig: {
    styles: {
      body: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      }
    }
  },
  // hashRouter: true,
  public: "/public",
  htmlContext: {
    favicon: "/public/favicon.png"
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
