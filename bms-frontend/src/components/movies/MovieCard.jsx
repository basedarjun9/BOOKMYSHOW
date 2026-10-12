import React from 'react'


const MovieCard = ({movie}) => {
 

  return (
    <div onClick={() =>handleNavigate(movie)} className='w-50 md:w-35 cursor-pointer'>
        <img src={movie.posterUrl} alt={movie.title} className='rounded-lg shadow-md' />
        <p className='mt-2 font-medium'>{movie.title}</p>
        <p className='text-xs text-gray-500'>{movie.rating} | {movie.votes}</p>
        <p className='text-sm text-gray-600'>{movie.age}</p>
        <p className='text-sm text-gray-500 truncate'>{movie.languages.join(" | ")}</p>
    </div>
  )
}

export default MovieCard