import React, { useState } from 'react';
import Searcher from './Searcher';

export default {
  title: 'UI/Searcher',
  component: Searcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return (
    <div className="w-[500px]">
      <Searcher {...args} value={value} onChange={setValue} />
      <div className="mt-4 text-sm text-gray-500">
        Current value: <span className="font-mono font-bold text-primary">{value || '(empty)'}</span>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Buscar materia o departamento...',
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Escribe algo aquí...',
};

export const WithPredefinedValue = (args) => {
  const [value, setValue] = useState('Cálculo');
  return (
    <div className="w-[500px]">
      <Searcher {...args} value={value} onChange={setValue} />
    </div>
  );
};
WithPredefinedValue.args = {
  placeholder: 'Buscar...',
};
