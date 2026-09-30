import React from 'react'
import TheaterTimings from '../components/movies/TheaterTimings'
import m4 from "../assets/m4.png";
import {filters} from "../utils/constants";

const movie = {
  id: 4,
  title: "F1: The Movie",
  genre: ["Action","Drama","Sports"],
  rating: 9.5,
  votes: "6.8K",
  img: m4,
  languages: ["English, Hindi, Tamil, Telugu"],
  format:["2D","3D","IMAX 3D"],
  age: "UA16+",
  certification: "UA16+",
  //filters : ["2D", "3D", "Premium Seats","Recliner","IMAX 3D","PVR","4DX","Laser","Dolby Atmos"],
  duration: "2h 24m",
  releaseDate: "2023-09-15",
  description:`F1: The Movie is a high-octane sports drama directed  
  by Joseph Kosinski and produced by Jerry Bruckheimer alongside seven-time champion 
  Lewis Hamilton. The film stars Brad Pitt as Sonny Hayes, a former 1990s racing prodigy  
  who walked away from Formula One after a devastating crash. Decades later, his old friend 
  and struggling team owner Ruben Cervantes (Javier Bardem) coaxes him out of retirement to 
  rescue the underperforming, bottom-tier APXGP team.`,
};

const MovieDetails = () => {
  return (
    <>
      {/* MovieDetails Section */}
      <div 
        className='relative text-white font-sans px-4 py-4.5'
        style={{
          backgroundImage: `url(${movie.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Actual content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row gap-5">

          {/* Poster */}
          <div>
            <img 
              src={movie.img}
              alt={movie.title}
              className="rounded-xl w-25 h-[200px] object-cover shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start flex-1">

            <h1 className="text-2xl font-bold mb-2">
              {movie.title}
            </h1>

            <div className="flex items-center gap-2 mb-2">

              <div className="bg-[#3a3a3a] px-2 py-1.5 rounded-md flex items-center gap-2 text-xs">

                <span className="text-pink-500 font-bold">
                  ★ {movie.rating}
                </span>

                <span className="text-gray-300">
                  {movie.votes} Votes
                </span>

                <button className="cursor-pointer bg-[#2f2f2f] ml-2 px-2 py-1 rounded-md hover:bg-[#4a4a4a]">
                  Rate Now
                </button>

              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] mb-2">

              <span className="bg-[#3a3a3a] px-1.5 py-0.5 rounded">
                {movie.format.join(", ")}
              </span>

              <span className="bg-[#3a3a3a] px-1.5 py-0.5 rounded">
                {movie.languages.join(", ")}
              </span>

            </div>

            <p className="text-[11px] text-gray-300 mb-2">
              {movie.duration} • {movie.genre.join(", ")} •
              {movie.certification} • {movie.releaseDate}
            </p>

            <div>
              <h2 className="text-base font-bold mb-1">
                About the movie
              </h2>

              <p className="text-[11px] text-gray-50 leading-tight mb-2">
                {movie.description}
              </p>
            </div>

          </div>

          {/* Share Button */}
          <div className="absolute top-0 right-0 cursor-pointer">
            <button
              className="cursor-pointer bg-[#3a3a3a] px-4 py-2 rounded
            text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12 4.21 9.12 2.87 10.46 2.87 12.12s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
  
       {/* Show Timings */}

      <div className="max-w-7xl mx-auto mt-8">
        {/* Filters */}
<div className="flex flex-wrap items-center gap-2 mb-2 justify-center">
  {filters.map((filter) => (
  <button
    key={filter}
    className="border border-gray-300 px-5 py-1 rounded-lg cursor-pointer text-sm hover:bg-gray-100">
    {filter}
  </button>
))}
</div>

        <hr className="my-2 border-gray-200" />

         {/* Avalability Status  */}
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 bg-black rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500">Available</small>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 font-semibold bg-yellow-400 rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500">Filling fast</small>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 mr-1 font-semibold bg-red-400 rounded-full inline-block"></span>
            <small className="font-semibold text-gray-500"> Almost full</small>
          </span>
             </div>

             {/*Theatres and timings */}
             
  <TheaterTimings />
      </div>
    </>
  )
}


export default MovieDetails