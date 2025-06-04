module.exports = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials'
  ],
  webpackFinal: async (baseConfig) => {
    baseConfig.entry.push(require.resolve('../.storybook/preview.tsx'));
    return baseConfig;
  }
};
