import React from "react";
import { MdChair } from "react-icons/md";
import { ordersData } from "../../utils/constants";

const BookingHistory = () => {
  return (
    <div className="w-3/4 px-6 py-2 rounded-md mx-auto">

      {/* Heading */}
      <h3 className="text-xl font-semibold mb-2">
        Your Orders
      </h3>

      {/* Orders */}
      {ordersData.map((order) => (

        // ORDER WRAPPER
        <div key={order.id}>

          {/* ================= WHITE BOX START ================= */}

          <div className="bg-white p-9 rounded-md mb-2 overflow-hidden">

            {/* Main Booking Information */}
            <div className="flex items-start gap-10">

              {/* Movie Poster */}
              <img
                src={order.poster}
                alt={order.title}
                className="w-30 h-40 object-cover rounded"
              />

              {/* Divider */}
              <div className="h-40 border-l border-gray-300 border-dashed"></div>

              {/* Movie Details */}
              <div className="flex items-start justify-between w-full">

                <div className="flex-1">

                  <p className="font-normal text-2xl">
                    {order.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.format}
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-3">
                    {order.datetime} - {order.cinema}
                  </p>

                  <small className="text-gray-700 mt-1">
                    Quantity: {order.quantity}
                  </small>

                  <p className="text-md font-semibold text-gray-700 mt-2">
                    <MdChair
                      className="inline mr-2"
                      size={24}
                    />
                    {order.seats}
                  </p>

                </div>

                {/* M-Ticket */}
                <p className="text-xl">
                  M-Ticket
                </p>

              </div>

            </div>

            {/* Price Section */}
            <div className="p-4 text-right">

              <p className="text-sm text-gray-500">
                Ticket: ₹{order.ticket.toFixed(2)}

                <span className="ml-2">
                  + Convenience Fee: ₹{order.fee.toFixed(2)}
                </span>
              </p>

              <p className="text-xl font-bold mt-1">
                ₹{order.total.toFixed(2)}
              </p>

            </div>

          {/* ================= WHITE BOX END ================= */}

         </div>
          {/* ================= OUTSIDE WHITE BOX ================= */}

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-5 text-center">

            {/* Booking Date */}
            <div>
              <p className="font-semibold">
                Booking Date & Time
              </p>

              <p>
                {order.bookingTime}
              </p>
            </div>

            {/* Payment */}
            <div>
              <p className="font-semibold">
                Payment Method
              </p>

              <p>
                {order.paymentMethod}
              </p>
            </div>

            {/* Booking ID */}
            <div>
              <p className="font-semibold">
                Booking ID
              </p>

              <p>
                {order.id}
              </p>
            </div>

          </div>

          {/* ================= ORDER WRAPPER END ================= */}

        </div>
      ))}

    </div>
  );
};

export default BookingHistory;