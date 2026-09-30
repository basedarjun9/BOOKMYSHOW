import React from 'react'
import { allMovies,languages } from '../../utils/constants'
import MovieCard from './MovieCard'
const MovieList = () => {
  return (
    <div className='w-full md:w-3/4 p-4'>
        <div className='flex flex-wrap gap-2 mb-3'>
        {
            languages.map((lang,i)=>(
                <span key={i} className='bg-white border border-gray-200
                text-[#f74362] py-1 px-3 rounded-[24px] text-sm cursor-pointer'>
                 {lang}
                </span>
            ))
        }

        </div>

    <div className='flex justify-between bg-white px-4 py-4 rounded mb-6'>
       <h3 className='font-semibold text-xl'>Coming Soon</h3>
      <a href="#" className="hover:text-[#f74362]">
        Explore Upcoming Movies -
      </a>
    </div>


 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {
        allMovies.map((movie,i)=>(
           <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
    </div>
  )
}

export default MovieList
