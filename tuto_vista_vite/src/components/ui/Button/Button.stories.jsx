import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export const Primary = {
  render: () => <Button variant="primary">Primary Button</Button>,
};

export const Secondary = {
  render: () => <Button variant="secondary">Book Session</Button>,
};

export const Outline = {
  render: () => <Button variant="outline">View Methodology</Button>,
};

export const Ghost = {
  render: () => <Button variant="ghost">Secondary Action</Button>,
};

export const Boring = {
  render: () => <Button variant="boring">Filters & More</Button>,
};
