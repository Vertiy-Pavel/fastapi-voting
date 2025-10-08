import React from 'react';

const StepHeader = ({ stepNumber, title }) => {
  return (
    <div className="py-[16] flex items-center gap-2.5 mb-4">
      <div className="text-lg font-semibold bg-[#F4F4F4] px-[15px] py-[10px] rounded-lg">
        <span>Шаг {stepNumber}</span>
      </div>
        <span className='relative text-lg'>{title}</span>
    </div>
  );
};

export default StepHeader;