import React from 'react';
import { Story, Meta } from '@storybook/react';

import App from './App';

export default {
  title: 'App',
  component: App,
  argTypes: {
    knowledgeFile: {
      description: 'knowledge_file that the component will manage',
    },
    srcText: {
      control: { type: 'object' },
    },
  },
} as Meta;

const Template: Story = () => <App />;

export const Default = Template.bind({});
Default.args = {};
