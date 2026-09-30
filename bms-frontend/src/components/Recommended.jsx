import React from "react";
import { movies } from "../utils/constants";
import { Link } from "react-router-dom";

const Recommended = () => {
  return (
    <div className="w-full py-6 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">

        <div className="items-center flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            Recommended Movies
          </h1>

          <Link
              to="/movies"
            className="text-md text-red-500 cursor-pointer hover:underline">
          See All
           </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-[200px] rounded overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-[260px] object-cover rounded"
                />
              </div>

              <div className="bg-black text-white text-sm px-2 py-1 flex items-center justify-between">
                <span>⭐ {movie.rating}/10</span>
                <span>{movie.votes}</span>
              </div>

              <div className="px-2 py-1">
                <h3 className="font-semibold text-lg">
                  {movie.title}
                </h3>

                <p className="text-md text-gray-500">
                  {movie.genre.replaceAll("/", " | ")}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Recommended;