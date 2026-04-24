import SessionView from './SessionView';

export default {
  title: 'Componentes/Sidebar/SessionView',
  component: SessionView,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isCollapsed: { control: 'boolean' },
  },
};

const Template = (args) => (
  <div className="w-64 bg-mini-gray py-8 rounded-lg shadow-sm">
    <SessionView {...args} />
  </div>
);

// Authenticated Student
export const StudentAuthenticated = Template.bind({});
StudentAuthenticated.args = {
  user: {
    name: 'Julian Franco',
    role: 'Estudiante',
    avatar: 'https://i.pravatar.cc/150?u=student1',
  },
  isCollapsed: false,
};

// Authenticated Tutor
export const TutorAuthenticated = Template.bind({});
TutorAuthenticated.args = {
  user: {
    name: 'Dr. John Smith',
    role: 'Tutor Académico',
    avatar: 'https://i.pravatar.cc/150?u=tutor1',
  },
  isCollapsed: false,
};

// Collapsed State
export const Collapsed = Template.bind({});
Collapsed.args = {
  user: {
    name: 'Julian Franco',
    role: 'Estudiante',
    avatar: 'https://i.pravatar.cc/150?u=student1',
  },
  isCollapsed: true,
};

// Guest State
export const Guest = Template.bind({});
Guest.args = {
  user: null,
  isCollapsed: false,
};

// No Avatar State
export const NoAvatar = Template.bind({});
NoAvatar.args = {
  user: {
    name: 'Maria Garcia',
    role: 'Estudiante',
    avatar: null,
  },
  isCollapsed: false,
};
