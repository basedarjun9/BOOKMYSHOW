import React from "react";
import { tabs } from "../utils/constants";
import { IoMdAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import BookingHistory from "../components/profile/BookingHistory";

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState("Profile");

  return (
    <>
      {/* Tabs */}
      <div className="bg-[#e5e5e5]">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-8 py-2 text-sm font-medium">
          {tabs.map((tab,i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 cursor-pointer ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen py-10 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">

          {/* Profile Section */}
          {activeTab === "Profile" && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-800 to-[#f74565] rounded-md px-5 py-6 flex items-center gap-6 text-white">

                {/* Profile Image */}
                <div className="relative w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-white text-gray-600">
                  <IoMdAdd size={30} />
                </div>

                {/* User Details */}
                <div className="mt-2">
                  <h2 className="text-2xl font-bold">
                    Hi, Arjun 
                  </h2>

                  <small className="cursor-pointer">
                    <IoIosLogOut
                      size={20}
                      className="inline"
                    />{" "}
                    Logout
                  </small>
                </div>

              </div>
              

           {/* Account Details */}
<div className="bg-white px-6 py-6 rounded-b-md">
  <h3 className="text-lg font-semibold mb-5">
    Account Details
  </h3>

  {/* Email Row */}
  <div className="grid grid-cols-[200px_1fr_30px] items-center py-2">
    
    {/* Label */}
    <p className="text-sm font-normal">
      Email Address
    </p>

    {/* Email + Verified */}
    <div className="flex items-center gap-2">
      <span className="text-sm">
        arjunmoorthy2026@gmail.com
      </span>

      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
        Verified
      </span>
    </div>

    {/* Edit */}
    <FiEdit className="text-pink-500 cursor-pointer" />
  </div>


  {/* Mobile Row */}
  <div className="grid grid-cols-[200px_1fr_30px] items-center py-2">
    
    {/* Label */}
    <p className="text-sm font-normal">
      Mobile Number
    </p>

    {/* Number + Verified */}
    <div className="flex items-center gap-2">
      <span className="text-sm">
        9025585831
      </span>

      <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
        Verified
      </span>
    </div>

    {/* Edit */}
    <FiEdit className="text-pink-500 cursor-pointer" />
  </div>
</div>

     {/* Personal Details */}
<div className="bg-white px-6 py-6 mt-3 rounded-md">
  <h3 className="text-lg font-semibold mb-4">
    Personal Details
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Name */}
    <div>
      <label className="text-sm font-normal">
        <div className=""> Name *</div>
  
      </label>

      <input type="text"
        value="Arjun"
        className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
      />
    </div>

    {/* Birthday */}
    <div>
      <label className="text-sm font-normal">
        Birthday (Optional)
      </label>

      <input
        type="date"
        className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
      />
    </div>

    {/* Identity */}
    <div>
      <label className="text-sm font-normal">
        Identity (Optional)
      </label>

      <div className="flex gap-2 mt-1">
        <button
          type="button"
          className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100"
        >
          Man
        </button>

        <button
          type="button"
          className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-200"
        >
          Women
        </button>
         <button
          type="button"
          className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100"
        >
          Trans Person
        </button>
      </div>
    </div>

         {/* Married */}
        <div>
        <label className="text-sm font-normal">
        Married? (Optional)
        </label>

        <div className="flex gap-2 mt-1">
        <button
          type="button"
          className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
          Yes
        </button>

        <button
          type="button"
          className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
          No
        </button>
      </div>
    </div>

  </div>
</div>
            </>
          )}
            {/* Booking Section */}

            {activeTab === "Your Orders" && <BookingHistory/>}



        </div>
      </div>
    </>
  );
};

export default Profile;