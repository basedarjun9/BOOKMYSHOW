import React, { useEffect, useState } from "react";
import Header from "../components/seat-layout/Header";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { FaInfoCircle } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { CiUser, CiCircleQuestion } from "react-icons/ci";

dayjs.extend(customParseFormat);

const Checkout = () => {

  const showData = {
    _id: "show123",
    date: "12-10-2026",
    startTime: "07:30 PM",
    audioType: "Dolby 7.1",

    movie: {
      title: "Meesaya Murukku 2",
      certification: "UA13+",
      languages: ["Tamil", "Telugu"],
      format: ["2D", "IMAX"],
      posterUrl:
        "https://res.cloudinary.com/dwfajb0oe/image/upload/v1791611209/meesaya_murukku2.png",
    },

    theater: {
      name: "PVR Icon",
      city: "Chennai",
      state: "Tamil Nadu",
    },
  };


  const selectedSeats = [
    { type: "Gold", seatNumber: "B5", price: 200 },
    { type: "Gold", seatNumber: "B6", price: 200 },
  ];


  const user = {
    name: "Arjun",
    phone: "9025585831",
    email: "arjunmoorthy2026@gmail.com",
  };

  const location = "Chennai, Tamil Nadu";


  // ==========================================
  // GROUP SEATS BY TYPE
  // ==========================================

  const groupSeatsByType = (seats) => {
    return Object.values(
      seats.reduce((groups, seat) => {
        if (!groups[seat.type]) {
          groups[seat.type] = {
            type: seat.type,
            seats: [],
          };
        }

        groups[seat.type].seats.push(seat.seatNumber);

        return groups;
      }, {})
    );
  };

  const base = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  const tax = Math.round(base * 0.05);
  const total = base + tax;

  // ==========================================
  // CHECKOUT UI
  // ==========================================

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <Header type="checkout" />

       <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* ================================== */}
          {/* LEFT SECTION */}
          {/* ================================== */}

          <div className="space-y-5">
            {/* Movie Details */}
            <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
              <img
                src={showData.movie.posterUrl}
                alt={showData.movie.title}
                className="h-28 w-20 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {showData.movie.title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                  {showData.movie.certification} ·{" "}
                  {showData.movie.languages.join(", ")} ·{" "}
                  {showData.movie.format.join(", ")}
                </p>

                <p className="mt-2 text-sm font-medium text-gray-800">
                  {showData.theater.name}
                </p>

                <p className="text-xs text-gray-500 sm:text-sm">
                  {showData.theater.city},{" "}
                  {showData.theater.state}
                </p>
              </div>
            </div>

            {/* Show Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-4">
                <p className="text-sm font-medium text-gray-700 sm:text-base">
                  {dayjs(
                    showData.date,
                    "DD-MM-YYYY"
                  ).format("D MMMM YYYY")}
                </p>

                <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {showData.audioType}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedSeats.length}.Ticket
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Show time: {showData.startTime}
                  </p>

                  <div className="mt-3 space-y-2">
                    {groupSeatsByType(selectedSeats).map(
                      ({ type, seats }) => (
                        <p
                          key={type}
                          className="text-sm text-gray-600"
                        >
                          <span className="font-medium text-gray-800">
                            {type}
                          </span>{" "}
                          · Seats: {seats.join(", ")}
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs text-gray-500">
                    Ticket amount
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ₹{base}
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation Notice */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <FaInfoCircle className="mt-0.5 shrink-0" size={20} />

              <p>
                <span className="font-semibold">
                  Cancellation policy
                </span>

                <br />

                No cancellation or refund is available after payment.
              </p>
            </div>

            {/* Offers */}
            <button
              type="button"
            
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-gray-400"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                <BiSolidOffer size={22} className="text-pink-500" />
                Available Offers
              </span>

              <span className="text-sm font-semibold text-blue-600">
                View offers →
              </span>
            </button>
          </div>

          {/* RIGHT SECTION */}

          <div className="space-y-5">
            {/* Payment Summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Payment Summary
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Order amount ({selectedSeats.length} tickets)
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹200
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Taxes & fees (5%)
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹20
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-gray-900">
                      Total payable
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      ₹220
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Your Details
              </h3>

              <div className="flex items-start gap-3">
                <CiUser
                  size={26}
                  className="shrink-0 text-gray-500"
                />

                <div className="min-w-0 space-y-1">
                  <p className="break-words text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>

                  <p className="break-words text-sm text-gray-600">
                    +91 {user.phone}
                  </p>

                  <p className="break-words text-sm text-gray-600">
                    {user.email}
                  </p>

                  <p className="break-words text-sm text-gray-500">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <button
              type="button"
            
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-gray-400"
            >
              <CiCircleQuestion
                size={24}
                className="shrink-0 text-gray-500"
              />

              <span className="text-sm font-semibold text-gray-800">
                Terms and conditions
              </span>
            </button>

            {/* Payment Button */}
            <button
              
              className="flex w-full items-center justify-between gap-3 rounded-xl bg-[#000000] px-5 py-4 text-white shadow-sm transition hover:bg-[#e63756] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <div className="text-left">
                <p className="text-lg font-bold">
                  ₹{total}
                </p>

                <p className="text-[10px] font-medium tracking-wider">
                  TOTAL AMOUNT
                </p>
              </div>

              <span className="text-sm font-bold sm:text-base">
                Proceed to Pay →
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;