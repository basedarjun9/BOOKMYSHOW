import React from "react";
import mainLogo from "../../assets/main-icon.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Header = ({ showData, type }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 shadow-sm bg-white">
        {/* Top Bar */}
        <div className="relative flex items-center justify-between py-4 px-6 min-h-[76px]">
          {/* Logo - Left */}
          <img
            onClick={() => navigate("/")}
            src={mainLogo}
            alt="bookMyScreen"
            className="h-6 md:h-8 object-contain cursor-pointer"
          />

          {/* Centered Header Content */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center w-max max-w-[60%]">
            {type === "checkout" ? (
              <h2 className="font-bold text-gray-900 text-lg md:text-xl">
                Review your booking
              </h2>
            ) : (
              <>
                <h2 className="font-bold text-lg md:text-xl text-gray-900">
                  {showData?.movie?.title}
                </h2>

                <p className="text-xs text-gray-500 font-semibold mt-1">
                  {showData?.date
                    ? dayjs(showData.date, "DD-MM-YYYY").format(
                        "D MMMM YYYY"
                      )
                    : ""}
                  {showData?.startTime && (
                    <>
                      {" "}
                      {showData.startTime}
                    </>
                  )}
                  {showData?.theater?.name && (
                    <>
                      {" "}at{" "}
                      {showData.theater.name}
                      {showData.theater.city &&
                        `, ${showData.theater.city}`}
                      {showData.theater.state &&
                        `, ${showData.theater.state}`}
                    </>
                  )}
                </p>
              </>
            )}
          </div>
              {/* Sign In Button - Right */}
  <button
    onClick={() => navigate("/login")}
    className="ml-auto rounded-sm bg-[#f84464] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#e63756] transition-colors"
  >
    Sign in
  </button>
        </div>
      
      </div>

      {/* Show Timings */}
      {type !== "checkout" && (
        <>
          <div className="bg-white pt-4">
            <div className="mx-auto px-6 pb-4 flex items-center gap-4 max-w-7xl">
              {/* Date */}
              <div className="text-sm text-gray-700">
                <p className="text-xs text-gray-500 font-medium">
                  {showData?.date
                    ? dayjs(showData.date, "DD-MM-YYYY").format("ddd")
                    : ""}
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  {showData?.date
                    ? dayjs(showData.date, "DD-MM-YYYY").format(
                        "DD MMMM"
                      )
                    : ""}
                </p>
              </div>

              {/* Selected Show Timing */}
              <button
                className="border rounded-[14px] px-8 py-3 text-sm border-black font-medium bg-gray-200"
              >
                {showData?.startTime}

                <p className="text-[10px] text-gray-500 -mt-1">
                  {showData?.audioType?.toUpperCase()}
                </p>
              </button>
            </div>
          </div>

          <hr className="my-2 border-gray-300 max-w-7xl mx-auto" />
        </>
      )}
    </>
  );
};

export default Header;