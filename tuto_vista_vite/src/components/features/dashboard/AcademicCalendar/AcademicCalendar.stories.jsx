import AcademicCalendar from './AcademicCalendar';

export default {
  title: 'Features/Dashboard/AcademicCalendar',
  component: AcademicCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <div className="w-[800px]">
      <AcademicCalendar />
    </div>
  ),
};

export const MobileView = {
  render: () => (
    <div className="w-[375px]">
      <AcademicCalendar />
    </div>
  ),
};
