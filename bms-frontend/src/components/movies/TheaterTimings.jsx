import { useState } from "react";
import dayjs from "dayjs";
import { theatres } from "../../utils/constants";

const TheaterTimings = () => {
  const today = dayjs();

  const [selectedDate, setSelectedDate] = useState(today);

  const next7days = Array.from(
    { length: 7 },
    (_, i) => today.add(i, "day")
  );

  return (
    <>
      <hr className="my-2 border-gray-200" />

      {/* Dates */}
      <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex cursor-pointer flex-col border border-gray-200 items-center px-3 py-2 rounded-lg min-w-[50px] ${
                isSelected
                  ? "bg-black text-white font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <span className="text-sm font-black">
                {date.format("D")}
              </span>

              <span className="text-xs">
                {date.format("ddd")}
              </span>

              <span className="text-[10px]">
                {date.format("MMM").toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
{/* Theatres */}
<div className="max-w-5xl mx-auto px-4 mb-10">
  {theatres.map((theatre, i) => (
    <div
      key={i}
      className="py-5 border-b border-gray-200"
    >
      {/* Theatre Information */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={theatre.img}
          alt={theatre.name}
          className="w-8 h-8 object-contain"
        />

        <div>
          <p className="font-semibold text-sm">
            {theatre.name}
          </p>

          <p className="text-xs text-gray-500">
            {theatre.cancellation}
          </p>

          <p className="text-xs text-gray-400">
            {theatre.distance}
          </p>
        </div>
      </div>

      {/* Timings - BELOW THEATRE */}
      <div className="flex flex-wrap gap-3 ml-11">
        {theatre.timings.map((slot, k) => (
          <button
            key={k}
            className="border border-gray-300 rounded-lg
                       px-6 py-2 text-sm
                       flex flex-col items-center justify-center
                       cursor-pointer hover:bg-gray-100"
          >
            <span className="leading-tight font-semibold">
              {slot.time}
            </span>

            <span className="text-[10px] text-gray-500 font-black">
              {slot.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  ))}
</div>
    </>
  );
};

export default TheaterTimings;