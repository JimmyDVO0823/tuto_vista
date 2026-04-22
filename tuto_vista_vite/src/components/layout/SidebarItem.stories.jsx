import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SidebarItem from './SidebarItem';

export default {
  title: 'Layout/SidebarItem',
  component: SidebarItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-mini-gray p-8 w-64 h-screen">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    icon: { control: 'text' },
    isActive: { control: 'boolean' },
    isCollapsed: { control: 'boolean' },
  },
};

const Template = (args) => <SidebarItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  isCollapsed: false,
  isActive: false,
};

export const Active = Template.bind({});
Active.args = {
  label: 'Dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  isCollapsed: false,
  isActive: true,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  label: 'Dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  isCollapsed: true,
  isActive: false,
};

export const CollapsedActive = Template.bind({});
CollapsedActive.args = {
  label: 'Dashboard',
  path: '/dashboard',
  icon: 'dashboard',
  isCollapsed: true,
  isActive: true,
};
