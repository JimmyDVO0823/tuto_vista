import React from 'react';
import NextSessions from './NextSessions';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Features/Dashboard/NextSessions',
  component: NextSessions,
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
  render: () => <NextSessions />,
};
