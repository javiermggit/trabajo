const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-external-module',

  exposes: {
    './Module': './src/app/mf/main/app-mf.module.ts',
  },

  remotes: {
    shell: "mf-shell@http://localhost:4200/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: false, strictVersion: false, requiredVersion: false }),
  },

});
