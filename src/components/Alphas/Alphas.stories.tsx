import React from 'react';
import { Story, Meta } from '@storybook/react';

import Alphas from './Alphas';

export default {
  title: 'Alphas',
  component: Alphas,
  argTypes: {
    knowledgeFile: {
      description: 'knowledge_file that the component will manage',
    },
    srcText: {
      control: { type: 'object' },
    },
  },
} as Meta;

const Template: Story = () => <Alphas delta={5} />;

export const Default = Template.bind({});
