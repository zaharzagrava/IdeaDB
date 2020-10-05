import React from 'react';
import { Story, Meta } from '@storybook/react';
import KnowledgeFileList from './KnowledgeFileList';

import { graphql, rest } from 'msw';
import { worker } from '../../test/setupWorker';
import { GetKnowledgeFileArgs, KnowledgeFile } from '../../types/types';
import { knowledgeFiles } from '../../test/mockData';

worker.use(
  graphql.query<{ getKnowledgeFiles: KnowledgeFile[] }, GetKnowledgeFileArgs>(
    'GetKnowledgeFiles',
    (req, res, ctx) => {
      return res(
        ctx.data({
          getKnowledgeFiles: [knowledgeFiles[0], knowledgeFiles[1]],
        })
      );
    }
  )
);

export default {
  title: 'KnowledgeFileList',
  component: KnowledgeFileList,
  argTypes: {
    knowledgeFile: {
      description: 'knowledge_file that the component will manage',
    },
    srcText: {
      control: { type: 'object' },
    },
  },
} as Meta;

const Template: Story<undefined> = () => <KnowledgeFileList />;

export const Default = Template.bind({});

// import React from 'react';
// import { Story, Meta } from '@storybook/react';

// import KnowledgeFileCard, { Props } from './KnowledgeFileCard';

// export default {
//   title: 'KnowledgeFileCard',
//   component: KnowledgeFileCard,
//   argTypes: {
//     knowledgeFile: {
//       description: 'knowledge_file that the component will manage',
//       id: {
//         control: 'text',
//         table: {
//           type: {
//             summary: 'something short',
//             detail: 'something really really long',
//           },
//         },
//       },
//     },
//     srcText: {
//       control: { type: 'object' },
//     },
//   },
// } as Meta;

// const Template: Story<any> = (args) => (
//   <KnowledgeFileCard
//     {...{
//       knowledgeFile: {
//         id: args.id,
//         lastDateTimeModified: args.lastDateTimeModified,
//         dateTimeCreated: args.dateTimeCreated,
//         srcText: args.srcText,
//         wordCount: args.wordCount,
//       },
//     }}
//   />
// );

// export const Default = Template.bind({});
// Default.args = {
//   id: 1,
//   lastDateTimeModified: '2020-09-11 11:04:55.881356',
//   dateTimeCreated: '2020-09-11 11:04:55.881356',
//   srcText: 'This is a source of the file',
//   wordCount: '15',
// };
