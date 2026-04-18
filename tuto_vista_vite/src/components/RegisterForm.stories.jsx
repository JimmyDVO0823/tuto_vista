import RegisterForm from './RegisterForm';

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => <RegisterForm />,
};
