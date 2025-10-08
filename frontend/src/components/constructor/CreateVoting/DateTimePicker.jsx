import React, { useState } from 'react';

const DateTimePicker = ({ label, initialDate, initialTime, onDateChange, onTimeChange }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [selectedTime, setSelectedTime] = useState(initialTime || '');

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    if (onTimeChange) {
      onTimeChange(newTime);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="flex items-center space-x-2 border border-gray-300 p-1 rounded-lg">
        
        {/* Иконка календаря */}
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1.66602V3.33268M5 1.66602V3.33268" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.33333 14.1673L8.33332 11.1233C8.33332 10.9635 8.21938 10.834 8.07882 10.834H7.5M11.358 14.1673L12.4868 11.125C12.5396 10.9827 12.4274 10.834 12.2672 10.834H10.8333" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.08398 10.2027C2.08398 6.57161 2.08398 4.75607 3.12742 3.62803C4.17085 2.5 5.85023 2.5 9.20898 2.5H10.7923C14.1511 2.5 15.8305 2.5 16.8739 3.62803C17.9173 4.75607 17.9173 6.57161 17.9173 10.2027V10.6306C17.9173 14.2617 17.9173 16.0773 16.8739 17.2053C15.8305 18.3333 14.1511 18.3333 10.7923 18.3333H9.20898C5.85023 18.3333 4.17085 18.3333 3.12742 17.2053C2.08398 16.0773 2.08398 14.2617 2.08398 10.6306V10.2027Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 6.66602H15" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
        />
        
        {/* Иконка часов */}
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="10" cy="10.834" rx="7.5" ry="7.5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4.16667 15.834L2.5 17.5007M15.8333 15.834L17.5 17.5007" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.8327 2.97475L16.3289 2.72663C17.0333 2.37443 17.2979 2.41474 17.8579 2.97475C18.4179 3.53475 18.4582 3.79937 18.1061 4.50375L17.8579 5M4.16602 2.97475L3.66977 2.72663C2.96539 2.37443 2.70077 2.41474 2.14076 2.97475C1.58076 3.53475 1.54045 3.79937 1.89264 4.50375L2.14076 5" stroke="#212121" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 7.91602V11.2493L11.6667 12.916" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 2.91602V1.66602" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33398 1.66602H11.6673" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-sm"
        />
        
        <span>•</span>
      </div>
    </div>
  );
};

export default DateTimePicker;