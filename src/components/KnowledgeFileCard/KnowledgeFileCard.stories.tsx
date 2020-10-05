import React from 'react';
import { Story, Meta } from '@storybook/react';

import KnowledgeFileCard, { Props } from './KnowledgeFileCard';

// import { graphql, rest } from 'msw';
// import { worker } from '../../test/setupWorker';
// import { GetKnowledgeFileArgs, KnowledgeFile } from '../../types/types';
// import { knowledgeFiles } from '../../test/mockData';

// worker.use(
//   graphql.query<{ getKnowledgeFiles: KnowledgeFile[] }, GetKnowledgeFileArgs>(
//     'GetKnowledgeFiles',
//     (req, res, ctx) => {
//       return res(
//         ctx.data({
//           getKnowledgeFiles: [knowledgeFiles[0]],
//         })
//       );
//     }
//   )
// );

export default {
  title: 'KnowledgeFileCard',
  component: KnowledgeFileCard,
  argTypes: {
    knowledgeFile: {
      description: 'knowledge_file that the component will manage',
    },
    srcText: {
      control: { type: 'object' },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <KnowledgeFileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  knowledgeFile: {
    id: 1,
    lastDateTimeModified: '2020-09-11 11:04:55.881356',
    dateTimeCreated: '2020-09-11 11:04:55.881356',
    srcText: 'This is a source of the file',
    wordCount: '15',
  },
};
