import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { LuAlarmClock, LuCalendar1 } from "react-icons/lu"; // Импорт русской локали

registerLocale('ru', ru);

const DateTimePicker = ({label, selectedDate, selectedTime, onDateChange, onTimeChange}) => {

    return (
        <div className="flex flex-col w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>

            {/* Общий контейнер, стилизованный как инпут */}
            <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded-xl bg-white hover:border-gray-700 transition-colors">

                {/* --- Секция Даты --- */}
                <div className="flex items-center flex-1">
                    <span className="mr-2 text-gray-500">
                        {/* Ваша иконка календаря */}
                        <LuCalendar1 size={20}/>
                    </span>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => onDateChange(date)}
                        dateFormat="dd.MM.yyyy"
                        locale="ru"
                        placeholderText="ДД.ММ.ГГГГ"
                        className="w-full focus:outline-none text-sm text-gray-700 font-medium cursor-pointer"
                    />
                </div>

                <span className="text-gray-300">|</span>

                {/* --- Секция Времени --- */}
                <div className="flex items-center w-24">
                    <span className="mx-2 text-gray-500">
                        {/* Ваша иконка часов */}
                        <LuAlarmClock size={20}/>
                    </span>
                    <DatePicker
                        selected={selectedTime}
                        onChange={(date) => onTimeChange(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Время"
                        dateFormat="HH:mm"
                        locale="ru"
                        placeholderText="00:00"
                        className="w-full focus:outline-none text-sm text-gray-700 font-medium cursor-pointer"
                        showMonthYearDropdown
                    />
                </div>
            </div>
        </div>
    );
};

export default DateTimePicker;