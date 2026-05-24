import SearchFilters from './SearchFilters';

export default {
  title: 'Components/SearchFilters',
  component: SearchFilters,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => <div className="w-96"><SearchFilters /></div>,
};
