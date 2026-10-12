import React from "react";

const Footer = ({ isSelected, selectedSeats }) => {
  return (
    <>
      {isSelected ? (
        <div className="bg-white py-3 px-6 flex items-center justify-between z-10">
          <p className="text-gray-700 font-medium text-base">
            {selectedSeats.length} Seat
            {selectedSeats.length !== 1 ? "s" : ""} Selected
          </p>

          <button
            disabled
            className="bg-gray-400 cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold"
          >
            Proceed
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-purple-600 tracking-wider">
            SCREEN THIS WAY
          </p>

          <div className="flex gap-4 text-xs mt-3">
            {/* Available */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border rounded-[4px]"></div>
              <p>Available</p>
            </div>

            {/* Occupied */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 border rounded-[4px] flex items-center justify-center">
                <small className="-mt-1">x</small>
              </div>
              <p>Occupied</p>
            </div>

            {/* Selected */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-600 rounded-[4px]"></div>
              <p>Selected</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;