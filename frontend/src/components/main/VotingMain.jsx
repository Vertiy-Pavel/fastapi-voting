import React from "react";
import { Card, CardContent } from "/src/components/ui/card";

export const VotingMain = () => {

  const statusTypes = [
    { color: "bg-[#FFD17D]", label: "Запланировано" },
    { color: "bg-[#437DE9]", label: "Активно" },
    { color: "bg-[#EE5B5B]", label: "Завершено" },
  ];

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const calendarWeeks = [
    [
      { day: "30", status: "cryptred", isCurrentMonth: false },
      { day: "01", status: null, isCurrentMonth: true },
      { day: "02", status: "cryptred", isCurrentMonth: true },
      { day: "03", status: "cryptblue", isCurrentMonth: true },
      { day: "04", status: "cryptorange", isCurrentMonth: true },
      { day: "05", status: "cryptorange", isCurrentMonth: true },
      { day: "06", status: null, isCurrentMonth: true },
    ],
    [
      { day: "07", status: "cryptred", isCurrentMonth: true },
      { day: "08", status: null, isCurrentMonth: true },
      { day: "09", status: "cryptred", isCurrentMonth: true },
      { day: "10", status: "cryptblue", isCurrentMonth: true },
      { day: "11", status: "cryptorange", isCurrentMonth: true },
      { day: "12", status: "cryptorange", isCurrentMonth: true },
      { day: "13", status: null, isCurrentMonth: true },
    ],
    [
      { day: "14", status: "cryptred", isCurrentMonth: true },
      { day: "15", status: null, isCurrentMonth: true },
      { day: "16", status: "cryptred", isCurrentMonth: true },
      { day: "17", status: "cryptblue", isCurrentMonth: true },
      { day: "18", status: "cryptorange", isCurrentMonth: true },
      { day: "19", status: "cryptorange", isCurrentMonth: true },
      { day: "20", status: null, isCurrentMonth: true },
    ],
    [
      { day: "21", status: "cryptred", isCurrentMonth: true },
      { day: "22", status: null, isCurrentMonth: true },
      { day: "23", status: "cryptred", isCurrentMonth: true },
      { day: "24", status: "cryptblue", isCurrentMonth: true },
      { day: "25", status: "cryptorange", isCurrentMonth: true },
      { day: "26", status: "cryptorange", isCurrentMonth: true },
      { day: "27", status: null, isCurrentMonth: true },
    ],
    [
      { day: "28", status: "cryptred", isCurrentMonth: true },
      { day: "29", status: null, isCurrentMonth: true },
      { day: "30", status: "cryptred", isCurrentMonth: true },
      { day: "31", status: "cryptblue", isCurrentMonth: true },
      { day: "01", status: "cryptorange", isCurrentMonth: false },
      { day: "02", status: "cryptorange", isCurrentMonth: false },
      { day: "03", status: null, isCurrentMonth: false },
    ],
    [
      { day: "04", status: "cryptred", isCurrentMonth: false },
      { day: "05", status: null, isCurrentMonth: false },
      { day: "06", status: "cryptred", isCurrentMonth: false },
      { day: "07", status: "cryptblue", isCurrentMonth: false },
      { day: "08", status: "cryptorange", isCurrentMonth: false },
      { day: "09", status: "cryptorange", isCurrentMonth: false },
      { day: "10", status: null, isCurrentMonth: false },
    ],
  ];

  return (
    <Card className="w-full h-auto md:h-[100%] rounded-[15px] md:rounded-[20px] shadow-[0px_2px_10px_#00000040] mx-4">
      <CardContent className="p-4 md:p-8">
        <h2 className="font-normal text-cryptblack text-lg md:text-xl mb-4 md:mb-6">
          Календарь голосований
        </h2>

        <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-4">
          {statusTypes.map((status, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-4 md:w-5 md:h-5 ${status.color} rounded-[8px] md:rounded-[10px]`} />
              <span className="font-normal text-cryptblack text-sm md:text-base">
                {status.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-3 md:gap-5 px-3 md:px-5 py-2 md:py-4 rounded-lg border border-solid border-[#cccccc]">
            <span className="font-normal text-cryptblack text-sm md:text-base">
              Июль 2025
            </span>
            <div className="flex items-center gap-1 md:gap-2">
              <img
                className="w-[6px] h-[10px] md:w-[7.5px] md:h-[12.12px]"
                alt="Previous month"
                src="/src/assets/images/polygon 5.png"
              />
              <img
                className="w-[6px] h-[10px] md:w-[7.5px] md:h-[12.12px]"
                alt="Next month"
                src="/src/assets/images/polygon 4.png"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-[5px] w-full">
          <div className="flex gap-1 md:gap-[5px] w-full">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="flex-1 h-10 md:h-16 bg-cryptultralightblue rounded-lg md:rounded-xl flex items-center justify-center"
              >
                <span className="font-normal text-cryptblack text-base md:text-xl">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {calendarWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-1 md:gap-[5px] w-full">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`relative flex-1 h-10 md:h-16 rounded-lg md:rounded-xl border border-solid ${
                    day.isCurrentMonth ? "border-[#cccccc]" : "border-[#f3f3f3]"
                  }`}
                >
                  <span
                    className={`absolute top-[12px] md:top-[27px] left-2 md:left-3 text-base md:text-xl ${
                      day.isCurrentMonth
                        ? "font-medium text-cryptblack"
                        : "font-normal text-cryptlowgrey"
                    }`}
                  >
                    {day.day}
                  </span>
                  {day.status && (
                    <div
                      className={`absolute w-3 h-3 md:w-4 md:h-4 top-1.5 md:top-2.5 left-[calc(100%-20px)] md:left-[97px] bg-${day.status} rounded-lg`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};