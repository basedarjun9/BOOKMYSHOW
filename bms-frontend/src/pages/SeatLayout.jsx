import Header from "../components/seat-layout/Header";
import Footer from "../components/seat-layout/Footer";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowById } from "../apis/index";
import screenImg from "../assets/screen.png";

const Seat = ({ seat, row }) => {
  const isBooked = seat.status === "BOOKED";

  return (
    <button
      className={`w-9 h-9 m-[1px] rounded-lg border text-sm ${
        isBooked
          ? "bg-gray-100 border-red-200 text-red-400 cursor-not-allowed"
          : "hover:bg-gray-100 border-black cursor-pointer"
      }`}
      disabled={isBooked}
    >
      {isBooked ? "X" : seat.number}
    </button>
  );
};

const SeatLayout = () => {
  const { showId } = useParams();

  const {
    data: showData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["show", showId],
    queryFn: async () => await getShowById(showId),
    placeholderData: keepPreviousData,
    enabled: !!showId,
    select: (res) => res.data,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading seat layout...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Failed to load the seat layout. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Header showData={showData} />
      </div>

      {/* Scrollable Seat Layout */}
      <div className="max-w-7xl mx-auto mt-[210px] px-6 pb-4 bg-white h-[calc(100vh-320px)] overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col items-center justify-center">
          {showData?.seatLayout && (
            <div className="flex flex-col items-center justify-center">
              {Object.entries(
                showData.seatLayout.reduce((acc, curr) => {
                  if (!acc[curr.type]) {
                    acc[curr.type] = {
                      price: curr.price,
                      rows: [],
                    };
                  }

                  acc[curr.type].rows.push(curr);
                  return acc;
                }, {})
              ).map(([type, { price, rows }]) => (
                <div
                  key={type}
                  className="mb-12 w-full flex flex-col items-center justify-center"
                >
                  <h2 className="text-center font-semibold text-lg mb-4">
                    {type} : ₹{price}
                  </h2>

                  <div className="space-y-2">
                    {rows.map((rowObj) => (
                      <div
                        key={rowObj.row}
                        className="flex items-center"
                      >
                        <div className="w-6 text-right mr-2 text-sm text-gray-600">
                          {rowObj.row}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {rowObj.seats.map((seat, i) => (
                            <Seat
                              key={i}
                              seat={seat}
                              row={rowObj.row}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Screen Image */}
          <div className="flex justify-center mt-5">
            <img
              src={screenImg}
              alt="Screen"
              className="w-[300px] md:w-[400px] object-contain opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-gray-200 py-4 px-4 z-10">
        <Footer
          isSelected={false}
          selectedSeats={[]}
          showData={showData}
        />
      </div>
    </div>
  );
};

export default SeatLayout;