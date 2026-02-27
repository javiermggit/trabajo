const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-reimpresion',

  exposes: {
    './Module': './src/app/mf/main/app-mf.module.ts',
  },

  shared: {
    ...shareAll({ 
      singleton: false, 
      strictVersion: false,
       requiredVersion: false }),
  },

});
