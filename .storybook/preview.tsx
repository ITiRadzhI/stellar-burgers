import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

const withRouterDecorator = (Story: any) => (
  <Router>
    <div style={{ padding: '20px', width: 'fit-content' }}>
      <Story />
    </div>
  </Router>
);

const previewConfig: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [withRouterDecorator]
};

export default previewConfig;
