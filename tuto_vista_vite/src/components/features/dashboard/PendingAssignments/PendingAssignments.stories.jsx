import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PendingAssignments from './PendingAssignments';

export default {
  title: 'Features/Dashboard/PendingAssignments',
  component: PendingAssignments,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="p-8 bg-[#f7f9fb] min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export const Default = {
  render: () => <PendingAssignments />,
};
